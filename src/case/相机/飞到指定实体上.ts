/**
 * 飞到指定实体上
 * 
 *  使用的重点api:
 *      viewer.flyTo(target)
 * 
 *  案例演示：
 *      创建一个实体，通过viewer.flyTo方法使相机去到实体上方
 */
import { Viewer, createWorldTerrain } from 'cesium'
import { Destination } from '@/constants'
import CesiumAirModel from 'assets/3d_model/Cesium_Air.glb'
import Cartesian3 from 'cesium/Source/Core/Cartesian3'

export default () => {
    const viewer: Viewer = new Viewer('viewer', {
        terrainProvider: createWorldTerrain()
    })
    // 创建一个飞机模型
    const cesiumAirEntity = viewer.entities.add({
        name: '飞机模型',
        position: Cartesian3.fromDegrees(...Destination.EVEREST, 10000),
        model: {
            uri: CesiumAirModel,
            // 指定模型的最小尺寸
            minimumPixelSize: 128,
            // 模型的最大比例尺大小。 minimumPixelSize的上限
            maximumScale: 20000
        }
    })
    // 飞到模型上方
    viewer.flyTo(cesiumAirEntity)

    return () => {
        viewer.destroy()
    }
}