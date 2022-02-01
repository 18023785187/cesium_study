/**
 * 选项容器
 */
import createButtonBox from './createButtonBox'
import createRangeBox from './createRangeBox'

const optionsBox: HTMLDivElement = document.createElement('div')
optionsBox.style.cssText += `
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        margin: .3vh .8vw;
    `
optionsBox.className = 'options-box'

optionsBox.appendChild(createButtonBox())
optionsBox.appendChild(createRangeBox())
document.getElementById('viewer')!.appendChild(optionsBox)
