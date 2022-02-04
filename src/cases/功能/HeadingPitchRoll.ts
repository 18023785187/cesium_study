/**
 * HeadingPitchRoll
 * 
 * 使用的重点api：
 *  HeadingPitchRoll,
 *  SampledPositionProperty,
 *  headingPitchRollQuaternion,
 *  viewer.scene.preUpdate.addEventListener
 * 
 * 案例演示：
 *  模拟飞机飞行时改变航向。
 *  可根据指定按键事件更改航向。
 *  官方案例使用的是viewer.scene.primitives.add进行实体的添加并操作，
 *  考虑到官方方法有一定难度所以本案例使用viewer.entities.add对官方案例进行重构
 *  
 *  当前案例篇幅比较长，建议打开ctrl+f快速查找以下案例依赖的函数：
 *      entityPath, 定义路径实体
 *      planeEntity, 定义飞机模型
 *      viewer.scene.preUpdate.addEventListener 订阅更新回调
 */
import {
    Viewer,
    createOsmBuildings,
    createWorldTerrain,
    HeadingPitchRoll,
    SampledPositionProperty,
    PolylineGlowMaterialProperty,
    Color,
    Math,
    Cartesian3,
    Transforms,
    Ellipsoid,
    Matrix4,
    JulianDate,
    ConstantPositionProperty,
    ConstantProperty
} from 'cesium'
import { ClickButton, Description } from 'utils'
import { Destination } from '@/constants'
import CesiumAirModel from 'assets/3d_model/Cesium_Air.glb'

export default () => {
    const viewer: Viewer = new Viewer('viewer', {
        terrainProvider: createWorldTerrain(),
        shouldAnimate: true
    })
    viewer.scene.primitives.add(createOsmBuildings())
    // 位置集合, 用于实时生成路径的位置
    const pathPosition = new SampledPositionProperty()
    // 定义路径实体
    const entityPath = viewer.entities.add({
        position: pathPosition,
        name: "路径",
        path: {
            show: true,
            // 指定要显示的对象后面的秒数
            leadTime: 0,
            // 指定要显示的对象前面的秒数
            trailTime: 60,
            width: 10,
            // 分辨率
            resolution: 1,
            // 定义发光的线
            material: new PolylineGlowMaterialProperty({
                // 发光强度
                glowPower: 0.3,
                // 拖尾，>= 1则不会拖尾
                taperPower: 0.3,
                color: Color.PALEGOLDENROD,
            }),
        },
    })
    /**
     * HeadingPitchRoll(heading , pitch , roll) 旋转
     *  heading 左右摆头角度
     *  pitch 上下摆头角度
     *  roll 横向滚动距离（单位deg）
     */
    const hpRoll: HeadingPitchRoll = new HeadingPitchRoll()
    // 定义位置，在广州5500米处
    let position: Cartesian3 = Cartesian3.fromDegrees(...Destination.GUANG_ZHOU, 5500)
    // 定义飞机模型
    const planeEntity = viewer.entities.add({
        // 位置
        position: position,
        // 飞机的航向
        orientation: new ConstantProperty(Transforms.headingPitchRollQuaternion(
            position,
            hpRoll
        )),
        // 模型
        model: {
            // 模型的路径（.glb）
            uri: CesiumAirModel,
            // 指定模型的最小尺寸
            minimumPixelSize: 128,
            // 模型的最大比例尺大小。 minimumPixelSize的上限
            maximumScale: 20000
        },
    })
    // 初始化时相机跟踪飞机
    viewer.trackedEntity = planeEntity
    // 定义初始速度
    let speed: number = 10
    // 定义速度向量
    let speedVector: Cartesian3 = new Cartesian3()
    // 定义航向偏移量
    const deltaRadians: number = Math.toRadians(3.0)
    // 订阅每次更新的回调，用于更新飞机位置与航向
    viewer.scene.preUpdate.addEventListener((scene, time) => {
        // 计算速度向量，将提供的笛卡尔分量除以提供的标量
        speedVector = Cartesian3.multiplyByScalar(
            Cartesian3.UNIT_X,
            speed / 10,
            speedVector
        )
        // 每次根据飞机矩阵与速度向量更新位置
        position = Matrix4.multiplyByPoint(
            Transforms.headingPitchRollToFixedFrame(
                position,
                hpRoll,
                Ellipsoid.WGS84
            ),
            speedVector,
            position
        )
            // 设置飞机位置与航向
            ; (planeEntity.position as ConstantPositionProperty).setValue(position)
            ; (planeEntity.orientation as ConstantProperty).setValue(Transforms.headingPitchRollQuaternion(
                position,
                hpRoll
            ))
        // 设置光线位置
        pathPosition.addSample(JulianDate.now(), position)
    })
    // 
    const btn1 = new ClickButton('跟踪飞机yes', () => {
        if (btn1.el.textContent === '跟踪飞机no') {
            btn1.el.textContent = '跟踪飞机yes'
            viewer.trackedEntity = planeEntity
        } else {
            btn1.el.textContent = '跟踪飞机no'
            viewer.trackedEntity = undefined
        }
    })
    // 生成说明信息
    const description1 = new Description(`
        <p>单击 3D 窗口，然后使用键盘更改设置。</p>
        <p>航向：<span data-ref='heading'>0.0</span> °</p>
        <p>← 向左/→ 向右</p>
        <p>螺距：<span data-ref='pitch'>0.0</span> °</p>
        <p>↑ 向上/↓ 向下</p>
        <p>滚动：<span data-ref='roll'>0.0</span> °</p>
        <p>← + shift 左/→ + shift 右</p>
        <p>速度：<span data-ref='speed'>10.0</span></p>
        <p>↑ + shift 加速/↓ + shift 减速</p>
    `)
    // 定义按键事件
    document.addEventListener("keydown", (e: KeyboardEvent) => {
        e.preventDefault()
        switch (e.keyCode) {
            // ↓
            case 40:
                if (e.shiftKey) {
                    // 速度下降
                    speed = window.Math.max(--speed, 1)
                    description1.refs.speed.textContent = speed.toString()
                } else {
                    // 螺距下降
                    hpRoll.pitch -= deltaRadians
                    if (hpRoll.pitch < -Math.TWO_PI) {
                        hpRoll.pitch += Math.TWO_PI
                    }
                    description1.refs.pitch.textContent = Math.toDegrees(hpRoll.pitch).toFixed(1)
                }
                break
            // ↑
            case 38:
                if (e.shiftKey) {
                    // 速度上升
                    speed = window.Math.min(++speed, 100)
                    description1.refs.speed.textContent = speed.toString()
                } else {
                    // 螺距上升
                    hpRoll.pitch += deltaRadians
                    if (hpRoll.pitch > Math.TWO_PI) {
                        hpRoll.pitch -= Math.TWO_PI
                    }
                    description1.refs.pitch.textContent = Math.toDegrees(hpRoll.pitch).toFixed(1)
                }
                break
            // →
            case 39:
                if (e.shiftKey) {
                    // 向右滚动
                    hpRoll.roll += deltaRadians
                    if (hpRoll.roll > Math.TWO_PI) {
                        hpRoll.roll -= Math.TWO_PI
                    }
                    description1.refs.roll.textContent = Math.toDegrees(hpRoll.roll).toFixed(1)
                } else {
                    // 向右转
                    hpRoll.heading += deltaRadians
                    if (hpRoll.heading > Math.TWO_PI) {
                        hpRoll.heading -= Math.TWO_PI
                    }
                    description1.refs.heading.textContent = Math.toDegrees(hpRoll.heading).toFixed(1)
                }
                break
            // ←
            case 37:
                if (e.shiftKey) {
                    // 向左滚动
                    hpRoll.roll -= deltaRadians
                    if (hpRoll.roll < 0.0) {
                        hpRoll.roll += Math.TWO_PI
                    }
                    description1.refs.roll.textContent = Math.toDegrees(hpRoll.roll).toFixed(1)
                } else {
                    // 向左转
                    hpRoll.heading -= deltaRadians
                    if (hpRoll.heading < 0.0) {
                        hpRoll.heading += Math.TWO_PI
                    }
                    description1.refs.heading.textContent = Math.toDegrees(hpRoll.heading).toFixed(1)
                }
                break
            default:
        }
    })

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    const descriptionBox: HTMLDivElement = document.getElementsByClassName('description-box')[0] as HTMLDivElement
    description1.appendTo(descriptionBox)

    return () => {
        viewer.destroy()
        btn1.remove()
        description1.remove()
    }
}
