/**
 * 棋盘
 * 
 * 使用的重点api:
 *  CheckerboardMaterialProperty({
 *      evenColor: 奇数格的颜色,
 *      oddColor: 偶数格的颜色,
 *      repeat: 格子在X,Y轴重复次数
 *  })
 * 
 * 案例演示：
 *  画一个棋盘材质(以椭圆为例)
 *  每500毫秒变换一种颜色的棋盘
 */
import { Viewer, CheckerboardMaterialProperty, Cartesian3, Color, Cartesian2 } from 'cesium'
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
    entity.ellipse!.material = new CheckerboardMaterialProperty({
        // 奇数格的颜色
        evenColor: Color.fromRandom(),
        // 偶数格的颜色
        oddColor: Color.fromRandom(),
        // 格子在X,Y轴的重复次数
        repeat: new Cartesian2(
            Math.ceil(Math.random() * 10),
            Math.ceil(Math.random() * 10)
        )
    })
}, 500)

viewer.zoomTo(viewer.entities)
