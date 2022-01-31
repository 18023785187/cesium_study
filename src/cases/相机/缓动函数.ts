/**
 * 缓动函数
 * 
 * 使用的重点api:
 *  complete,
 *  easingFunction,
 *  EasingFunction
 * 
 * 案例演示：
 *  飞往东京天空树，3秒后再由东京天空树飞到西雅图太空针塔，其中后者飞行动画采用了缓动函数
 */
import { Viewer, createWorldTerrain, createOsmBuildings, Cartesian3, EasingFunction } from 'cesium'

export default () => {
    const viewer: Viewer = new Viewer('viewer', {
        terrainProvider: createWorldTerrain()
    })
    viewer.scene.primitives.add(createOsmBuildings())

    // 飞往东京天空树
    viewer.camera.flyTo({
        destination: new Cartesian3(-3961951.575572026, 3346492.0945766014, 3702340.5336036095),
        orientation: {
            direction: new Cartesian3(0.8982074415844437, -0.4393530288745287, 0.013867512433959908),
            up: new Cartesian3(0.12793638617798253, 0.29147314437764565, 0.9479850669701113),
        },
        // 飞行结束时执行的功能
        complete: function () {
            // 设定在3秒后由东京天空树飞到西雅图太空针塔
            window.setTimeout(function () {
                viewer.camera.flyTo({
                    destination: new Cartesian3(-2304817.2435183465, -3639113.128132953, 4688495.013644141),
                    orientation: {
                        direction: new Cartesian3(0.3760550186878076, 0.9007147395506565, 0.21747547189489164),
                        up: new Cartesian3(-0.20364591529594356, -0.14862471084230877, 0.9676978022659334),
                    },
                    // 设置缓动函数，https://cesium.com/learn/cesiumjs/ref-doc/EasingFunction.html?classFilter=EasingFunction
                    easingFunction: EasingFunction.QUADRATIC_IN_OUT,
                    // 飞行5秒
                    duration: 5
                });
            }, 3000);
        },
    });

    return () => {
        viewer.destroy()
    }
}