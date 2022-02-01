import './cesium.config'
import 'cesium/Source/Widgets/widgets.css'
import 'assets/css/base.css'

import './ts/App'

// 测试
// import 'test/testClickButton'
// import 'test/testRangeInput'

if (process!.env!.NODE_ENV !== 'development') {
    console.log(
        `%c本网页为Cesium初学者提供案例效果展示,请在./src/cases目录下阅读相关案例的源码进行学习
源码见: https://github.com/18023785187/cesium_study.git`,
        `color: red;`
    )
}

document.body.style.display = 'block'
