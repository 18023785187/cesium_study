/**
 * 粒子系统
 */
import {
    Viewer,
    JulianDate,
    ClockRange,
    Cartesian3,
    TimeIntervalCollection,
    TimeInterval,
    SampledPositionProperty,
    VelocityOrientationProperty
} from 'cesium'
import { ClickButton, RangeInput } from 'utils'
import CarModel from 'assets/3d_model/Car.glb'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    // 定义时间界限
    const start: JulianDate = JulianDate.fromDate(new Date())
    // 结束日期为开始时间+120秒
    const stop: JulianDate = JulianDate.addSeconds(
        start,
        120,
        new JulianDate()
    )
    // 设置时间
    viewer.clock.startTime = start.clone()
    viewer.clock.stopTime = stop.clone()
    viewer.clock.currentTime = start.clone()
    // 循环到最后
    viewer.clock.clockRange = ClockRange.LOOP_STOP
    // 时间倍数
    viewer.clock.multiplier = 1
    // 启动动画
    viewer.clock.shouldAnimate = true
    // 为时间线设置边界
    viewer.timeline.zoomTo(start, stop)
    // 起始位置
    const pos1 = Cartesian3.fromDegrees(
        -75.15787310614596,
        39.97862668312678
    )
    // 结束位置
    const pos2 = Cartesian3.fromDegrees(
        -75.1633691390455,
        39.95355089912078
    )
    // 定义位置集合, 开始位置和开始时间对应，结束位置和结束时间对应
    const position = new SampledPositionProperty()
    position.addSample(start, pos1)
    position.addSample(stop, pos2)
    // 放置跑车
    const catEntity = viewer.entities.add({
        // 按开始时间排序的非重叠TimeInterval实例集合
        availability: new TimeIntervalCollection([
            // 由开始和停止时间定义的时间间隔
            new TimeInterval({
                start: start,
                stop: stop,
            }),
        ]),
        model: {
            uri: CarModel,
            minimumPixelSize: 64,
        },
        // 用于查看该对象的建议初始偏移量
        viewFrom: new Cartesian3(-100.0, 0.0, 50.0) as any,
        position: position,
        // 指定实体方向,指定为前进的方向
        orientation: new VelocityOrientationProperty(position),
    })
    // 镜头跟踪该实体
    viewer.trackedEntity = catEntity

    // 盒子发射器
    const btn1 = new ClickButton('盒子发射器')
    // 圆形发射器
    const btn2 = new ClickButton('圆形发射器')
    // 锥形发射器
    const btn3 = new ClickButton('锥形发射器')
    // 球体发射器
    const btn4 = new ClickButton('球体发射器')

    // 速度
    const range1 = new RangeInput('速度', { min: 0, max: 100 })
    // 尺寸
    const range2 = new RangeInput('尺寸', { min: 0, max: 100 })
    // 最小寿命
    const range3 = new RangeInput('最小寿命', { min: 0, max: 100 })
    // 最大寿命
    const range4 = new RangeInput('最大寿命', { min: 0, max: 100 })
    // 最小速度
    const range5 = new RangeInput('最小速度', { min: 0, max: 100 })
    // 最大速度
    const range6 = new RangeInput('最大速度', { min: 0, max: 100 })
    // 开始规模
    const range7 = new RangeInput('开始规模', { min: 0, max: 100 })
    // 结束规模
    const range8 = new RangeInput('结束规模', { min: 0, max: 100 })
    // 重力
    const range9 = new RangeInput('重力', { min: 0, max: 100 })

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    btn2.appendTo(buttonBox)
    btn3.appendTo(buttonBox)
    btn4.appendTo(buttonBox)

    const rangeBox: HTMLDivElement = document.getElementsByClassName('range-box')[0] as HTMLDivElement
    range1.appendTo(rangeBox)
    range2.appendTo(rangeBox)
    range3.appendTo(rangeBox)
    range4.appendTo(rangeBox)
    range5.appendTo(rangeBox)
    range6.appendTo(rangeBox)
    range7.appendTo(rangeBox)
    range8.appendTo(rangeBox)
    range9.appendTo(rangeBox)

    return () => {
        viewer.destroy()
        range1.remove()
        range2.remove()
        range3.remove()
        range4.remove()
        range5.remove()
        range6.remove()
        range7.remove()
        range8.remove()
        range9.remove()
        btn1.remove()
        btn2.remove()
        btn3.remove()
        btn4.remove()
    }
}
