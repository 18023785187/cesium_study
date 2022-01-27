/**
 * 地图别针
 * 
 * 使用的重点api:
 *  billboard(BillboardGraphics),
 *  PinBuilder
 * 
 * 案例演示：
 *  如何往特定地点中插入一个图片或文字的别针
 */
import { Viewer, PinBuilder, Entity, Cartesian3, Color, VerticalOrigin, Math, buildModuleUrl } from 'cesium'
import { ClickButton } from 'utils'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')
// 生成用于地图图钉的画布元素
const pinBuilder: PinBuilder = new PinBuilder()

let pinkPin: Entity
let textPin: Entity
let imagePin: Entity

// 在广州生成粉色空白别针
const btn1 = new ClickButton('粉色空白别针', () => {
    // 添加前先删除之前生成的实体
    viewer.entities.remove(pinkPin)
    // 在地图中添加一个实体Entity
    pinkPin = viewer.entities.add({
        name: '粉色空白别针',
        // 生成的位置
        position: Cartesian3.fromDegrees(...Destination.GUANG_ZHOU, 50),
        billboard: {
            // 定义图片的路径，当前路径是pinBuilder生成的canvas的url
            // pinBuilder.fromColor(颜色, 尺寸)
            image: pinBuilder.fromColor(Color.PINK, 200).toDataURL(),
            verticalOrigin: VerticalOrigin.BOTTOM
        }
    })
    // 前往广州
    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(...Destination.GUANG_ZHOU, 1000),
        orientation: {
            heading: Math.toRadians(-20),
            pitch: Math.toRadians(-100),
        },
        // 飞行时间
        duration: 1
    })
})

// 在珠海生成绿色文字别针
const btn2 = new ClickButton('绿色文字别针', () => {
    viewer.entities.remove(textPin)
    textPin = viewer.entities.add({
        name: '绿色文字别针',
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 20),
        billboard: {
            // 定义文本别针
            // pinBuilder.fromText(文本, 颜色, 尺寸)
            image: pinBuilder.fromText("你好，珠海", Color.GREEN, 200),
            verticalOrigin: VerticalOrigin.BOTTOM
        }
    })

    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 200),
        orientation: {
            heading: Math.toRadians(-20),
            pitch: Math.toRadians(-100),
        },
        duration: 2
    })
})

// 在罗定生成蓝色图片别针
const btn3 = new ClickButton('蓝色图片别针', () => {
    viewer.entities.remove(imagePin)
    // 加载Cesium/Assets下的一个图片资源
    const url: string = buildModuleUrl("Assets/Textures/maki/grocery.png");
    // 加载图形
    // pinBuilder.fromUrl(图片路径，颜色，尺寸)
    const res: HTMLCanvasElement | Promise<HTMLCanvasElement> = pinBuilder.fromUrl(url, Color.BLUE, 200)
    // 拿到的res第一次是Promise, 之后为canvas
    if (Object.prototype.toString.call(res) === '[object HTMLCanvasElement]') {
        imagePin = viewer.entities.add({
            name: '蓝色图片别针',
            position: Cartesian3.fromDegrees(...Destination.LUO_DING, 20),
            billboard: {
                image: res as HTMLCanvasElement,
                verticalOrigin: VerticalOrigin.BOTTOM
            }
        })
    } else {
        (res as Promise<HTMLCanvasElement>).then(canvas => {
            imagePin = viewer.entities.add({
                name: '蓝色图片别针',
                position: Cartesian3.fromDegrees(...Destination.LUO_DING, 20),
                billboard: {
                    image: canvas,
                    verticalOrigin: VerticalOrigin.BOTTOM
                }
            })
        })
    }

    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(...Destination.LUO_DING, 200),
        orientation: {
            heading: Math.toRadians(-20),
            pitch: Math.toRadians(-100),
        },
        duration: 3
    })
})

const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
btn1.appendTo(buttonBox)
btn2.appendTo(buttonBox)
btn3.appendTo(buttonBox)
