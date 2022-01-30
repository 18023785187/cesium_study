/**
 * 画一条线
 * 
 * 使用的重点api：
 *  polyline(PolylineGraphics),
 *  fromDegreesArray
 * 
 * 案例演示：
 *  如何画一条折线，并表明两点之间的距离
 *  该折线由罗定到广州再到珠海，并显示罗定到珠海的距离
 */
import { Viewer, Cartesian3, Color, NearFarScalar } from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: Viewer = new Viewer('viewer')

    const redLine = viewer.entities.add({
        // 定义一条线
        polyline: {
            // 位置数组
            positions: Cartesian3.fromDegreesArray(
                [...Destination.ZHU_HAI, ...Destination.GUANG_ZHOU, ...Destination.LUO_DING]
            ),
            // 线的宽度
            width: 5,
            // 线的颜色
            material: Color.PINK,
            // 线是否可见
            // show: false
        }
    })
    const label = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.GUANG_DONG, 150),
        label: {
            text: '罗定到珠海的直线距离为' + getLength(
                Cartesian3.fromDegrees(...Destination.LUO_DING),
                Cartesian3.fromDegrees(...Destination.ZHU_HAI)
            ),
            font: '10px Helvetica',
            // 按距离缩放
            scaleByDistance: new NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
        }
    })

    // viewer.scene.camera.flyTo({
    //     destination: Cartesian3.fromDegrees(...Destination.GUANG_ZHOU, 400000)
    // })
    viewer.zoomTo(viewer.entities)
    /**
     * 计算两点之间的的距离
     */
    function getLength(left: Cartesian3, right: Cartesian3): string {
        return (Cartesian3.distance(left, right) / 1000).toFixed(2) + '公里'
    }

    return () => {
        viewer.destroy()
    }
}