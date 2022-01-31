/**
 * 贴图为地球皮肤
 * 
 * 使用的重点api:
 *  imageryProvider,
 *  createWorldImagery,
 *  IonWorldImageryStyle,
 *  SingleTileImageryProvider
 * 
 * 案例演示：
 *  如何将地球的皮肤替换为图片
 */
import { Viewer, createWorldImagery, IonWorldImageryStyle, ImageryLayerCollection, SingleTileImageryProvider, Rectangle, Cartesian3 } from 'cesium'
import { Destination } from '@/constants'
import catImage from 'assets/images/cat.png'

export default () => {
    const viewer: Viewer = new Viewer('viewer', {
        // 指定使用的底图
        imageryProvider: createWorldImagery({
            // 使用与道路覆盖物的航拍图像，即具有地区与道路标识的影像
            style: IonWorldImageryStyle.AERIAL_WITH_LABELS
        })
    })
    // 获取所有影像图层
    const layers: ImageryLayerCollection = viewer.scene.imageryLayers

    layers.addImageryProvider(
        // 创建一个影像作为底图
        new SingleTileImageryProvider({
            url: catImage,
            // 底图的矩形覆盖范围
            rectangle: Rectangle.fromDegrees(
                ...Destination.ZHU_HAI,
                Destination.ZHU_HAI[0] + 50,
                Destination.ZHU_HAI[1] + 100
            ),
        })
    )

    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 10000000)
    })

    return () => {
        viewer.destroy()
    }
}