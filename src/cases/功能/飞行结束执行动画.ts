/**
 * 飞行结束执行动画
 * 
 * 使用的重点api:
 *  complete,
 *  rectangle,
 *  CallbackProperty,
 *  Rectangle
 * 
 *  案例演示：
 *      在飞行结束后放置一个由上往下降落的黄色半透明矩形
 */
import { Viewer, Cartesian3, CallbackProperty, Color, Rectangle } from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: Viewer = new Viewer('viewer')

    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(Destination.ZHU_HAI[0], Destination.ZHU_HAI[1], 100000),
        // 飞行结束时执行的函数， 在此放置一个由上往下降落的黄色半透明矩形
        complete: () => {
            let isConstant: boolean = false
            // 定义起始四个角的经纬度
            let leftLongitude: number = Destination.ZHU_HAI[0] - 1
            let leftLatitude: number = Destination.ZHU_HAI[1] - 1
            let rightLongitude: number = Destination.ZHU_HAI[0] + 1
            let rightLatitude: number = Destination.ZHU_HAI[1] + 1
            // 定义一个增量和结束标识
            let currentZoom: number = 0
            let targetZoom: number = 1.8
            viewer.entities.add({
                name: '黄色半透明矩形',
                rectangle: {
                    coordinates: new CallbackProperty(
                        () => {
                            if (currentZoom >= targetZoom) {
                                isConstant = true
                            } else {
                                leftLongitude += 0.05
                                leftLatitude += 0.05
                                rightLongitude -= 0.05
                                rightLatitude -= 0.05
                                currentZoom += 0.1
                            }
                            // 
                            return Rectangle.fromDegrees(
                                leftLongitude,
                                leftLatitude,
                                rightLongitude,
                                rightLatitude
                            )
                        },
                        isConstant
                    ),
                    // 定义黄色半透明
                    material: Color.YELLOW.withAlpha(0.5),
                    // 设置矩形高度
                    height: 10000,
                    // 显示轮廓，只有在设置height时才会生效
                    outline: true,
                    // 轮廓颜色
                    outlineColor: Color.WHITE,
                    // 轮廓宽度
                    outlineWidth: 5
                },
            })
        }
    })

    return () => {
        viewer.destroy()
    }
}