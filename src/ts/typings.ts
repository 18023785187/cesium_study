/**
 * 销毁函数
 * @value () => void | Promise<() => void>
 */
type destroy = () => void | Promise<() => void>
/**
 * cases案例导出模块
 * @value { 
 *  default: () => () => void | Promise<() => void>
 * }
 */
type moduleCases = {
    default: () => () => void | Promise<() => void>
}

export type {
    destroy,
    moduleCases
}
