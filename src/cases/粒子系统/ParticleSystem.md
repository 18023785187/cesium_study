# ParticleSystem

    粒子系统管理粒子集合的更新和显示。

<p>这里会罗列出一些ParticleSystem常用的变量与方法，更多的内容请移步至
<p><a href="https://cesium.com/learn/cesiumjs/ref-doc/ParticleSystem.html?classFilter=ParticleSystem">ParticleSystem 英文</a></p>
<p><a href="http://cesium.xin/cesium/cn/Documentation1.62/ParticleSystem.html?classFilter=ParticleSystem">ParticleSystem 中文</a></p>
</p>

```typescript
const particleSystem: ParticleSystem = new ParticleSystem(options | undefined)

type options = {
    image?: HTMLImageElement | HTMLCanvasElement, // 粒子的图形
    show?: boolean, // 是否显示粒子
    emitter?: ParticleEmitter, // 粒子发射器
    modelMatrix?: Matrix4, // 粒子依据模型位置生成的位置
    emitterModelMatrix?: Matrix4, // 粒子依据世界位置生成的位置
    emissionRate?: number, // 每秒要发射的粒子数
    bursts?: Array<ParticleBurst>, // 在周期性的时间发射粒子爆发
    loop?: boolean, // 粒子系统完成后是否应该循环爆发
    scale?: number, // 粒子的比例
    startScale?: number, // 粒子初始化时的比例
    endScale?: number, // 粒子销毁时的比例
    color?: Color, // 粒子的颜色
    startColor?: Color, // 粒子初始化时的颜色
    endColor?: Color, // 粒子销毁时的颜色
    imageSize?: Cartesian2, // 粒子的尺寸,如果设置，则将覆盖用来缩放粒子图像尺寸（以像素为单位）的minimumImageSize和maximumImageSize输入
    minimumImageSize?: Cartesian2, // 粒子尺寸随机时的最小尺寸
    maximumImageSize?: Cartesian2, // 粒子尺寸随机时的最大尺寸
    speed?: number, // 粒子的速度（m/s）,如果设置，则用此值覆盖minimumSpeed和maximumSpeed输入
    minimumSpeed?: number, // 粒子速度随机时的最小速度
    maximumSpeed?: number, // 粒子速度随机时的最大速度
    lifetime?: number, // 粒子系统发射粒子的时间（以秒为单位）
    particleLife?: number, // 粒子持续时间（秒）,如果设置，则使用此值覆盖minimumParticleLife和maximumParticleLife输入
    minimumParticleLife?: number, // 粒子持续时间随机时的最小持续时间
    maximumParticleLife?: number, // 粒子持续时间随机时的最大持续时间
    mass?: number, // 粒子的质量（kg）,如果设置，则使用此值覆盖minimumMass和maximumMass输入
    minimumMass?: number, // 粒子质量随机时的最小质量
    maximumMass?: number, // 粒子质量随机时的最大质量
    updateCallback?: (particle: Particle, dt: number) => void // 每帧都要调用一次回调函数以更新粒子
}
```
