/**
 * 动态时间
 * 
 * 使用的重点api:
 *  Clock,
 *  JulianDate,
 *  ClockRange,
 *  ClockStep,
 *  ClockViewModel
 *  viewer.scene.globe.enableLighting
 * 
 * 案例演示：
 *  时间变化
 */
import { Viewer, Clock, JulianDate, ClockRange, ClockStep, ClockViewModel } from 'cesium'
import { ClickButton } from 'utils'

export default () => {
    // 创建一个始于2022/1/22并以4000倍实时运行的时钟
    const clock: Clock = new Clock({
        // 起始时间
        startTime: JulianDate.fromIso8601("2022-01-22"),
        // 当前时间
        currentTime: JulianDate.fromIso8601("2022-01-22"),
        // 结束时间
        stopTime: JulianDate.fromIso8601("2022-01-23"),
        // 设置结束时循环
        clockRange: ClockRange.LOOP_STOP,
        // 设置时间步长
        clockStep: ClockStep.SYSTEM_CLOCK_MULTIPLIER,
        // 步长为4000
        multiplier: 4000,
        // 开启动画
        shouldAnimate: true,
    })

    const viewer: Viewer = new Viewer('viewer', {
        // 设置一个用于控制当前时间的时钟模型
        clockViewModel: new ClockViewModel(clock)
    })
    // 设置只有当太阳直射的面才会亮
    viewer.scene.globe.enableLighting = true;

    const btn1 = new ClickButton('重置', () => {
        // 把起始时间赋值给当前时间
        const resetTime = viewer.clockViewModel.startTime
        viewer.clockViewModel.currentTime = resetTime
    })
    const btn2 = new ClickButton('减速', () => {
        viewer.clockViewModel.multiplier /= 2;
    })
    const btn3 = new ClickButton('加速', () => {
        viewer.clockViewModel.multiplier *= 2;
    })

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    btn2.appendTo(buttonBox)
    btn3.appendTo(buttonBox)

    return () => {
        viewer.destroy()
        btn1.remove()
        btn2.remove()
        btn3.remove()
    }
}