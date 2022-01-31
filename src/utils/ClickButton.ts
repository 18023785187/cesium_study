/**
    点击按钮
    @param text string
    @param onclick () => void | undefined
    @returns ClickButton
*/
class ClickButton {
    public el: HTMLDivElement
    constructor(text: string, onclick?: () => void) {
        const el = document.createElement('div')
        el.className = 'click-button-item'
        el.textContent = text
        if (typeof onclick === 'function') {
            el.addEventListener('click', onclick)
        }
        this.el = el
    }
    /**
     * 在指定元素中添加该点击按钮
     */
    public appendTo(parentNode: Element | HTMLElement): void {
        parentNode.appendChild(this.el)
    }
    /**
     * 在页面中删除该点击按钮
     */
    public remove(): void {
        const { el } = this
        const parentNode: ParentNode | null = el.parentNode   
        parentNode && parentNode.removeChild(el)
    }
}

export default ClickButton
