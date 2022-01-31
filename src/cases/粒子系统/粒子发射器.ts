/**
 * 粒子发射器
 * 
 * 使用的重点api：
 *  BoxEmitter,
 *  CircleEmitter,
 *  ConeEmitter,
 *  SphereEmitter
 * 
 * 案例演示：
 *  罗列出全部四种cesium自带的粒子发射器的效果
 *  本案例需要读者知道如何创建粒子，否则请先看 ./创建粒子.ts 案例
 */
import {
    Viewer,
    Cartesian3,
    ParticleSystem,
    Cartesian2,
    Matrix4,
    Color,
    Math,
    BoxEmitter,
    CircleEmitter,
    ConeEmitter,
    SphereEmitter
} from 'cesium'
import { ClickButton } from 'utils'
import { Destination } from '@/constants'
import CarModel from 'assets/3d_model/Car.glb'
import smoke from 'assets/images/smoke.png'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    // 开启时钟，方便观察粒子
    viewer.clock.shouldAnimate = true

    const CatEntity = viewer.entities.add({
        name: '跑车',
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        model: {
            uri: CarModel
        }
    })
    // 添加一个粒子系统
    const particleSystem: ParticleSystem = viewer.scene.primitives.add(
        // 生成粒子系统
        new ParticleSystem({
            // 粒子的图片
            image: smoke,
            // 粒子的尺寸，如果设置该值，那么minimumImageSize和maximumImageSize无效
            imageSize: new Cartesian2(20, 20),
            // 粒子生成时的尺寸比例
            startScale: 1.0,
            // 粒子销毁时的尺寸比例
            endScale: 8.0,
            // 粒子存在的秒数，如果设置该值，那么minimumParticleLife和maximumParticleLife无效
            particleLife: 1.0,
            // 粒子的速度（m/s），如果设置该值，那么minimumSpeed和maximumSpeed无效
            speed: 5.0,
            // 每秒要发射的粒子数
            emissionRate: 10.0,
            // 在粒子系统局部坐标系内转换粒子系统发射器的4x4转换矩阵
            // Entity.computeModelMatrix(time, result) 在指定时间为实体的转换计算模型矩阵
            // 获取跑车的模型矩阵，使得粒子在跑车上生成
            modelMatrix: CatEntity.computeModelMatrix(viewer.clock.startTime, new Matrix4()),
            // 粒子系统发射粒子的时间（以秒为单位）
            lifetime: 16.0,
            color: Color.RED,
        })
    )
    // 盒子发射器 new BoxEmitter(dimensions: Cartesian3)
    // 建立具备长宽高的范围，粒子将由中心发散到盒子各面
    const btn1 = new ClickButton('盒子发射器', () => {
        const boxEmitter = new BoxEmitter(new Cartesian3(5.0, 5.0, 5.0))
        particleSystem.emitter = boxEmitter
    })
    // 圆形发射器 new CircleEmitter(radius?: number | undefined)
    // 建立以radius为半径朝z轴的圆柱范围，粒子将在该范围内朝z轴发散
    const btn2 = new ClickButton('圆形发射器', () => {
        const circleEmitter = new CircleEmitter(5.0)
        particleSystem.emitter = circleEmitter
    })
    // 锥形发射器 new ConeEmitter(angle?: number | undefined)
    // 建立为原点为中心，角度为angle的锥形范围，粒子将在中心向锥底发散
    const btn3 = new ClickButton('锥形发射器', () => {
        const coneEmitter = new ConeEmitter(Math.toRadians(30.0))
        particleSystem.emitter = coneEmitter
    })
    // 球体发射器 new SphereEmitter(radius?: number | undefined)
    // 建立半径为radius的球体范围，粒子由中心发散到球面
    const btn4 = new ClickButton('球体发射器', () => {
        const sphereEmitter = new SphereEmitter(5.0)
        particleSystem.emitter = sphereEmitter
    })

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    btn2.appendTo(buttonBox)
    btn3.appendTo(buttonBox)
    btn4.appendTo(buttonBox)

    viewer.zoomTo(viewer.entities)

    return () => {
        viewer.destroy()
        btn1.remove()
        btn2.remove()
        btn3.remove()
        btn4.remove()
    }
}
