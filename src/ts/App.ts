/**
 * 控制器
 */
import './setNavContent'

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
document.getElementById('viewer')!.appendChild(buttonBox)