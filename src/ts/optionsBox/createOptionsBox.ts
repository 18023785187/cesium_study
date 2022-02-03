/**
 * 生成最大的容器
 * @returns HTMLDivElement
 */
function createOptionsBox(): HTMLDivElement {
    const optionsBox: HTMLDivElement = document.createElement('div')
    optionsBox.style.cssText += `
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        margin: .3vh;
    `
    optionsBox.className = 'options-box'
    return optionsBox
}

export default createOptionsBox