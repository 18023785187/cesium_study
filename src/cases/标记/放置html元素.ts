/**
 * 放置html元素
 * 
 * 使用的重点api:
 *  cartesianToCanvasCoordinates,
 *  Cartesian2
 * 
 *  案例演示
 *      把html元素放置在cesium地图中
 */
import { Viewer, Cartesian2, Cartesian3, defined } from 'cesium'
import { Destination } from '@/constants'

export default () => {

    const viewer: Viewer = new Viewer('viewer')
    const dom: HTMLDivElement = document.createElement('div')
    dom.textContent = '点我'
    dom.style.cssText = `
    position: absolute;
    font-size: 30px;
    font-weight: 700;
    color: pink;
`
    dom.onclick = function () {
        alert('你好')
    }
    document.body.appendChild(dom)

    // 放置html，其原理是给dom元素设置定位，监听preRender事件在每一帧都获取到经纬度坐标并将其转换为视口坐标点赋值给dom
    viewer.scene.preRender.addEventListener(() => {
        // 获取珠海经纬度
        const position: Cartesian3 = Cartesian3.fromDegrees(...Destination.ZHU_HAI)
        // 将经纬度转化为坐标点
        const canvasPosition: Cartesian2 = viewer.scene.cartesianToCanvasCoordinates(
            position,
            new Cartesian2()
        )
        // defined作用是检测目标是否存在
        if (defined(canvasPosition)) {
            dom.style.top = canvasPosition.y + 'px'
            dom.style.left = canvasPosition.x + 'px'
        }
    })

    return () => {
        viewer.destroy()
        dom.remove()
    }
}