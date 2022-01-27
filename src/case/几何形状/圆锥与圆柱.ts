/**
 * 圆锥与圆柱
 * 
 * 使用的重点api:
 *  cylinder(CylinderGraphics)
 * 
 * 案例演示：
 *  如何画圆锥与圆柱
 */
import { Viewer, Cartesian3, Color } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

// 带黑色轮廓线的绿色圆柱体
const greenCylinder = viewer.entities.add({
    name: '带黑色轮廓线的绿色圆柱体',
    // 放置的位置与高度
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 20000),
    cylinder: {
        // 圆柱体长度
        length: 40000,
        // 顶部的宽度
        topRadius: 20000,
        // 底部的宽度
        bottomRadius: 20000,
        material: Color.GREEN.withAlpha(0.5),
        outline: true,
        outlineColor: Color.BLACK
    }
})
// 红色圆锥体
const redCone = viewer.entities.add({
    name: '红色圆锥体',
    position: Cartesian3.fromDegrees(...Destination.GUANG_ZHOU, 20000),
    cylinder: {
        length: 40000,
        topRadius: 0,
        bottomRadius: 20000,
        material: Color.RED
    }
})

viewer.zoomTo(viewer.entities)
