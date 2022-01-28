/**
 * 点
 * 
 * 使用的重点api：
 *  point(PointGraphics),
 *  NearFarScalar(near , nearValue , far , farValue) 表示标量值在眼睛空间中的近距离和远距离处的上下边界
 *      near: 相机距地面的下限,
 *      nearValue: 到达下限时的值,
 *      far: 相机距地面的上限,
 *      farValue: 到达上限时的值
 * 
 * 案例演示：
 *  如何画一个点
 */
import { Viewer, Cartesian3, Color, NearFarScalar } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')
// 粉色普通点
viewer.entities.add({
    name: '粉色普通点',
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
    // 构建点
    point: {
        // 像素大小
        pixelSize: 10,
        // 颜色
        color: Color.PINK
    }
})
// 红色带轮廓点
viewer.entities.add({
    name: '红色带轮廓点',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + 0.1, Destination.ZHU_HAI[1]),
    point: {
        pixelSize: 10,
        color: Color.RED,
        // 轮廓颜色
        outlineColor: Color.WHITE,
        // 轮廓宽度
        outlineWidth: 10
    }
})
// 蓝色根据距离调整透明度和大小在高处的点
viewer.entities.add({
    name: '蓝色根据距离调整透明度和大小的点',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0], Destination.ZHU_HAI[1] + 0.1, 1000),
    point: {
        // pixelSize: 20,
        color: Color.BLUE,
        // 根据距离调整透明度
        translucencyByDistance: new NearFarScalar(1500, 1, 150000, 0.2),
        // 根据距离调整大小
        scaleByDistance: new NearFarScalar(1500, 20, 150000, 1)
    }
})

viewer.zoomTo(viewer.entities)
