/**
 * 打印某个地点的位置
 * 
 * 使用的重点api:
 *  ScreenSpaceEventHandler,
 *  ScreenSpaceEventType,
 * 
 * 案例演示：
 *  打印鼠标点击的那个地方的位置（如果存在）
 */
import { Viewer, ScreenSpaceEventHandler, ScreenSpaceEventType, defined, Cartesian2, Cartesian3 } from 'cesium'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    // 生成一个处理器
    const handler: ScreenSpaceEventHandler = new ScreenSpaceEventHandler(viewer.canvas);
    // 添加一个事件
    handler.setInputAction(
        (
            event: { position: Cartesian2 }
        ) => {
            /**
             *  pickPosition(windowPosition, result)
             *  返回根据深度缓冲区和窗口位置重构的笛卡尔位置。
                从2D中的深度缓冲区重建的位置可能与那些位置略有不同在3D和哥伦布视图中重建。
                这是由于分布差异造成的透视图和正投影的深度值。
             */
            const pickedPosition: Cartesian3 = viewer.scene.pickPosition(event.position)
            if (defined(pickedPosition)) {
                // 打印该点
                console.log(pickedPosition)
            }
        },
        // 该事件为鼠标左击事件
        ScreenSpaceEventType.LEFT_CLICK
    )

    return () => {
        viewer.destroy()
    }
}
