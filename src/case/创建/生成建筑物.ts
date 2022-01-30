/**
 * 生成建筑物
 * 
 * 使用的重点api：
 *  createWorldTerrain
 *  createWorldTerrain,
 */
import * as Cesium from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer = new Cesium.Viewer("viewer", {
        // 生成地形
        terrainProvider: Cesium.createWorldTerrain(),
    });
    
    // 生成建筑物图层
    viewer.scene.primitives.add(Cesium.createOsmBuildings());
    
    // 把相机移至特定位置
    viewer.scene.camera.flyTo({
        // 前往的经纬度
        destination: Cesium.Cartesian3.fromDegrees(...Destination.GUANG_ZHOU_TA, 750),
        // 镜头旋转的角度
        orientation: {
            heading: Cesium.Math.toRadians(220),
            pitch: Cesium.Math.toRadians(-20),
        },
    });
    
    return () => {
        viewer.destroy()
    }
}