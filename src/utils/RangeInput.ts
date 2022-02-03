interface RangeInputOptions {
    min: number,
    max: number,
    initialValue?: number
}

/**
 * 滑块
    @param text string  文本内容
    @param options RangeInputOptions  配置项
    @param oninput (e: MouseEvent) => void | undefined  绑定input事件
    @returns RangeInput
 */
class RangeInput {
    el: HTMLDivElement
    constructor(
        text: string,
        options: RangeInputOptions,
        oninput?: (ev: Event) => void
    ) {
        const { min, max, initialValue } = options
        /**
         * 创建滑块整体，结构如下
         *  <div class='range-input-item'>
         *      <span class='range-input-item-text'>text</span>
         *      <input class='range-input-item-input' type='range' min='min' max='max'></input>
         *      <span class='range-input-item-value'>value</span>
         *  </div>
         */
        const el: HTMLDivElement = document.createElement('div')
        el.className = 'range-input-item'
        const span: HTMLSpanElement = document.createElement('span')
        span.className = 'range-input-item-text'
        span.textContent = text
        const range: HTMLInputElement = document.createElement('input')
        range.className = 'range-input-item-input'
        range.type = 'range'
        range.min = min.toString()
        range.max = max.toString()
        const valueShow: HTMLSpanElement = document.createElement('span')
        valueShow.className = 'range-input-item-value'
        el.appendChild(span)
        el.appendChild(range)
        el.appendChild(valueShow)
        if (initialValue != null) {
            range.value = initialValue.toString()
        }
        valueShow.textContent = range.value
        // 绑定数据更新
        range.addEventListener('input', () => valueShow.textContent = range.value)
        if (typeof oninput === 'function') {
            range.addEventListener('input', oninput)
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

export default RangeInput
