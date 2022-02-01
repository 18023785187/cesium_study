/**
 * 生成滑动条容器
 * @returns HTMLDivElement
 */
 function createRangeBox(): HTMLDivElement {
    const rangeBox: HTMLDivElement = document.createElement('div')
    rangeBox.className = 'range-box'
    return rangeBox
}

export default createRangeBox
