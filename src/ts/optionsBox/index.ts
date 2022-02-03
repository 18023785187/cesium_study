/**
 * 选项容器
 */
import createOptionsBox from './createOptionsBox'
import createButtonBox from './createButtonBox'
import createRangeBox from './createRangeBox'

const optionsBox: HTMLDivElement = createOptionsBox()

optionsBox.appendChild(createButtonBox())
optionsBox.appendChild(createRangeBox())
document.getElementById('viewer')!.appendChild(optionsBox)
