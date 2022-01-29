/**
 * 创建模型
 * 
 * 使用的重点api:
 *  model(ModelGraphics),
 *  
 * 案例演示：
 *  如何创建3D模型
 *  模型可以在自己的资源中加载，也可以使用IonResource.fromAssetId({ AssetId })异步加载，
 *  IonResource.fromAssetId用法请看 src/case/创建/使用资源
 */
import { Viewer, Cartesian3, Transforms, HeadingPitchRoll, Math, Quaternion, Entity } from 'cesium'
import { ClickButton } from 'utils'
import { Destination } from '@/constants'
import CatModel from 'assets/3d_model/Cat.glb'
import CarModel from 'assets/3d_model/Car.glb'
import PoopRainbowModel from 'assets/3d_model/PoopRainbow.glb'
import CesiumAirModel from 'assets/3d_model/Cesium_Air.glb'

const viewer: Viewer = new Viewer('viewer', {
    infoBox: false,
    selectionIndicator: false,
    shadows: true,
    shouldAnimate: true,
})
// 创建猫
const btn1 = new ClickButton('创建猫', () => {
    createModel(CatModel)
})
// 创建跑车
const btn2 = new ClickButton('创建跑车', () => {
    createModel(CarModel)
})
// 创建战机
const btn3 = new ClickButton('创建战机', () => {
    createModel(CesiumAirModel, 5000)
})
// 创建屎
const btn4 = new ClickButton('创建屎', () => {
    createModel(PoopRainbowModel)
})

/**
 * 创建一个glb模型
 * @param url 
 * @param height 
 */
function createModel(url: string, height: number = 0) {
    viewer.entities.removeAll()
    // 定义放置的位置
    const position: Cartesian3 = Cartesian3.fromDegrees(
        ...Destination.ZHU_HAI,
        height
    )
    // 定义模型放置的位置和摆放的角度
    const orientation: Quaternion = Transforms.headingPitchRollQuaternion(
        position,
        /**
         * HeadingPitchRoll(heading , pitch , roll) 旋转
         *  heading 左右摆头角度
         *  pitch 上下摆头角度
         *  roll 横向滚动距离（单位deg）
         */
        new HeadingPitchRoll(Math.toRadians(135), 0, 0)
    )
    // 创建模型实体
    const entity: Entity = viewer.entities.add({
        position: position,
        orientation: orientation as any,
        // 模型
        model: {
            // 模型的路径（.glb）
            uri: url,
            // 指定模型的最小尺寸
            minimumPixelSize: 128,
            // 模型的最大比例尺大小。 minimumPixelSize的上限
            maximumScale: 20000
        },
    })
    viewer.trackedEntity = entity
}

const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
btn1.appendTo(buttonBox)
btn2.appendTo(buttonBox)
btn3.appendTo(buttonBox)
btn4.appendTo(buttonBox)
