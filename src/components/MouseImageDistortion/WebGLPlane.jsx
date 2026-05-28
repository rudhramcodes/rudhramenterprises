import { useEffect, useRef } from 'react'
import useMouse from './useMouse'
import useDimension from './useDimension'
import { visionaries } from './data'

const vertexSrc = `#version 300 es
in vec2 a_position;
in vec2 a_uv;
out vec2 vUv;

uniform vec2 uDelta;
uniform float uAmplitude;
uniform vec2 uScale;
uniform vec2 uPosition;

float PI = 3.141592653589793238;

void main() {
    vUv = a_uv;
    vec2 pos = a_position * uScale + uPosition;
    pos.x += sin(a_uv.y * PI) * uDelta.x * uAmplitude;
    pos.y += sin(a_uv.x * PI) * uDelta.y * uAmplitude;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`

const fragmentSrc = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform float uAlpha;

void main() {
    vec3 texel = texture(uTexture, vUv).rgb;
    fragColor = vec4(texel, uAlpha);
}
`

const SUBDIVISIONS = 15
const GRID = SUBDIVISIONS + 1
const AMPLITUDE = 0.0005
const IMAGE_SCALE = 0.43

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader))
  }
  return shader
}

function createProgram(gl, vertSrc, fragSrc) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program))
  }
  return program
}

function buildPlaneGeometry() {
  const positions = []
  const uvs = []
  const indices = []

  for (let j = 0; j < GRID; j++) {
    for (let i = 0; i < GRID; i++) {
      positions.push((i / SUBDIVISIONS) * 2 - 1, (j / SUBDIVISIONS) * 2 - 1)
      uvs.push(i / SUBDIVISIONS, 1 - j / SUBDIVISIONS)
    }
  }

  for (let j = 0; j < SUBDIVISIONS; j++) {
    for (let i = 0; i < SUBDIVISIONS; i++) {
      const a = j * GRID + i
      const b = j * GRID + i + 1
      const c = (j + 1) * GRID + i
      const d = (j + 1) * GRID + i + 1
      indices.push(a, b, c, b, d, c)
    }
  }

  return { positions: new Float32Array(positions), uvs: new Float32Array(uvs), indices: new Uint16Array(indices) }
}

export default function WebGLPlane({ activeMenu }) {
  const canvasRef = useRef(null)
  const glState = useRef(null)
  const textures = useRef([])
  const smoothMouse = useRef({ x: 0, y: 0 })
  const currentAlpha = useRef(0)
  const targetAlpha = useRef(0)
  const currentDelta = useRef({ x: 0, y: 0 })
  const currentTextureIdx = useRef(0)
  const rafId = useRef(null)
  const imageAspect = useRef(1)
  const glReady = useRef(false)

  const mouse = useMouse()
  const dimension = useDimension()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const program = createProgram(gl, vertexSrc, fragmentSrc)
    gl.useProgram(program)

    const geo = buildPlaneGeometry()

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const posBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, geo.positions, gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uvBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
    gl.bufferData(gl.ARRAY_BUFFER, geo.uvs, gl.STATIC_DRAW)
    const uvLoc = gl.getAttribLocation(program, 'a_uv')
    gl.enableVertexAttribArray(uvLoc)
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0)

    const idxBuf = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.indices, gl.STATIC_DRAW)

    const uDeltaLoc = gl.getUniformLocation(program, 'uDelta')
    const uAmplitudeLoc = gl.getUniformLocation(program, 'uAmplitude')
    const uScaleLoc = gl.getUniformLocation(program, 'uScale')
    const uPositionLoc = gl.getUniformLocation(program, 'uPosition')
    const uTextureLoc = gl.getUniformLocation(program, 'uTexture')
    const uAlphaLoc = gl.getUniformLocation(program, 'uAlpha')

    gl.uniform1f(uAmplitudeLoc, AMPLITUDE)
    gl.uniform1i(uTextureLoc, 0)

    glState.current = {
      gl,
      program,
      vao,
      uDeltaLoc,
      uScaleLoc,
      uPositionLoc,
      uAlphaLoc,
      indexCount: geo.indices.length,
    }

    let cancelled = false

    const imgs = visionaries.map((p) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = p.src
      return img
    })

    imgs.forEach((img, i) => {
      img.onload = () => {
        if (cancelled) return
        const tex = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.generateMipmap(gl.TEXTURE_2D)
        textures.current[i] = tex

        if (i === 0 && !glReady.current) {
          imageAspect.current = img.naturalWidth / img.naturalHeight
          glReady.current = true
        }
      }
    })

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    return () => {
      cancelled = true
      window.removeEventListener('resize', resize)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      imgs.forEach((img) => { img.onload = null })
      gl.deleteProgram(program)
      gl.deleteVertexArray(vao)
      gl.deleteBuffer(posBuf)
      gl.deleteBuffer(uvBuf)
      gl.deleteBuffer(idxBuf)
      textures.current.forEach((t) => t && gl.deleteTexture(t))
    }
  }, [])

  useEffect(() => {
    const state = glState.current
    if (!state) return

    const lerp = (a, b, t) => a + (b - a) * t

    const loop = () => {
      if (!glState.current) return

      const { gl, program, vao, uDeltaLoc, uScaleLoc, uPositionLoc, uAlphaLoc, indexCount } = state
      const { x, y } = mouse
      const dim = dimension

      if (dim.width > 0 && dim.height > 0) {
        const sx = smoothMouse.current.x
        const sy = smoothMouse.current.y
        const dx = x - sx
        const dy = y - sy

        if (Math.abs(dx) > 0.5) {
          smoothMouse.current.x = lerp(sx, x, 0.1)
          smoothMouse.current.y = lerp(sy, y, 0.1)
          currentDelta.current = { x: dx, y: -dy }
        }

        const clipX = (smoothMouse.current.x / dim.width) * 2 - 1
        const clipY = -(smoothMouse.current.y / dim.height) * 2 + 1

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.useProgram(program)
        gl.bindVertexArray(vao)

        const viewportAspect = dim.width / dim.height
        const scaleX = IMAGE_SCALE * imageAspect.current / viewportAspect
        gl.uniform2f(uPositionLoc, clipX, clipY)
        gl.uniform2f(uScaleLoc, scaleX, IMAGE_SCALE)
        gl.uniform2f(uDeltaLoc, currentDelta.current.x, currentDelta.current.y)

        currentAlpha.current = lerp(currentAlpha.current, targetAlpha.current, 0.08)
        gl.uniform1f(uAlphaLoc, currentAlpha.current)

        const tex = textures.current[currentTextureIdx.current]
        if (tex) {
          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_2D, tex)
        }

        gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0)
      }

      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [mouse, dimension])

  useEffect(() => {
    if (activeMenu != null && textures.current[activeMenu]) {
      currentTextureIdx.current = activeMenu
    }
    targetAlpha.current = activeMenu != null ? 1 : 0
  }, [activeMenu])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ display: 'block' }}
    />
  )
}
