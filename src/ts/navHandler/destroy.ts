/**
 * 处理销毁功能
 */

// 存储当前案例的销毁函数，在切换案例时执行
const destroyHandler = { crrent: () => {} }

/**
 * 处理上一个销毁，存储下一次销毁器
 * @param next () => void
 */
function destroyPrev(next: () => {}): void {
    destroyHandler.crrent()
    destroyHandler.crrent = next
}

export default destroyPrev
