/**
 * 条纹
 * 
 * 使用的重点api:
 *  StripeMaterialProperty({
 *      evenColor: 奇数格的颜色,
 *      oddColor: 偶数格的颜色,
 *      repeat: 格子重复次数,
 *      orientation: 定义格子是横向还是纵向
 *      offset: 偏移量
 *  })
 * 
 * 案例演示：
 *  画一个条纹材质(以椭圆为例)
 *  每500毫秒变换一种颜色的条纹
 */
import { Viewer, StripeMaterialProperty, Cartesian3, Color, StripeOrientation } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

const entity = viewer.entities.add({
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
    ellipse: {
        semiMajorAxis: 40000,
        semiMinorAxis: 25000
    }
})
// 每500毫秒变换一种颜色的棋盘
window.setInterval(() => {
    entity.ellipse!.material = new StripeMaterialProperty({
        // 奇数格的颜色
        evenColor: Color.fromRandom(),
        // 偶数格的颜色
        oddColor: Color.fromRandom(),
        // 格子重复次数
        repeat: Math.ceil(Math.random() * 32),
        // 定义格子是横向还是纵向
        orientation: Math.floor(Math.random() * 2) ? StripeOrientation.HORIZONTAL : StripeOrientation.VERTICAL,
    })
}, 500)

viewer.zoomTo(viewer.entities)
