/**
 * 标签
 * 
 * 使用的重点api:
 *  label(LabelGraphics)
 * 
 * 案例演示：
 *  在珠海地区添加一个标签, 案例包含多种样式的标签请自行测试
 */
import { Viewer, Cartesian3, Entity, Color, LabelStyle, NearFarScalar } from 'cesium'
import { ClickButton } from 'utils'
import { Destination } from '@/constants'

import cat from 'assets/images/cat.png'

const viewer: Viewer = new Viewer('viewer')

// 基本标签
const btn1 = new ClickButton('基本标签', () => {
    viewer.entities.removeAll()
    // 添加基本标签，文本为珠海
    const label = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        label: {
            text: '珠海'
        }
    })
    fly()
})
// 彩色标签
const btn2 = new ClickButton('彩色标签', () => {
    viewer.entities.removeAll()
    // 添加彩色标签
    const label = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        label: {
            text: '珠海',
            // 设置字体风格
            font: '50px Helvetica',
            // 设置填充颜色
            fillColor: Color.PINK,
            // 设置轮廓颜色
            outlineColor: Color.RED,
            // 设置轮廓宽度
            outlineWidth: 50,
            // 如何描绘标签
            style: LabelStyle.FILL_AND_OUTLINE,
        }
    })
    fly()
})
// 背景标签
const btn3 = new ClickButton('背景标签', () => {
    viewer.entities.removeAll()
    // 添加背景标签
    const label = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        label: {
            text: '珠海',
            // 按比例缩放
            scale: 2,
            // 显示背景
            showBackground: true,
            // 设置背景颜色
            backgroundColor: new Color(22, 212, 107)
        }
    })
    fly()
})
// 带图片标签
const btn4 = new ClickButton('带图片标签', () => {
    viewer.entities.removeAll()
    // 添加带图片标签
    const label = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        billboard: {
            // NearFarScalar设置眼睛远近距离和远处的地方
            scaleByDistance: new NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
            image: cat,
            // 按比例缩放
            scale: .1
        },
        label: {
            text: '珠海',
            font: '100px Helvetica'
        }
    })
    fly()
})
// 按距离淡化标签
const btn5 = new ClickButton('按距离淡化标签', () => {
    viewer.entities.removeAll()
    // 添加按距离淡化标签
    const label = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        label: {
            text: '珠海',
            font: '100px Helvetica',
            // 淡化效果设置
            translucencyByDistance: new NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
            // 按距离缩放
            scaleByDistance: new NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
        }
    })
    fly()
})

// 动画标签
let antimationEntity: Entity
// 定义一系列数值
let outlineDelta: number = 0.1;
let fontDelta: number = -5.0;
let fontSize: number = 100.0;
let minFontSize: number = 50.0;
let maxFontSize: number = 200;
// 动画函数
const changeEvent = () => {
    if (antimationEntity) {
        (antimationEntity!.label!.outlineWidth as any) += outlineDelta;
        if (
            (antimationEntity!.label!.outlineWidth as any) >= 4.0 ||
            (antimationEntity!.label!.outlineWidth as any) <= 0.0
        ) {
            outlineDelta *= -1.0;
        }

        fontSize += fontDelta;
        if (fontSize >= maxFontSize || fontSize <= minFontSize) {
            fontDelta *= -1.0;
        }
        ;(antimationEntity!.label!.font as any) = fontSize + "px Calibri";
    }
}
const btn6 = new ClickButton('动画标签', () => {
    viewer.scene.preUpdate.removeEventListener(changeEvent)
    viewer.entities.removeAll()
    // 添加动画标签
    antimationEntity = viewer.entities.add({
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
        label: {
            text: '珠海',
            outlineColor: Color.BLACK,
            outlineWidth: 0,
            style: LabelStyle.FILL_AND_OUTLINE,
        }
    })
    // 通过绑定帧事件实现动画
    viewer.scene.preUpdate.addEventListener(changeEvent);

    fly()
})

function fly(): void {
    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 1000000)
    })
}

const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
btn1.appendTo(buttonBox)
btn2.appendTo(buttonBox)
btn3.appendTo(buttonBox)
btn4.appendTo(buttonBox)
btn5.appendTo(buttonBox)
btn6.appendTo(buttonBox)
