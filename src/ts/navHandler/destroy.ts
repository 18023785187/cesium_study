/**
 * 处理销毁功能
 */
import type { destroy } from '../typings'
/**
 * @value current: () => void | Promise<() => void>
 */
interface IDestroyHandler {
    current: destroy
}
// 存储当前案例的销毁函数，在切换案例时执行
const destroyHandler: IDestroyHandler = { current: () => { } }

/**
 * 处理上一个销毁，存储下一次销毁器
 * @param next () => void
 * @returns undefined
 */
function destroyPrev(next: destroy): void {
    destroyHandler.current()
    if (typeof next === 'function') {
        destroyHandler.current = next
    } else {
        (next as Promise<() => void>).then(destroyFunc => destroyHandler.current = destroyFunc)
    }
}

export default destroyPrev
