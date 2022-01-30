# Viewer(视图)

用于构建应用程序的基本小部件。它将所有标准Cesium小部件组合到一个可重用的程序包中。窗口小部件可总是通过使用混入，其添加功能可用于多种应用进行扩展。

关于Viewer的详细文档

<p><a href="https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html?classFilter=Viewer">Viewer 英文</a></p>
<p><a href="http://cesium.xin/cesium/cn/Documentation1.62/Viewer.html?classFilter=Viewer">Viewer 中文</a></p>

```typescript
const viewer: Viewer = new Viewer(container, options | undefined)
type container = Element | String // 元素或ID选择器
type options = {
    animation?: boolean | true, // 是否显示动画小部件
    baseLayerPicker?: boolean | true, // 是否显示地图选择小部件
    fullscreenButton?: boolean | true, // 是否显示全屏小部件
    vrButton?: boolean | false, // 是否显示VR小部件
    geocoder?: boolean | true, // 是否开启搜索小部件
    homeButton?: boolean | true, // 是否开启回家小部件
    infoBox?: boolean | true, // 是否开启地理信息小部件
    sceneModePicker?: boolean | true, // 是否开启地图模式选择小部件 2D 2.5D 3D
    selectionIndicator?: boolean | true, // 是否开启selectionIndicator小部件
    timeline?: boolean | true, // 是否时间线小部件
    navigationHelpButton?: boolean | true, // 是否开启帮助小部件
    navigationInstructionsInitiallyVisible?: boolean | true, // 是否初始化时展开帮助小部件
    projectionPicker?: boolean | false, // 是否开启投影小部件
    scene3DOnly?: boolean | false, // 是否每个几何实例仅以3D渲染以节省GPU内存
    shouldAnimate?: boolean | false, // 时钟是否尝试提前模拟时间
    showRenderLoopErrors?: boolean | true, // 是否将渲染错误信息显示到页面
    mapMode2D?: number | MapMode2D.INFINITE_SCROLROTATEL, // 确定是开启无限水平位移还是滚动
    terrainShadows?: number | ShadowMode.RECEIVE_ONLY, // 确定地形是否投射或接收来自光源的阴影
    shadows?: boolean | false, // 阴影是否由光源投射
    sceneMode?: number | SceneMode.SCENE3D, // 初始场景模式
    fullscreenElement?: dom | string#id, // 按下全屏时指定映射在该元素身上
    terrainProvider?: TerrainProvider, // 要使用的地形提供者
    clockViewModel?: ClockViewModel, // 设置时钟模型
    /* 还有一些配置项 */
}

// 变量
viewer.camera // 获取相机
viewer.canvas // 获取画布
viewer.clock // 获取时钟
viewer.CesiumWidget // 获取CesiumWidget
viewer.dataSources // 获取要可视化的 DataSource 实例集
viewer.entities // 获取未绑定到特定数据源的实体的集合
viewer.scene // 获取场景
viewer.imageryLayers // 获取将在地球上渲染的图像图层的集合
viewer.selectedEntity // 获取或设置要为其显示选择指示符的对象实例
viewer.trackedEntity // 获取相机跟踪的实体
viewer.screenSpaceEventHandler // 获取屏幕空间事件处理程序
viewer.trackedEntityChanged // 获取当被跟踪实体更改时引发的事件
viewr.selectedEntityChanged // 获取当选定实体更改时引发的事件

// 方法
viewer.destroy() // 销毁小部件。如果被永久调用从布局中删除小部件。

const isDestroyed: boolean = viewer.isDestroyed() // 如果部件被销毁，返回true

viewer.flyTo(target, options)
type target = Entity | Array.< Entity > | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | TimeDynamicPointCloud | Promise.<( Entity |Array.< Entity >| EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | TimeDynamicPointCloud )>
type options = {
    duration?: number, // 飞行时间
    maximumHeight?: number, // 飞行时可到达的最大高度

}

viewer.zoomTo(target, offset) // 异步设置摄像机以查看提供的一个或多个实体或数据源

viewer.render() // 渲染场景。该功能会自动调用除非 useDefaultRenderLoop 设置为false

viewer.resize() // 调整窗口小部件的大小以匹配容器的大小。除非需要，否则将自动调用此函数 useDefaultRenderLoop 设置为false。

```