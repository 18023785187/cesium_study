import './cesium.config'
import 'cesium/Source/Widgets/widgets.css'

// 案例
// import('./case/创建/普通的地球')
// import('./case/创建/纯粹的地球')
// import('./case/创建/使用资源')
// import('./case/创建/生成建筑物')
// import('./case/创建/地形')

import('./case/相机/飞到一个位置')

// import('./case/数据源/GeoJson和TopoJson')
// import('./case/数据源/Wmst')

// import('./case/功能/动态时间')
// import('./case/功能/CallbackProperty')
// import('./case/功能/飞行结束执行动画')
// import('./case/功能/视频投影')
// import('./case/功能/按距离显示')
// import('./case/功能/贴图为地球皮肤')
// import('./case/功能/显示与隐藏实体')
// import('./case/功能/3D瓦砖功能样式')
// import('./case/功能/构建飞行跟踪器')

// import('./case/材质/颜色')
// import('./case/材质/图片')
// import('./case/材质/棋盘')
// import('./case/材质/条纹')
// import('./case/材质/网格')
// import('./case/材质/发光的线')
// import('./case/材质/带轮廓的线')

// import('./case/标记/地图别针')
// import('./case/标记/标签')
// import('./case/标记/放置html元素')

// import('./case/几何形状/点')
// import('./case/几何形状/画一条线')
// import('./case/几何形状/各种线')
// import('./case/几何形状/走廊')
// import('./case/几何形状/平面')
// import('./case/几何形状/圆与椭圆')
// import('./case/几何形状/圆锥与圆柱')
// import('./case/几何形状/各种球')
// import('./case/几何形状/盒子')
// import('./case/几何形状/多边形')
// import('./case/几何形状/折线体')
// import('./case/几何形状/墙体')

// import('./case/3D模型/创建模型')

// 测试
// import 'test/testClickButton'

// 按钮容器
const buttonBox: HTMLDivElement = document.createElement('div')
buttonBox.style.cssText += `
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    display: flex;
    margin: 4px 10px;
`
buttonBox.className = 'button-box'
document.body.appendChild(buttonBox)
