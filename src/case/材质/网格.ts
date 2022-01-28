/**
 * 网格
 * 
 * 使用的重点api:
 *  GridMaterialProperty({
        color: 网格的颜色,
        cellAlpha: 网格的透明度,
        lineCount: 行数,
        lineThickness: 线的粗细,
        lineOffset: 线偏移量
 *  })
 * 
 * 案例演示：
 *  画一个网格材质(以椭圆为例)
 *  每500毫秒变换一种颜色的网格
 */
import { Viewer, GridMaterialProperty, Cartesian3, Color, Cartesian2 } from 'cesium'
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
    entity.ellipse!.material = new GridMaterialProperty({
        // 网格的颜色
        color: Color.fromRandom(),
        // 网格的透明度
        cellAlpha: Math.random(),
        // 行数
        lineCount: new Cartesian2(
            Math.ceil(Math.random() * 10),
            Math.ceil(Math.random() * 10)
        ),
        // 线的粗细
        lineThickness: new Cartesian2(
            Math.ceil(Math.random() * 10),
            Math.ceil(Math.random() * 10)
        )
    })
}, 500)

viewer.zoomTo(viewer.entities)
