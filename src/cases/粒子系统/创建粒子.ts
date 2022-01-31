/**
 * 创建粒子
 * 
 * 使用的重点api：
 *  ParticleSystem,
 *  CircleEmitter
 * 
 * 案例演示：
 *  在跑车的上方生成粒子，模拟跑车着火时的情况，在5秒后灭火
 */
import { Viewer, ParticleSystem, Cartesian2, Cartesian3, CircleEmitter, Matrix4, Color } from 'cesium'
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
            // 粒子发射器，详情可见案例 ./粒子发射器.ts
            emitter: new CircleEmitter(1),
            // 每秒要发射的粒子数
            emissionRate: 10.0,
            // 在粒子系统局部坐标系内转换粒子系统发射器的4x4转换矩阵
            // Entity.computeModelMatrix(time, result) 在指定时间为实体的转换计算模型矩阵
            // 获取跑车的模型矩阵，使得粒子在跑车上生成
            modelMatrix: CatEntity.computeModelMatrix(viewer.clock.startTime, new Matrix4()),
            // 粒子系统发射粒子的时间（以秒为单位）
            lifetime: 5.0,
            // 不循环粒子播放，默认循环
            loop: false,
            color: Color.RED,
        })
    )

    viewer.zoomTo(viewer.entities)

    return () => {
        viewer.destroy()
    }
}
