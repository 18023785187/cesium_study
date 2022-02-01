/**
 * updateCallback
 * 
 * 使用的重点api：
 *  ParticleSystem,
 *  Particle,
 *  updateCallback(ParticleSystem~updateCallback)
 * 
 * 案例演示：
 *  模拟飞机起飞失事着火
 * 
 *  利用updateCallback在每帧更新时进一步定制粒子系统，
 *  当前案例定制效果为使粒子具备重力并沿着地心的方向模拟出真实的坠落效果
 */
import {
    Viewer,
    ParticleSystem,
    Cartesian2,
    Cartesian3,
    CircleEmitter,
    Matrix4,
    Color,
    Particle,
    Quaternion,
    Transforms,
    HeadingPitchRoll,
    Math
} from 'cesium'
import { Destination } from '@/constants'
import CesiumAirModel from 'assets/3d_model/Cesium_Air.glb'
import smoke from 'assets/images/smoke.png'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    // 开启时钟，方便观察粒子
    viewer.clock.shouldAnimate = true

    // 初始化一个重力位置
    const gravityVector = new Cartesian3()
    // 重力加速度
    const gravity = -(9.8 * 9.8)

    const position: Cartesian3 = Cartesian3.fromDegrees(...Destination.ZHU_HAI, 500)
    // 定义模型放置的位置和摆放的角度
    const orientation: Quaternion = Transforms.headingPitchRollQuaternion(
        position,
        /**
         * HeadingPitchRoll(heading , pitch , roll) 旋转
         *  heading 左右摆头角度
         *  pitch 上下摆头角度
         *  roll 横向滚动距离（单位deg）
         */
        new HeadingPitchRoll(0, Math.toRadians(90), 0)
    )

    const CatEntity = viewer.entities.add({
        name: '飞机',
        position: position,
        orientation: orientation as any,
        model: {
            uri: CesiumAirModel
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
            particleLife: 3.0,
            // 粒子的速度（m/s），如果设置该值，那么minimumSpeed和maximumSpeed无效
            speed: 0,
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
            color: Color.RED,
            // 每次更新执行的回调
            /**
             * @param p 正在更新粒子
             * @param dt 自上次更新以来的时间（秒）
             */
            updateCallback: (p: Particle, dt: number) => {
                // 获取粒子的位置
                const position = p.position;
                // 把粒子位置赋值给重力位置
                Cartesian3.normalize(position, gravityVector);
                // 重力位置 = 当前位置 * 重力加速度 * 时间
                Cartesian3.multiplyByScalar(gravityVector, gravity * dt, gravityVector);
                // 当前速度等于上一次的速度 + 计算得出的重力位置
                p.velocity = Cartesian3.add(p.velocity, gravityVector, p.velocity);
            }
        })
    )

    viewer.zoomTo(viewer.entities)

    return () => {
        viewer.destroy()
    }
}
