/**
 * 生成描述信息盒子
 */
function createDescriptionBox(): HTMLDivElement {
    const descriptionBox: HTMLDivElement = document.createElement('div')
    descriptionBox.style.cssText += `
        margin-top: .3vh;
    `
    descriptionBox.className = 'description-box'
    return descriptionBox
}

export default createDescriptionBox
