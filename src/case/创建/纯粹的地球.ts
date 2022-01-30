/**
 * 纯粹的地球
 * 
 * 使用的重点api:
 *  Viewer
 * 
 * 案例演示：
 *  创建一个纯粹的地球，即不包含小部件等功能
 */
import { CesiumWidget } from 'cesium'

export default () => {
    // 创建一个普通地球，可传入两个参数，第一个参数为id选择器或dom，第二个参数为配置对象
    const viewer: CesiumWidget = new CesiumWidget('viewer', /** options */)

    return () => {
        viewer.destroy()
    }
}