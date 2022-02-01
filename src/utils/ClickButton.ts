/**
    点击按钮
    @param text string  文本内容
    @param onclick (e: MouseEvent) => void | undefined  绑定点击事件
    @returns ClickButton
*/
class ClickButton {
    public el: HTMLDivElement
    constructor(text: string, onclick?: (ev: MouseEvent) => void) {
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
        this.el.remove()
    }
}

export default ClickButton
