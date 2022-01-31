/**
 * 烟花
 * 
 * 使用的重点api：
 *  ParticleSystem,
 *  SphereEmitter,
 *  ParticleBurst,
 *  Particle
 * 
 * 案例演示：
 *  在罗定上空放烟花
 *  当前案例篇幅比较长，建议打开ctrl+f快速查找以下案例依赖的函数：
 *      getImage,
 *      createFirework
 */
import {
    CesiumWidget,
    createOsmBuildings,
    createWorldTerrain,
    Clock,
    Color,
    Math,
    Cartesian2,
    Cartesian3,
    Transforms,
    Matrix4,
    ParticleSystem,
    SphereEmitter,
    ParticleBurst,
    Particle
} from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: CesiumWidget = new CesiumWidget('viewer', {
        terrainProvider: createWorldTerrain(),
        clock: new Clock()
    })
    // 启动时钟
    viewer.clock.shouldAnimate = true
    // 关闭大气层
    viewer.scene.skyAtmosphere.show = false
    viewer.scene.primitives.add(createOsmBuildings())
    /**
     * eastNorthUpToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid | undefined, result?: Matrix4 | undefined) 
     *      从具有东北向上轴的参考帧计算4x4变换矩阵以提供的原点为中心，以提供的椭球的固定参考系为中心
     * 
     * 创建经纬度为罗定的矩阵
     */
    const modelMatrix: Matrix4 = Transforms.eastNorthUpToFixedFrame(
        Cartesian3.fromDegrees(...Destination.LUO_DING)
    )
    const minimumExplosionSize = 30.0
    const maximumExplosionSize = 100.0
    // 定义粒子发射的时间
    const lifetime = 10.0
    const burstSize = 400.0
    // 定义发射器的高度
    const emitterInitialLocation = new Cartesian3(0.0, 0.0, 100.0)

    // 定义偏移量各方向的最大最小值
    const xMin = -100.0
    const xMax = 100.0
    const yMin = -80.0
    const yMax = 100.0
    const zMin = -50.0
    const zMax = 50.0
    /**
     * 定义颜色配置r、g、b、a
     */
    const colorOptions = [
        {
            minimumRed: 0.75,
            green: 0.0,
            minimumBlue: 0.8,
            alpha: 1.0,
        },
        {
            red: 0.0,
            minimumGreen: 0.75,
            minimumBlue: 0.8,
            alpha: 1.0,
        },
        {
            red: 0.0,
            green: 0.0,
            minimumBlue: 0.8,
            alpha: 1.0,
        },
        {
            minimumRed: 0.75,
            minimumGreen: 0.75,
            blue: 0.0,
            alpha: 1.0,
        },
    ]
    // 在屏幕生成20个烟花粒子
    for (let i = 0; i < 20; ++i) {
        const x = Math.randomBetween(xMin, xMax)
        const y = Math.randomBetween(yMin, yMax)
        const z = Math.randomBetween(zMin, zMax)
        // 定义偏移量和颜色和粒子爆发数组
        const offset = new Cartesian3(x, y, z)
        const color = Color.fromRandom(
            colorOptions[i % colorOptions.length]
        )
        const bursts: ParticleBurst[] = []
        // 给爆发器数组新增10个在周期时间内的随机时间爆发器
        for (let j = 0; j < 10; ++j) {
            bursts.push(
                new ParticleBurst({
                    // 爆发的时间,需要在周期时间内
                    time: Math.nextRandomNumber() * lifetime,
                    // 最小发射的粒子数
                    minimum: burstSize,
                    // 最大发射的粒子数
                    maximum: burstSize,
                })
            )
        }
        // 
        createFirework(offset, color, bursts)
    }

    // 虎年祝福 2022/1/31 start
    // #region
    const greetEl: HTMLDivElement = document.createElement('div')
    greetEl.textContent = '虎年快乐家人们'
    greetEl.style.cssText = `
        position: absolute;
        left: 57.5%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        color: #fff;
        font-size: 3vw;
    `
    document.body.appendChild(greetEl)
    // #endregion
    // 虎年祝福 end

    viewer.scene.camera.setView({
        destination: Cartesian3.fromDegrees(...Destination.LUO_DING, 60),
        orientation: {
            pitch: Math.toRadians(10) 
        }
    })
    /**
     * 获取一个canvas烟花粒子
     * @returns HTMLCanvasElement
     */
     function getImage(): HTMLCanvasElement {
        // 创建宽高为20px的canvas
        const particleCanvas: HTMLCanvasElement = document.createElement("canvas")
        particleCanvas.width = 20
        particleCanvas.height = 20
        // 获取画笔画一个白色的圆
        const context2D: CanvasRenderingContext2D = particleCanvas.getContext("2d") as CanvasRenderingContext2D
        context2D.beginPath()
        context2D.arc(8, 8, 8, 0, Math.TWO_PI, true)
        context2D.closePath()
        context2D.fillStyle = "rgb(255, 255, 255)"
        context2D.fill()
        return particleCanvas as HTMLCanvasElement
    }
    /**
     * 创建烟花
     * @param offset Cartesian3
     * @param color Color
     * @param bursts Array<ParticleBurst>
     * @returns undefined
     */
     function createFirework(offset: Cartesian3, color: Color, bursts: ParticleBurst[]) {
        /**
         * add(left: Cartesian3, right: Cartesian3, result: Cartesian3) 计算两个笛卡尔的按分量求和
         * 
         * 当前求出高度与offset的组合体
         */
        const position: Cartesian3 = Cartesian3.add(
            emitterInitialLocation,
            offset,
            new Cartesian3()
        )
        /**
         * fromTranslation(translation: Cartesian3, result?: Matrix4 | undefined) 
         *      从笛卡尔3创建一个表示转换的Matrix4实例
         * 
         * 计算出发射器矩阵根据position确定的位置
         */
        const emitterModelMatrix: Matrix4 = Matrix4.fromTranslation(
            position,
            new Matrix4()
        )
        /**
         * multiply(left: Matrix4, right: Matrix4, result: Matrix4) 计算两个矩阵的乘积
         * 
         * 计算出发射器在世界的位置
         */
        const particleToWorld: Matrix4 = Matrix4.multiply(
            modelMatrix,
            emitterModelMatrix,
            new Matrix4()
        )
        const worldToParticle: Matrix4 = Matrix4.inverseTransformation(
            particleToWorld,
            particleToWorld
        )
        // 在30 - 100 之间计算随机数, 根据的是最大最小爆炸尺寸
        const size: number = Math.randomBetween(
            minimumExplosionSize,
            maximumExplosionSize
        )
        const force = (particle: Particle) => {
            const position = Matrix4.multiplyByPoint(
                worldToParticle,
                particle.position,
                new Cartesian3()
            );
            if (Cartesian3.magnitudeSquared(position) >= size * size) {
                Cartesian3.clone(
                    Cartesian3.ZERO,
                    particle.velocity
                );
            }
        }
        // 计算粒子的持续时间
        const normalSize = (size - minimumExplosionSize) / (maximumExplosionSize - minimumExplosionSize)
        const minLife = 0.3
        const maxLife = 1.0
        const life = normalSize * (maxLife - minLife) + minLife
        // 添加烟花粒子
        viewer.scene.primitives.add(
            new ParticleSystem({
                image: getImage(),
                startColor: color,
                // 结束时烟花颜色设为透明
                endColor: color.withAlpha(0.0),
                particleLife: life,
                // 烟花速度
                speed: 30.0,
                imageSize: new Cartesian2(7.0, 7.0),
                emissionRate: 0,
                emitter: new SphereEmitter(0.1),
                bursts: bursts,
                lifetime: lifetime,
                updateCallback: force,
                modelMatrix: modelMatrix,
                emitterModelMatrix: emitterModelMatrix,
            })
        )
    }

    return () => {
        viewer.destroy()
        greetEl.remove()
    }
}
