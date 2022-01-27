/**
 * 各种线 
 * 
 * 使用的重点api：
 *  polyline(PolylineGraphics),
 *  PolylineGlowMaterialProperty,
 *  PolylineOutlineMaterialProperty,
 *  PolylineArrowMaterialProperty,
 *  PolylineDashMaterialProperty
 * 
 * 案例演示：
 *  各种线型的画法
 */
import { Viewer, Cartesian3, ArcType, Color, PolylineGlowMaterialProperty, PolylineOutlineMaterialProperty, PolylineArrowMaterialProperty, PolylineDashMaterialProperty } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

// 红色地形线
const redLine = viewer.entities.add({
    name: '红色地形线',
    polyline: {
        positions: Cartesian3.fromDegreesArray([...Destination.ZHU_HAI, ...Destination.GUANG_ZHOU]),
        width: 5,
        // 是否把线嵌到地面
        clampToGround: true,
        material: Color.RED
    }
})
// 绿色弧线
const greenRhumbLine = viewer.entities.add({
    name: '绿色弧线',
    polyline: {
        positions: Cartesian3.fromDegreesArray([...Destination.ZHU_HAI, ...Destination.GUANG_ZHOU_TA]),
        width: 5,
        arcType: ArcType.RHUMB,
        material: Color.GREEN,
    }
})
// 发光的线
const glowingLine = viewer.entities.add({
    name: '发光的线',
    polyline: {
        positions: Cartesian3.fromDegreesArray([...Destination.ZHU_HAI, ...Destination.LUO_DING]),
        width: 10,
        material: new PolylineGlowMaterialProperty({
            glowPower: 0.2,
            taperPower: 0.5,
            color: Color.BLUE
        })
    }
})
// 高处带轮廓的橙色线
const orangeOutlined = viewer.entities.add({
    name: '高处带轮廓的橙色线',
    polyline: {
        // 可设置高度
        positions: Cartesian3.fromDegreesArrayHeights([
            ...Destination.GUANG_ZHOU,
            100000,
            ...Destination.LUO_DING,
            1000
        ]),
        width: 5,
        // 设置轮廓线的类
        material: new PolylineOutlineMaterialProperty({
            // 线颜色
            color: Color.ORANGE,
            // 轮廓线宽度
            outlineWidth: 2,
            // 轮廓线的颜色
            outlineColor: Color.BLACK
        })
    }
})
// 带箭头的直线
const purpleArrow = viewer.entities.add({
    name: '带箭头的直线',
    polyline: {
        positions: Cartesian3.fromDegreesArrayHeights([
            ...Destination.LUO_DING,
            100000,
            ...Destination.ZHU_HAI,
            100000
        ]),
        width: 10,
        arcType: ArcType.NONE,
        // 设置箭头直线的类
        material: new PolylineArrowMaterialProperty(Color.PURPLE)
    }
})
// 冰蓝色的虚线
const dasheLine = viewer.entities.add({
    name: '冰蓝色的虚线',
    polyline: {
        positions: Cartesian3.fromDegreesArrayHeights([
            ...Destination.GUANG_ZHOU_TA,
            50000,
            ...Destination.LUO_DING,
            50000
        ]),
        width: 5,
        // 设置虚线的类
        material: new PolylineDashMaterialProperty({
            color: Color.CYAN
        })
    }
})

// 移动到目标点
viewer.zoomTo(viewer.entities);