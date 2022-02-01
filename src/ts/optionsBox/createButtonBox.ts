/**
 * 生成按钮容器
 * @returns HTMLDivElement
 */
function createButtonBox(): HTMLDivElement {
    const buttonBox: HTMLDivElement = document.createElement('div')
    buttonBox.style.cssText += `
        display: flex;
    `
    buttonBox.className = 'button-box'
    return buttonBox
}

export default createButtonBox
