/**
 * 带轮廓的线
 * 
 * 使用的重点api:
 *  PolylineOutlineMaterialProperty({
        color: 颜色,
        outlineWidth: 轮廓线宽度,
        outlineColor: 轮廓线颜色
 *  })
 * 
 * 案例演示：
 *  画一个带轮廓的线
 *  每500毫秒变换一种颜色
 */
import { Viewer, PolylineOutlineMaterialProperty, Cartesian3, Color } from 'cesium'
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
        width: 80
    }
})
// 每500毫秒变换一种颜色的棋盘
window.setInterval(() => {
    entity.polyline!.material = new PolylineOutlineMaterialProperty({
        color: Color.fromRandom(),
        outlineWidth: 20,
        outlineColor: Color.fromRandom()
    })
}, 500)

viewer.zoomTo(viewer.entities)
