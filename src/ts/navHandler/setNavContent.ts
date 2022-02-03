/**
 * 这是列表控制功能，可以切换case
 * 为nav组件添加内容和功能
 */
import { navData, caseAsyncScriptMap } from '../options'
import { localStorageToken } from '@/constants'
import destroyPrev from './destroy'
import replace from './highElHandler'

// 获取上一次案例记录
const case_token: string = window.localStorage.getItem(localStorageToken.CASE_TOKEN) || '普通的地球'
caseAsyncScriptMap[case_token]().then((res: any) => destroyPrev(res.default()))

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
        const curItemData = data[i]

        const liEl: HTMLLIElement = document.createElement('li')
        liEl.className += ' case-list-item'
        liEl.textContent = curItemData.name
        // 数据初始化时需要使目标导航高亮
        if(curItemData.name === case_token) {
            replace(liEl)
        }
        // 点击加载案例并进行处理工作
        liEl.addEventListener('click', () => {
            replace(liEl)
            const modules: Promise<any> = curItemData.default()
            modules
                .then((res: any) => {
                    window.localStorage.setItem(localStorageToken.CASE_TOKEN, curItemData.name)
                    // 切换案例，执行前一个案例的销毁函数
                    destroyPrev(res.default())
                })
                .catch((err: any) => {
                    alert('加载失败')
                })
        })
        ulEl.appendChild(liEl)
    }
    navEl.appendChild(ulEl)
}
