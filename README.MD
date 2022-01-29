<h1>Cesium框架案例</h1>

# 启动本地服务

```javascript
$ git clone https://github.com/18023785187/cesium_study.git
$ npm install
$ npm run dll
$ npm run dev
```

# 打包

```javascript
$ npm run build
```

注意：在打包前请在cesium.config.ts -> window.CESIUM_BASE_URL中更改资源根目录

<h4>说明</h4>
<p>案例使用的语言是Typescript, 目的是为了更好地在学习期间找出错误</p>
<p>案例尽可能较多地添加详细的注释，方便读者理解</p>
<p>案例文件在src/case文件夹中, 在src/index.ts中导入即可(注意：需要使用import(path)导入，因为设定按钮容器会在同步代码的最后执行生成)</p>
<p>在案例大纲中会有一些api的描述文件，写这些描述文件的初衷是对比官方网址的api更加简洁</p>
<p>在src/assets/image中可以查看对应案例的效果图</p>

<h4>创建Cesium个人主页</h4>
<p><a href="https://cesium.com/ion/assetdepot/">个人主页</a></p>
<p>你可以在个人主页存放或添加一些资源用于你的Cesium项目, 可以获取AssetToken等</p>

<h4>学习资料</h4>
<p><a href="https://cesium.com/learn/">Cesium 官方文档</a></p>
<p><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-flight-tracker/"></a>CesiumJS 教程</p>
<p><a href="https://cesium.com/learn/cesiumjs/ref-doc/">Cesium Api英文文档</a></p>
<p><a href="http://cesium.xin/cesium/cn/Documentation1.62/">Cesium Api中文文档</a></p>
<p><a href="https://sandcastle.cesium.com/">Cesium 案例</a></p>
<p><a href="http://cesium.xin/">Cesium 中文教学</a></p>

<h4>帮助工具</h4>
<p><a href="https://www.toolnb.com/tools/gps.html">经纬度查询</a></p>
<p><a href="http://datav.aliyun.com/portal/school/atlas/area_selector">GeoJson获取</a></p>

<h4>常用的api(不全)</h4>
<ul>
<strong>Entity</strong>

```javascript
const entity = viewer.entities.add(options) //添加图层

const options = {
    id: 唯一标志,
    name: 名称,
    availability: 可用性,
    show: 可见性,
    description: 描述,
    position: 位置,
    orientation: 方向,
    viewFrom: 查看此对象的初始偏移量,
    parent: 父节点,
    properties: 与此实体关联的任意属性,
    相关的形状: 在以下列表中罗列（共15种）
}
```

<li>point(PointGraphics) 点</li>
<li>billboard(BillboardGraphics) 放置地图别针</li>
<li>label(LabelGraphics) 放置标签</li>
<li>polygon(PolygonGraphics) 多边形</li>
<li>polyline(PolylineGraphics) 线</li>
<li>corridor(CorridorGraphics) 走廊</li>
<li>ellipse(EllipseGraphics) 圆</li>
<li>ellipsoid(EllipsoidGraphics) 球</li>
<li>plane(PlaneGraphics) 平面</li>
<li>box(BoxGraphics) 盒子</li>
<li>cylinder(CylinderGraphics) 圆锥</li>
<li>polylineVolume(PolylineVolumeGraphics) 折线体</li>
<li>wall(WallGraphics) 墙体</li>
<li>model(ModelGraphics) 模型</li>
<strong>CallbackProperty</strong>
<li>用于动画的api</li>
</ul>
<h4>常量(不全)</h4>
<ul>
<strong>Math 数学函数</strong>
<li>toRadians(deg) 角度</li>
<li>XXX 各种常量</li>
<strong>Color 颜色</strong>
<li>new Color(r, g, b, a) 自定义颜色</li>
<li>fromRandom(options) 随机色</li>
<li>XXX 使用某颜色(如RED)</li>
<li>XXX.withAlpha(a) 透明度</li>
<strong>Cartesian3 3D笛卡尔点</strong>
<li>new Cartesian3(x, y, z)</li>
<li>XXX 常量</li>
<li>fromDegrees(longitude, latitude, height , ellipsoid , result) 转为经纬度</li>
<li>fromDegreesArray (coordinates, ellipsoid , result) 转为经纬度数组</li>
<li>fromDegreesArrayHeights (coordinates, ellipsoid , result) 转为带高度的经纬度数组</li>
</ul>

<h4>杂项</h4>
<ol>
<li>cesium的使用需要对webpack进行配置（如果在module模式下），具体配置可在webpack.config.js中找到，已注释 cesium配置 x.</li>
<li>cesium文件过大，每次编译都需要过长的时间，因此需要配置dll将cesium单独打包。注意：为了便于学习调试，请将process.env.NODE_ENV改为development且不要配置sourceMap（sourceMap生成的文件过大会影响编译速度）</li>
</ol>
