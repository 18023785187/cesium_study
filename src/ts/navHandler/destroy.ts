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
async function destroyPrev(next: destroy): Promise<void> {
    destroyHandler.current()
    if (typeof next === 'function') {
        destroyHandler.current = next
    } else {
        destroyHandler.current = await next
    }
}

export default destroyPrev
