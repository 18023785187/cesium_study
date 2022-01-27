/**
    点击按钮
*/
class ClickButton {
    public el: HTMLDivElement
    constructor(text: string, onclick?: () => void) {
        const el = document.createElement('div')
        el.style.cssText = `
            display: inline-block;
            line-height: 18px;
            padding: 4px 10px;
            margin-right: 10px;
            color: #fff;
            background-color: rgb(48, 51, 54);
            border: 1px solid #fff;
            border-radius: 2px;
            cursor: pointer;
        `
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
