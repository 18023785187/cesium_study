/**
 * 图片
 * 
 * 使用的重点api:
 *  ImageMaterialProperty
 * 
 * 案例演示：
 *  画一个图片材质(以椭圆为例)
 *  图片在每秒都会发生替换
 */
import { Viewer, Cartesian3, ImageMaterialProperty, Cartesian2, Color } from 'cesium'
import { Destination } from '@/constants'
import cat from 'assets/images/cat.png'

export default () => {

    const viewer: Viewer = new Viewer('viewer')

    // ImageMaterialProperty配置项
    const imageOptions = [
        // 单纯展示图片
        {
            image: cat,
        },
        // X, Y轴重复次数
        {
            image: cat,
            repeat: new Cartesian2(2, 4),
        },
        // 图片上面覆盖的颜色
        {
            image: cat,
            color: Color.PINK
        },
        // 当png具有透明部分时设置为透明生效
        {
            image: cat,
            transparent: true
        }
    ]

    const entity = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        ellipse: {
            semiMajorAxis: 40000,
            semiMinorAxis: 25000
        }
    })
    // 每秒替换图片材质
    window.setInterval(() => {
        entity.ellipse!.material = new ImageMaterialProperty(
            imageOptions[Math.floor(Math.random() * 5)]
        )
    }, 1000)

    viewer.zoomTo(viewer.entities)

    return () => {
        viewer.destroy()
    }
}