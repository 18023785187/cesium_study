/**
 * 测试utils -> RangeInput
 * 
 * 预期效果：
 *  创建一个文本为test的range元素，滑动滑块输出event，插入到body中，5秒后删除。
 */
import { RangeInput } from 'utils'

const rangeInput = new RangeInput(
    'test',
    {
        min: 0,
        max: 100,
        initialValue: 30
    },
    (e) => {
        console.log(e)
    }
)

rangeInput.appendTo(document.body)

// 5秒后删除
window.setTimeout(() => rangeInput.remove(), 5000)
/**
 * PASS
 */