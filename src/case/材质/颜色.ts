/**
 * 颜色
 * 
 * 使用的重点api:
 *   ColorMaterialProperty(颜色材质),
 *   Color
 * 
 * 案例演示：
 *  画一个具有颜色的材质（以椭圆为例）
 *  每300毫秒改变一次颜色材质
 */
import { Viewer, Cartesian3, Color, ColorMaterialProperty } from 'cesium'
import { Destination } from '@/constants'

export default () => {

    const viewer: Viewer = new Viewer('viewer')

    const entity = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        ellipse: {
            semiMajorAxis: 40000,
            semiMinorAxis: 25000
        }
    })
    // 还可以在定义后更改材质
    window.setInterval(() => {
        // 每300毫秒改变一次颜色材质
        return entity.ellipse!.material = new ColorMaterialProperty(Color.fromRandom())
    }, 300)

    viewer.zoomTo(viewer.entities)

    return () => {
        viewer.destroy()
    }
}