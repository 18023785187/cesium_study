/**
 * 按距离显示
 * 
 * 使用的重点api：
 *  DistanceDisplayCondition(near , far) 根据与相机的距离确定可见性
 *      near: 可见的最小距离，
 *      far: 可见的最大距离
 * 
 * 案例演示：
 *  在缩放时在同一位置根据距离显示不同的实体
 *  本次案例在10000米以上显示黄色圆点，10000米以下显示飞机
 */
import { Viewer, Cartesian3, Color, DistanceDisplayCondition } from 'cesium'
import { Destination } from '@/constants'
import CesiumAirModel from 'assets/3d_model/Cesium_Air.glb'

const viewer: Viewer = new Viewer('viewer')

viewer.entities.add({
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
    // 定义点
    point: {
        // 指定大小为10像素
        pixelSize: 10,
        color: Color.YELLOW,
        // 指定将显示距相机的距离
        distanceDisplayCondition: new DistanceDisplayCondition(
            10000
        )
    },
    // 定义模型
    model: {
        uri: CesiumAirModel,
        // 指定将显示距相机的距离
        distanceDisplayCondition: new DistanceDisplayCondition(
            0,
            10000
        )
    }
})

viewer.camera.setView({
    destination: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 100000)
})
