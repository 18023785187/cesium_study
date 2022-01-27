/**
 * 测试utils -> ClickButton
 * 
 * 预期效果：
 *  创建一个文本为test的div元素，点击输出test，插入到body中，5秒后删除。
 */
import { ClickButton } from 'utils'

const clickButton = new ClickButton('test', () => console.log('test'))

clickButton.appendTo(document.body)

// 5秒后删除
window.setTimeout(() => clickButton.remove(), 5000)
/**
 * PASS
 */
