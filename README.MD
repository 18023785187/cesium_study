<h1>Cesium框架学习</h1>
<p>案例文件在src/case文件夹中, 在src/index.ts中导入即可(注意：需要使用import(path)导入，因为设定按钮容器会在同步代码的最后执行生成)</p>
<p>在src/assets/image中可以查看对应案例的效果图</p>

<h4>学习资料</h4>
<p>
    <a href="https://cesium.com/learn/">Cesium官方文档</a>
</p>
<p>
    <a href="https://cesium.com/learn/cesiumjs/ref-doc/">Cesium Api英文文档</a>
</p>
<p>
    <a href="http://cesium.xin/cesium/cn/Documentation1.62/">Cesium Api中文文档</a>
</p>
<p>
    <a href="https://sandcastle.cesium.com/">Cesium 案例</a>
</p>
<p>
    <a href="http://cesium.xin/">Cesium 中文教学</a>
</p>

<h4>常用的api(不全)</h4>
<ul>
    Entity
    <li>billboard(BillboardGraphics) 放置地图别针</li>
    <li>label(LabelGraphics) 放置标签</li>
    <li>viewer.entities.add 添加图层</li>
    <li>polyline(PolylineGraphics) 线</li>
    <li>corridor(CorridorGraphics) 走廊</li>
    <li>ellipse(EllipseGraphics) 圆</li>
    <li>ellipsoid(EllipsoidGraphics) 球</li>
    <li>plane(PlaneGraphics) 平面</li>
    <li>cylinder(CylinderGraphics) 圆锥</li>
    CallbackProperty
    <li>用于动画的api</li>
</ul>
<h4>常量(不全)</h4>
<ul>
    Math 数学函数
    <li>toRadians(deg) 角度</li>
    <li>XXX 各种常量</li>
    Color 颜色
    <li>new Color(r, g, b, a) 自定义颜色</li>
    <li>fromRandom(options) 随机色</li>
    <li>XXX 使用某颜色(如RED)</li>
    <li>XXX.withAlpha(a) 透明度</li>
    Cartesian3 3D笛卡尔点
    <li>new Cartesian3(x, y, z)</li>
    <li>XXX 常量</li>
    <li>fromDegrees(longitude, latitude, height , ellipsoid , result) 转为经纬度</li>
    <li>fromDegreesArray (coordinates, ellipsoid , result) 转为经纬度数组</li>
    <li>fromDegreesArrayHeights (coordinates, ellipsoid , result) 转为带高度的经纬度数组</li>
</ul>

<h4>发现的一些问题</h4>
<ol>
    <li>cesium的使用需要对webpack进行配置（如果在module模式下），具体配置可在webpack.config.js中找到，已注释 cesium配置 x.</li>
    <li>cesium文件过大，每次编译都需要过长的时间，因此需要配置dll将cesium单独打包。注意：为了便于学习调试，请将process.env.NODE_ENV改为development且不要配置sourceMap（sourceMap生成的文件过大会影响编译速度）
    </li>
</ol>
