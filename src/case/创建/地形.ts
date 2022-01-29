/**
 * 地形
 * 
 * 使用的重点api:
 *  createWorldTerrain
 * 
 * 案例演示：
 *   生成Cesium地形
 */
import { Viewer, createWorldTerrain, Cartesian3, Math } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer', {
    terrainProvider: createWorldTerrain({
        // 启用阳光照射效果
        requestVertexNormals: true,
        // 启用水面流动效果
        requestWaterMask: true
    })
})

viewer.scene.camera.flyTo({
    destination: Cartesian3.fromDegrees(...Destination.EVEREST, 10000),
    orientation: {
        heading: Math.toRadians(180),
        pitch: Math.toRadians(-20),
    }
})
