/**
 * 飞到一个位置
 * 
 * 使用的重点api:
 *  viewer.scene.camera.flyTo()
 * 
 * 案例演示：
 *  飞到广州塔上空
 */
import { Viewer, Cartesian3, createOsmBuildings, Math } from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    viewer.scene.primitives.add(createOsmBuildings())
    // 飞到广州塔上空
    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(
            Destination.GUANG_ZHOU_TA[0],
            Destination.GUANG_ZHOU_TA[1] - 0.005,
            800
        ),
        //航向、俯仰和横滚分别相对于东、北和上
        orientation: {
            heading: Math.toRadians(0.0),
            pitch: Math.toRadians(-40.0),
            roll: 0.0,
        }
    })

    return () => {
        viewer.destroy()
    }
}