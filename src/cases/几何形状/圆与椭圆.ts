/**
 * 圆与椭圆
 * 
 * 使用的重点api:
 *  ellipse(EllipseGraphics)
 * 
 * 案例演示：
 *  如何画各种圆与椭圆
 */
import { Viewer, Cartesian3, Color, Math } from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    
    // 绿色带轮廓线的圆
    const greenCircle = viewer.entities.add({
        name: '绿色带轮廓线的圆',
        // 放置的位置
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 100000),
        ellipse: {
            // 半短轴
            semiMinorAxis: 30000,
            // 半长轴
            semiMajorAxis: 30000,
            // 圆所处的高度
            height: 50000,
            material: Color.GREEN,
            outline: true
        }
    })
    // 红色椭圆
    const redEllipse = viewer.entities.add({
        name: '红色椭圆',
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        ellipse: {
            // 半长轴与半短轴不相等即可画出椭圆，注意半短轴不可长于半长轴
            semiMajorAxis: 50000,
            semiMinorAxis: 25000,
            material: Color.RED
        }
    })
    // 带透明、具有高度与轮廓线的蓝色椭圆体
    const blueEllipse = viewer.entities.add({
        name: '带透明、具有高度与轮廓线的蓝色椭圆体',
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 100000),
        ellipse: {
            semiMinorAxis: 15000,
            semiMajorAxis: 30000,
            // 指定椭圆体的高度
            extrudedHeight: 20000,
            height: 10000,
            // 指定椭圆体的旋转角度
            rotation: Math.toRadians(45),
            material: Color.BLUE.withAlpha(0.5),
            outline: true
        }
    })
    
    viewer.zoomTo(viewer.entities)
    
    return () => {
        viewer.destroy()
    }
}