/**
 * 粒子系统
 * 
 * 使用的重点api：
 *  ParticleSystem,
 *  ParticleBurst,
 *  Emitter,
 *  Particle,
 *  viewer.scene.preUpdate
 * 
 * 案例演示：
 *  模拟跑车在行驶时尾气的排放
 * 
 *  本案例一个综合案例，综合了创建粒子、发射器、粒子爆发、定制功能、位置调整、定位等粒子功能
 * 
 *  本案例篇幅较长，建议打开ctrl+f快速查找以下案例依赖的函数：
 *      computeEmitterModelMatrix, 位置调整
 *      catEntity, 放置3D模型
 *      particleSystem, 创建粒子、发射器、粒子爆发
 *      applyGravity, 定制重力
 *      viewer.scene.preUpdate 粒子定位
 */
import {
    Viewer,
    JulianDate,
    ClockRange,
    Cartesian3,
    TimeIntervalCollection,
    TimeInterval,
    SampledPositionProperty,
    VelocityOrientationProperty,
    ParticleSystem,
    Color,
    Cartesian2,
    ParticleBurst,
    BoxEmitter,
    CircleEmitter,
    ConeEmitter,
    SphereEmitter,
    Particle,
    Math,
    Matrix4,
    Quaternion,
    HeadingPitchRoll,
    TranslationRotationScale
} from 'cesium'
import { ClickButton, RangeInput } from 'utils'
import CarModel from 'assets/3d_model/Car.glb'
import smoke from 'assets/images/smoke.png'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    // 定义时间界限
    const start: JulianDate = JulianDate.fromDate(new Date())
    // 结束日期为开始时间+120秒
    const stop: JulianDate = JulianDate.addSeconds(
        start,
        120,
        new JulianDate()
    )
    // 设置时间
    viewer.clock.startTime = start.clone()
    viewer.clock.stopTime = stop.clone()
    viewer.clock.currentTime = start.clone()
    // 循环到最后
    viewer.clock.clockRange = ClockRange.LOOP_STOP
    // 时间倍数
    viewer.clock.multiplier = 1
    // 启动动画
    viewer.clock.shouldAnimate = true
    // 为时间线设置边界
    viewer.timeline.zoomTo(start, stop)
    // 初始化粒子依据世界位置生成的位置
    const emitterModelMatrix: Matrix4 = new Matrix4()
    // 粒子中心平移的位置
    const translation: Cartesian3 = new Cartesian3()
    // 一组4维坐标，用于表示3维空间中的旋转
    const rotation: Quaternion = new Quaternion()
    // 航向
    let hpr: HeadingPitchRoll = new HeadingPitchRoll()
    // 由平移，旋转和缩放定义的仿射变换
    const trs: TranslationRotationScale = new TranslationRotationScale()
    // 获取粒子依据世界位置生成的位置的航向和偏移量
    const computeEmitterModelMatrix: () => Matrix4 = () => {
        hpr = HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr)
        // 调整粒子的平移位置
        trs.translation = Cartesian3.fromElements(
            // x, y, z
            -3.0,
            0.0,
            0.2,
            translation
        )
        // 调整粒子的航向
        trs.rotation = Quaternion.fromHeadingPitchRoll(hpr, rotation)
        // 从 TranslationRotationScale 实例 trs 创建Matrix4实例并存储在 emitterModelMatrix
        return Matrix4.fromTranslationRotationScale(
            trs,
            emitterModelMatrix
        )
    }
    // 起始位置
    const pos1 = Cartesian3.fromDegrees(
        -75.15787310614596,
        39.97862668312678
    )
    // 结束位置
    const pos2 = Cartesian3.fromDegrees(
        -75.1633691390455,
        39.95355089912078
    )
    // 定义位置集合, 开始位置和开始时间对应，结束位置和结束时间对应
    const position = new SampledPositionProperty()
    position.addSample(start, pos1)
    position.addSample(stop, pos2)
    // 定义视图模型数值
    const viewModel = {
        emissionRate: 5.0,
        gravity: 0.0,
        minimumParticleLife: 1.2,
        maximumParticleLife: 1.2,
        minimumSpeed: 1.0,
        maximumSpeed: 4.0,
        startScale: 1.0,
        endScale: 5.0,
        particleSize: 25.0,
    }
    // 放置跑车
    const catEntity = viewer.entities.add({
        // 按开始时间排序的非重叠TimeInterval实例集合
        availability: new TimeIntervalCollection([
            // 由开始和停止时间定义的时间间隔
            new TimeInterval({
                start: start,
                stop: stop,
            }),
        ]),
        model: {
            uri: CarModel,
            minimumPixelSize: 64,
        },
        // 用于查看该对象的建议初始偏移量
        viewFrom: new Cartesian3(-100.0, 0.0, 50.0) as any,
        position: position,
        // 指定实体方向,指定为前进的方向
        orientation: new VelocityOrientationProperty(position),
    })
    // 镜头跟踪该实体
    viewer.trackedEntity = catEntity
    // 添加粒子系统，请看 ./创建粒子.ts
    const scene = viewer.scene
    const particleSystem: ParticleSystem = scene.primitives.add(
        new ParticleSystem({
            // 图源
            image: smoke,
            // 开始颜色
            startColor: Color.LIGHTSEAGREEN.withAlpha(0.7),
            // 结束颜色
            endColor: Color.WHITE.withAlpha(0.0),
            // 开始尺寸
            startScale: viewModel.startScale,
            // 结束尺寸
            endScale: viewModel.endScale,
            // 最小存活时间
            minimumParticleLife: viewModel.minimumParticleLife,
            // 最大存活时间
            maximumParticleLife: viewModel.maximumParticleLife,
            // 最小速度
            minimumSpeed: viewModel.minimumSpeed,
            // 最大速度
            maximumSpeed: viewModel.maximumSpeed,
            // 尺寸
            imageSize: new Cartesian2(
                viewModel.particleSize,
                viewModel.particleSize
            ),
            // 发射粒子数
            emissionRate: viewModel.emissionRate,
            // 爆发器
            bursts: [
                new ParticleBurst({
                    time: 5.0,
                    minimum: 10,
                    maximum: 100,
                }),
                new ParticleBurst({
                    time: 10.0,
                    minimum: 50,
                    maximum: 100,
                }),
                new ParticleBurst({
                    time: 15.0,
                    minimum: 200,
                    maximum: 300,
                }),
            ],
            // 生命周期
            lifetime: 16.0,
            // 发射器
            emitter: new CircleEmitter(2.0),
            emitterModelMatrix: computeEmitterModelMatrix(),
            // 回调更新
            updateCallback: applyGravity
        })
    )
    // 更新回调定制重力，请看 ./updateCallback.ts
    const gravityScratch: Cartesian3 = new Cartesian3()
    function applyGravity(p: Particle, dt: number): void {
        // 获取粒子位置
        const position: Cartesian3 = p.position
        // 把position赋值到gravityScratch
        Cartesian3.normalize(position, gravityScratch)
        // gravityScratch增加particleSystemInitialValue.gravity * dt
        Cartesian3.multiplyByScalar(
            gravityScratch,
            viewModel.gravity * dt,
            gravityScratch
        )
        // 当前速度向量增加
        p.velocity = Cartesian3.add(
            p.velocity,
            gravityScratch,
            p.velocity
        )
    }
    // 订阅场景更新事件
    viewer.scene.preUpdate.addEventListener((scene, time: JulianDate) => {
        // 使粒子矩阵紧跟模型位置
        particleSystem.modelMatrix = catEntity.computeModelMatrix(time, new Matrix4())
        // 考虑对发射器模型矩阵的任何更改,实时更新粒子的位移航向
        particleSystem.emitterModelMatrix = computeEmitterModelMatrix()
    })
    // #region
    // 盒子发射器
    const btn1 = new ClickButton('盒子发射器', () => {
        const boxEmitter = new BoxEmitter(new Cartesian3(10.0, 10.0, 10.0))
        particleSystem.emitter = boxEmitter
    })
    // 圆形发射器
    const btn2 = new ClickButton('圆形发射器', () => {
        const circleEmitter = new CircleEmitter(2.0)
        particleSystem.emitter = circleEmitter
    })
    // 锥形发射器
    const btn3 = new ClickButton('锥形发射器', () => {
        const coneEmitter = new ConeEmitter(Math.toRadians(45.0))
        particleSystem.emitter = coneEmitter
    })
    // 球体发射器
    const btn4 = new ClickButton('球体发射器', () => {
        const sphereEmitter = new SphereEmitter(2.5)
        particleSystem.emitter = sphereEmitter
    })
    // 粒子数
    const range1 = new RangeInput(
        '粒子数',
        { min: 0, max: 100, initialValue: viewModel.emissionRate },
        (e: Event) => {
            particleSystem.emissionRate = parseFloat((e.target as HTMLInputElement).value)
        }
    )
    // 粒子尺寸
    const range2 = new RangeInput(
        '粒子尺寸',
        { min: 2, max: 60, initialValue: viewModel.particleSize },
        (e: Event) => {
            const particleSize = parseFloat((e.target as HTMLInputElement).value)
            particleSystem.minimumImageSize.x = particleSize
            particleSystem.minimumImageSize.y = particleSize
            particleSystem.maximumImageSize.x = particleSize
            particleSystem.maximumImageSize.y = particleSize
        }
    )
    // 最小寿命
    const range3 = new RangeInput(
        '最小寿命',
        { min: 0.1, max: 29.1, initialValue: viewModel.minimumParticleLife },
        (e: Event) => {
            particleSystem.minimumParticleLife = parseFloat((e.target as HTMLInputElement).value)
        }
    )
    // 最大寿命
    const range4 = new RangeInput(
        '最大寿命',
        { min: 0.1, max: 29.1, initialValue: viewModel.maximumParticleLife },
        (e: Event) => {
            particleSystem.maximumParticleLife = parseFloat((e.target as HTMLInputElement).value)
        }
    )
    // 最小速度
    const range5 = new RangeInput(
        '最小速度',
        { min: 0, max: 30, initialValue: viewModel.minimumSpeed },
        (e: Event) => {
            particleSystem.minimumSpeed = parseFloat((e.target as HTMLInputElement).value)
        }
    )
    // 最大速度
    const range6 = new RangeInput(
        '最大速度',
        { min: 0, max: 30, initialValue: viewModel.maximumSpeed },
        (e: Event) => {
            particleSystem.maximumSpeed = parseFloat((e.target as HTMLInputElement).value)
        }
    )
    // 开始规模
    const range7 = new RangeInput(
        '开始规模',
        { min: 0, max: 10, initialValue: viewModel.startScale },
        (e: Event) => {
            particleSystem.startScale = parseFloat((e.target as HTMLInputElement).value)
        }
    )
    // 结束规模
    const range8 = new RangeInput(
        '结束规模',
        { min: 0, max: 10, initialValue: viewModel.endScale },
        (e: Event) => {
            particleSystem.endScale = parseFloat((e.target as HTMLInputElement).value)
        }
    )
    // 重力
    const range9 = new RangeInput(
        '重力',
        { min: -20, max: 20, initialValue: viewModel.gravity },
        (e: Event) => {
            viewModel.gravity = parseFloat((e.target as HTMLInputElement).value)
        }
    )

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    btn2.appendTo(buttonBox)
    btn3.appendTo(buttonBox)
    btn4.appendTo(buttonBox)

    const rangeBox: HTMLDivElement = document.getElementsByClassName('range-box')[0] as HTMLDivElement
    range1.appendTo(rangeBox)
    range2.appendTo(rangeBox)
    range3.appendTo(rangeBox)
    range4.appendTo(rangeBox)
    range5.appendTo(rangeBox)
    range6.appendTo(rangeBox)
    range7.appendTo(rangeBox)
    range8.appendTo(rangeBox)
    range9.appendTo(rangeBox)
    // #endregion
    return () => {
        viewer.destroy()
        range1.remove()
        range2.remove()
        range3.remove()
        range4.remove()
        range5.remove()
        range6.remove()
        range7.remove()
        range8.remove()
        range9.remove()
        btn1.remove()
        btn2.remove()
        btn3.remove()
        btn4.remove()
    }
}
