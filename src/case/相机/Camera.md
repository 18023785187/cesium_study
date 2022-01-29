# Camera(相机)

摄像机由位置，方向和视锥台定义。

方向与视图形成正交基准，上和右=视图x上单位矢量。

视锥由6个平面定义。每个平面都由 Cartesian4 对象表示，其中x，y和z分量定义垂直于平面的单位矢量，w分量是从原点/相机位置开始的平面。

<p>这里会罗列出一些相机常用的变量与方法，更多的内容请移步至
<p><a href="https://cesium.com/learn/cesiumjs/ref-doc/Camera.html?classFilter=Camera">Camera 中文</a></p>
<p><a href="http://cesium.xin/cesium/cn/Documentation1.62/Camera.html">Camera 英文</a></p>
</p>

```typescript
// 方法
camera.flyTo(options) //将相机从当前位置移动到新位置
type options = {
    destination: Cartesian3 | Rectangle, // 相机降落的位置
    orientation?: { // 方位
        heading?: number, // 航向
        pitch?: number, // 俯仰
        roll?: number, // 横滚
    },
    duration?: number, // 飞行持续时间
    complete?: () => void, // 飞行结束要执行的功能
    cancel?: () => void, // 取消航班时要执行的功能
    maximumHeight?: number, // 相机在飞行中能到达的最大高度
    pitchAdjustHeight?: number, // 如果相机的飞行角度高于该值，请在飞行过程中调整俯仰角度以向下看，并将地球保持在视口中。
    /* 还有一些配置项 */
}

camera.flyTo(duration) // 将相机飞到主视图。使用 Camera＃.DEFAULT_VIEW_RECTANGLE 进行设置3D场景的默认视图。
type duration = number // 飞行的持续时间



```