/**
 * 处理高亮元素
 */

// 高亮颜色
const highStyle = `
    color: #fff;
    background-color: red;
`

// 存储上一个高亮的元素，在切换时去除其高亮色
let current: HTMLElement | undefined
const highElMap: WeakMap<HTMLElement, HTMLElement> = new WeakMap()

/**
 * 替换当前高亮元素
 * @param el HTMLElement
 * @returns undefined
 */
function replace(el: HTMLElement): void {
    if (current) {
        const prevEl: HTMLElement | undefined = highElMap.get(current)
        if (prevEl === el) return

        if (prevEl) {
            prevEl.style.cssText = ''
        }
        highElMap.delete(current)
    }

    current = el
    el.style.cssText = highStyle
    highElMap.set(current, el)
}

export default replace
