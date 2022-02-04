/**
 * 聚类
 */
import { Viewer } from 'cesium'
import { ClickButton, RangeInput } from 'utils'

export default () => {
    const viewer: Viewer = new Viewer('viewer')

    

    const btn1 = new ClickButton('开启聚类yes', () => {
        if(btn1.el.textContent === '开启聚类yes') {
            btn1.el.textContent = '开启聚类no'
        } else {
            btn1.el.textContent = '开启聚类yes'
        }
    })
    const btn2 = new ClickButton('个性化yes', () => {
        if(btn2.el.textContent === '个性化yes') {
            btn2.el.textContent = '个性化no'
        } else {
            btn2.el.textContent = '个性化yes'
        }
    })
    const range1 = new RangeInput('像素范围', { min: 1, max: 200 })
    const range2 = new RangeInput('最小集群大小', { min: 1, max: 200 })

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    btn2.appendTo(buttonBox)
    const rangeBox: HTMLDivElement = document.getElementsByClassName('range-box')[0] as HTMLDivElement
    range1.appendTo(rangeBox)
    range2.appendTo(rangeBox)

    return () => {
        viewer.destroy()
        btn1.remove()
        btn2.remove()
        range1.remove()
        range2.remove()
    }
}
