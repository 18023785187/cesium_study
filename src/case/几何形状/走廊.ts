/**
 * 走廊
 * 
 * 使用的重点api:
 *  corridor(CorridorGraphics),
 *  CornerType
 * 
 * 案例演示：
 *  如何画一条走廊
 */
import { Viewer, Cartesian3, Color, CornerType } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

// 圆角贴地红色走廊
const redCorridor = viewer.entities.add({
    name: '圆角贴地红色走廊',
    corridor: {
        // 走廊每个点的位置
        positions: Cartesian3.fromDegreesArray([
            ...Destination.ZHU_HAI,
            ...Destination.GUANG_ZHOU,
            ...Destination.LUO_DING
        ]),
        // 宽度
        width: 20000,
        // 颜色
        material: Color.RED
    }
})
// 在高处且带轮廓的绿色走廊
const greenCorridor = viewer.entities.add({
    name: '在高处且带轮廓的绿色走廊',
    corridor: {
        positions: Cartesian3.fromDegreesArray([
            ...Destination.ZHU_HAI,
            ...Destination.GUANG_ZHOU,
            ...Destination.LUO_DING
        ]),
        width: 20000,
        // 高度
        height: 50000,
        // 轮廓，轮廓需要设置高度才能生效
        outline: true,
        material: Color.GREEN,
        // 指定拐角的样式
        /**
         * CornerType.BEVELED 角被修剪
         * CornerType.MITERED 不修剪
         * CornerType.ROUNDED 圆角
         */
        cornerType: CornerType.MITERED
    }
})
// 带斜角和轮廓且立体的走廊
const blueCorridor = viewer.entities.add({
    name: '带斜角和轮廓且立体的走廊',
    corridor: {
        positions: Cartesian3.fromDegreesArray([
            ...Destination.ZHU_HAI,
            ...Destination.GUANG_ZHOU,
            ...Destination.LUO_DING
        ]),
        width: 20000,
        height: 100000,
        // 立体的高度，> height的话往上, < height的话往下
        extrudedHeight: 150000,
        cornerType: CornerType.BEVELED,
        material: Color.BLUE.withAlpha(0.5),
        outline: true,
        outlineColor: Color.WHITE
    }
})

viewer.zoomTo(viewer.entities)
