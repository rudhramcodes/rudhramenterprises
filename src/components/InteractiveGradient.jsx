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
          axesHelper="on"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={1.1}
          cAzimuthAngle={0}
          cDistance={7.1}
          cPolarAngle={140}
          cameraZoom={17.29}
          color1="#ffffff"
          color2="#f8f4ed"
          color3="#b37839"
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
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="sphere"
          uAmplitude={1.4}
          uDensity={1.1}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={1}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  )
}