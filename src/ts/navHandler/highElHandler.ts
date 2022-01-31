/**
 * 处理高亮元素
 */

// 高亮颜色
const highStyle = `
    color: #fff;
    background-color: red;
`

// 存储上一个高亮的元素，在切换时去除其高亮色
const highEl: { current?: HTMLElement } = { current: undefined }

/**
 * 替换当前高亮元素
 * @param el HTMLElement
 * @returns undefined
 */
function replace(el: HTMLElement): void {
    if (highEl.current === el) return

    if (highEl.current) {
        highEl.current.style.cssText = ''
    }
    el.style.cssText = highStyle
    highEl.current = el
}

export default replace
