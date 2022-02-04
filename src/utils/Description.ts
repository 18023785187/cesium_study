
interface IDescription {
    el: HTMLDivElement,
    readonly refs: { [propsName: string]: HTMLElement },
    appendTo: (parentNode: Element | HTMLElement) => void,
    remove: () => void
}
/**
 * 描述信息元素,
 * 在输入标签中添加data-ref='xxx'可以将该生成元素添加到标识器中
 * @param html string  html文本内容
 * @returns Description
 */
class Description implements IDescription {
    public el: HTMLDivElement
    readonly refs: { [propsName: string]: HTMLElement }
    constructor(html: string) {
        const el: HTMLDivElement = document.createElement('div')
        el.className = 'description-item'
        el.innerHTML = html
        this.el = el
        this.refs = {}
        // 获取标有data-ref的元素, 根据标识存入refs容器内
        const refs: HTMLElement[] = Array.from(el.querySelectorAll('[data-ref]'))
        for (let i = 0; i < refs.length; ++i) {
            const ref: HTMLElement = refs[i]
            const refTag: string = ref.getAttribute('data-ref')!
            this.refs[refTag] = ref
        }
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

export default Description
