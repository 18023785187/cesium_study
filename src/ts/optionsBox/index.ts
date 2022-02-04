/**
 * 选项容器
 */
import createOptionsBox from './createOptionsBox'
import createButtonBox from './createButtonBox'
import createRangeBox from './createRangeBox'
import createDescriptionBox from './createDescriptionBox'

const optionsBox: HTMLDivElement = createOptionsBox()

optionsBox.appendChild(createButtonBox())
optionsBox.appendChild(createRangeBox())
optionsBox.appendChild(createDescriptionBox())
document.getElementById('viewer')!.appendChild(optionsBox)
