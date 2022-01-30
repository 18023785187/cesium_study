/**
 * 这是列表控制功能，可以切换case
 * 为nav组件添加内容和功能
 */
import { navData } from './constants'

import helloWorld from '@/case/创建/普通的地球'
const destroy = { crrent: helloWorld() }

// 获取导航元素
const navEl: HTMLElement = document.getElementsByClassName('app-nav')[0] as HTMLElement
// 渲染数据
for (let i = 0; i < navData.length; ++i) {
    const { title, data } = navData[i]
    const ulEl: HTMLUListElement = document.createElement('ul')
    const h4El: HTMLHeadingElement = document.createElement('h4')
    ulEl.className += ' case-list'
    h4El.className += ' case-list-title'
    h4El.textContent = title
    ulEl.appendChild(h4El)
    for (let i = 0; i < data.length; ++i) {
        const liEl: HTMLLIElement = document.createElement('li')
        liEl.className += ' case-list-item'
        liEl.textContent = data[i].name
        liEl.addEventListener('click', () => {
            const modules: Promise<any> = data[i].default()
            modules
                .then((res: any) => {
                    destroy.crrent()
                    destroy.crrent = res.default()
                })
                .catch((err: any) => {
                    alert('加载失败')
                })
        })
        ulEl.appendChild(liEl)
    }
    navEl.appendChild(ulEl)
}
