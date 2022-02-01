# Particle

    ParticleSystem 发出的粒子

<p>这里会罗列出一些ParticleSystem常用的变量与方法，更多的内容请移步至
<p><a href="https://cesium.com/learn/cesiumjs/ref-doc/Particle.html?classFilter=ParticleSystem">Particle 英文</a></p>
<p><a href="http://cesium.xin/cesium/cn/Documentation1.62/Particle.html?classFilter=ParticleSystem">Particle 中文</a></p>
</p>

```typescript
const particle: Particle = new Particle(options | undefined)

type options = {
    mass?: number, // 粒子的质量（以千克为单位）
    position?: Cartesian3, // 粒子在世界坐标中的初始位置
    velocity?: Cartesian3, // 世界坐标中粒子的速度向量
    life?: number, // 粒子的寿命以秒为单位
    image?: HTMLImageElement | HTMLCanvasElement, // 粒子的图形
    startColor?: Color, // 粒子初始化时的颜色
    endColor?:	Color, // 粒子销毁时的比例
    startScale?: number, // 粒子初始化时的比例
    endScale?: number, // 粒子销毁时的比例
    imageSize?: Cartesian2 // 粒子的尺寸
}

particle.age // 以秒为单位获取粒子的寿命
```