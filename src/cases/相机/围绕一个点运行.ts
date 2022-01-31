/**
 * 围绕一个点运行
 * 
 * 使用的重点api:
 *  Cartesian3,
 *  Matrix4,
 *  Transforms,
 *  viewer.scene.camera.lookAtTransform
 *  viewer.clock.onTick.addEventListener
 *  viewer.camera.rotateRight
 * 
 * 案例演示：
 *  在 ./case/相机/锁定到某个点.ts 的基础添加了viewer.clock.onTick事件，在事件中每次旋转
 */
import { Viewer, createWorldTerrain, Cartesian3, Matrix4, Transforms, HeadingPitchRange } from 'cesium'

export default () => {
    const viewer: Viewer = new Viewer('viewer', {
        terrainProvider: createWorldTerrain()
    })

    // 将经纬度，高度转换成弧度
    const center: Cartesian3 = Cartesian3.fromRadians(2.4213211833389243, 0.6171926869414084, 3626.0426275055174);
    // 从具有东北向上轴的参考帧计算4x4变换矩阵以提供的原点为中心，以提供的椭球的固定参考系为中心
    const transform: Matrix4 = Transforms.eastNorthUpToFixedFrame(center);

    // 使用目标和变换矩阵设置相机的位置和方向
    viewer.scene.camera.lookAtTransform(
        // 锁定的中心点
        transform,
        // 设置偏移量的仰角为-Math.PI / 4，距中心点2900米
        new HeadingPitchRange(0, -Math.PI / 4, 2900)
    );

    // 订阅时钟走动事件
    viewer.clock.onTick.addEventListener(() => {
        // 指定相机绕中心向右旋转多少个弧度
        viewer.camera.rotateRight(0.005)
    })

    return () => {
        viewer.destroy()
    }
}
