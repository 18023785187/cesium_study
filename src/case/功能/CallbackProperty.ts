/**
 * CallbackProperty(动画原理)
 * 
 *  CallbackProperty是实现Cesium动画的重要函数, 其接收两个参数：
 *      1. callback(time: JulianDate, result: Object) => any: 回调会在每帧调用并返回指定值。
 *          callback参数： time为时间JulianDate对象， result为将值存储到的对象。
 *      2. isConstant: 如果返回false，将会渲染新值，否则不渲染。
 * 
 *  使用的重点api： 
 *      CallbackProperty
 * 
 *  案例演示：
 *      珠海到广州的直线运动动画
 */
import { Viewer, CallbackProperty, JulianDate, PolylineArrowMaterialProperty, Cartesian2, Cartesian3, Color } from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    // 启动时钟动画
    viewer.clock.shouldAnimate = true;
    // 定义起始经纬度和当前经纬度和结束经纬度
    const startDestination: [number, number] = [...Destination.ZHU_HAI]
    const curDestination: [number, number] = [...Destination.ZHU_HAI]
    const endDestination: [number, number] = [...Destination.GUANG_ZHOU]
    // 计算出经纬距离度, 通过这个值计算出每秒应走多少距离，我们设珠海到广州需要7200秒
    const pathCountLongitude: number = endDestination[0] - startDestination[0]
    const pathCountLatitude: number = endDestination[1] - startDestination[1]
    const pathLongitude: number = pathCountLongitude / 7200
    const pathLatitude: number = pathCountLatitude / 7200
    // 定义起始时间为当前时间
    const startTime: JulianDate = JulianDate.now()
    // isConstant决定了动画是否执行
    let isConstant: boolean = false
    // 定义一条动态直线，这条直线将作为行程
    const path = viewer.entities.add({
        name: '珠海到广州',
        polyline: {
            // 本案例重点部分
            positions: new CallbackProperty(
                (time?: JulianDate) => {
                    if (time) {
                        /**
                         * 当时间大于7200秒时，说明到达目的地，isConstant = true
                         * 也可以判断行程来确定是否到达目的地
                         */
    
                        // const curPathCountLongitude = pathLongitude * JulianDate.secondsDifference(time, startTime)
                        // const curPathCountLatitude = pathLatitude * JulianDate.secondsDifference(time, startTime)
                        if (
                            // Math.abs(curPathCountLongitude) >= Math.abs(pathCountLongitude)
                            // &&
                            // Math.abs(curPathCountLatitude) >= Math.abs(pathCountLatitude)
                            JulianDate.secondsDifference(time, startTime) >= 7200
                        ) {
                            isConstant = true
                        } else {
                            curDestination[0] = startDestination[0] + pathLongitude * JulianDate.secondsDifference(time, startTime);
                            curDestination[1] = startDestination[1] + pathLatitude * JulianDate.secondsDifference(time, startTime);
                        }
                    }
    
                    return Cartesian3.fromDegreesArray([
                        ...startDestination,
                        ...curDestination
                    ])
                },
                isConstant
            ),
            width: 20,
            material: new PolylineArrowMaterialProperty(Color.PINK)
        }
    })
    // 添加一个标签作为行程显示
    const text = viewer.entities.add({
        position: (new CallbackProperty(
            (time?: JulianDate, result?: any) => {
                // 定义标签位置在当前行程处
                return path!.polyline!.positions!.getValue(time || new JulianDate(), result)[1];
            },
            isConstant
        ) as any),
        label: {
            text: new CallbackProperty(
                (time?: JulianDate, result?: any) => {
                    const curPoint: Cartesian3 = path!.polyline!.positions!.getValue(time || new JulianDate(), result)[1];
                    // 从起点到当前位置的公里数，distance可以将两个卡迪尔坐标转化为距离
                    return (Cartesian3.distance(Cartesian3.fromDegrees(...startDestination), curPoint) / 1000).toFixed(2) + '公里'
                },
                isConstant
            ),
            font: '30px sans-serif',
            // 文本偏移
            pixelOffset: new Cartesian2(100, 20),
        }
    })
    // 让镜头紧跟text
    viewer.trackedEntity = text;
    
    return () => {
        viewer.destroy()
    }
}