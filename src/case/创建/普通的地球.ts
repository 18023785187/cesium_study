/**
 * 普通的地球
 * 
 * 使用的重点api:
 *  Viewer
 * 
 * 案例演示：
 *  创建一个普通的地球
 */
import { Viewer } from 'cesium'

export default () => {
    // 创建一个普通地球，可传入两个参数，第一个参数为id选择器或dom，第二个参数为配置对象
    const viewer: Viewer = new Viewer('viewer', /** options */)
    
    return () => {
        viewer.destroy()
    }
}