/**
 * 发光的线
 * 
 * 使用的重点api:
 *  PolylineGlowMaterialProperty({
 *      glowPower: 发光的长度(0~1),
 *      color: 颜色
 *  })
 * 
 * 案例演示：
 *  画一个发光的线
 *  每500毫秒变换一种颜色
 */
import { Viewer, PolylineGlowMaterialProperty, Cartesian3, Color } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

const entity = viewer.entities.add({
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
    polyline: {
        positions: Cartesian3.fromDegreesArray(
            [
                ...Destination.ZHU_HAI,
                ...Destination.GUANG_ZHOU
            ]
        ),
        width: 100
    }
})
// 每500毫秒变换一种颜色的棋盘
window.setInterval(() => {
    entity.polyline!.material = new PolylineGlowMaterialProperty({
        // 发光的长度(0~1)
        glowPower: Math.random(),
        color: Color.fromRandom()
    })
}, 500)

viewer.zoomTo(viewer.entities)
