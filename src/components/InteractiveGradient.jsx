import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

export const InteractiveGradient = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <ShaderGradientCanvas
        style={{
          width: '100%',
          height: '100%',
        }}
      >
       <ShaderGradient
  animate="on"
  axesHelper="off"
  brightness={1}
  cAzimuthAngle={180}
  cDistance={2.8}
  cPolarAngle={80}
  cameraZoom={9.1}
  color1="#b37839"
  color2="#8f5f2e"
  color3="#f5e7d4"
  destination="onCanvas"
  embedMode="off"
  envPreset="city"
  format="gif"
  fov={45}
  frameRate={10}
  gizmoHelper="hide"
  grain="off"
  lightType="3d"
  pixelDensity={1}
  positionX={0}
  positionY={0}
  positionZ={0}
  range="disabled"
  rangeEnd={40}
  rangeStart={0}
  reflection={0.1}
  rotationX={50}
  rotationY={0}
  rotationZ={-60}
  shader="defaults"
  type="waterPlane"
  uAmplitude={0}
  uDensity={1.5}
  uFrequency={0}
  uSpeed={0.3}
  uStrength={1.5}
  uTime={8}
  wireframe={false}
/>
      </ShaderGradientCanvas>
    </div>
  )
}