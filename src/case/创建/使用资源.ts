/**
 * 使用资源
 * 
 * 使用的重点api:
 *  Cesium3DTileset,
 *  IonResource
 * 
 * 案例演示：
 *  使用自己的cesium账号中的资源。
 *  请前往 https://cesium.com/ion/assets/ 创建属于自己的Cesium账号。
 *  本案例使用了AccessToken，因此可以访问该令牌账号中的资源(资源编号为AssetId: xxx)，
 *  你可以在cesium.config.ts中修改 Ion.defaultAccessToken = 你的令牌使得案例能使用你定义的AssetId
 */
import { Viewer, Cesium3DTileset, IonResource } from 'cesium'

const viewer: Viewer = new Viewer('viewer')

const tileset = viewer.scene.primitives.add(
    // 添加一个3D瓦砖
    new Cesium3DTileset({
        /**
         * IonResource 封装cesium离子资产访问的 Resource 实例
         * fromAssetId 异步创建一个实例
         * 
         *  在当前令牌中你可以访问如下AssetId：
         *      43978 墨尔本点云,
         *      69380 墨尔本摄影测量,
         *      793127 AGI_HQ,
         *      793151 墨尔本_传感器_活动
         */
        url: IonResource.fromAssetId(793127),
    })
)

tileset.readyPromise.then(() => viewer.zoomTo(tileset))
