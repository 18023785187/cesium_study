/**
 * 测试utils -> Description
 * 
 * 预期效果：
 *  1.生成3行p标签，文本为test。
 *  2.打印data-ref的元素内容。
 *  3.插入到body中，5秒后删除。
 */
import { Description } from 'utils'
// 1
const description = new Description(
    `
        <p data-ref='1'>test</p>
        <p data-ref='2'>test</p>
        <p data-ref='3'>test</p>
    `
)
// 2
console.log(description.refs)
// 3
description.appendTo(document.body)
// window.setTimeout(() => description.remove(), 5000)
/**
 * PASS
 */