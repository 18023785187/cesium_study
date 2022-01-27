/**
 * 各种球
 * 
 * 使用的重点api：
 *  ellipsoid(EllipsoidGraphics),
 *  Transforms,
 *  orientation,
 *  Math
 * 
 * 案例演示：
 *  如何画各种球
 */
import { Viewer, Cartesian3, Color, Transforms, HeadingPitchRoll, Math } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

// 设置珠海的位置
const zhuhaiPosition = Cartesian3.fromDegrees(...Destination.ZHU_HAI, 100000)
// 放置一个卫星
viewer.entities.add({
    name: '卫星球体',
    position: zhuhaiPosition,
    // 定义一个球
    ellipsoid: {
        // 椭圆体在x，y和z方向上的半径
        radii: new Cartesian3(20000, 20000, 20000),
        // 材质
        material: new Color(0.95, 0.82, 0.49)
    }
})
// 定义卫星內环
viewer.entities.add({
    name: '卫星内环',
    position: zhuhaiPosition,
    // 設置方向
    // headingPitchRollQuaternion旋转
    orientation: Transforms.headingPitchRollQuaternion(
        zhuhaiPosition,
        // 航向，俯仰和滚动。
        new HeadingPitchRoll(
            Math.toRadians(30),
            Math.toRadians(30)
        )
    ) as any,
    // 球
    ellipsoid: {
        // 椭圆体在x，y和z方向上的半径
        radii: new Cartesian3(40000, 40000, 40000),
        // 椭圆体在x，y和z方向上的内半径, 相当于挖空
        innerRadii: new Cartesian3(30000, 30000, 30000),
        // 从正z轴向负z轴测量的最小角度, 现在表示向上挖空89.8度
        minimumCone: Math.toRadians(89.8),
        // 从正z轴向负z轴测量的最大角度, 现在表示向下挖空90.2度，换言之是除了上面的90.2度其他都要挖空
        maximumCone: Math.toRadians(90.2),
        // 材质
        material: new Color(0.95, 0.82, 0.49, .5)
    }
})
// 定义卫星外环
viewer.entities.add({
    name: '卫星外环',
    position: zhuhaiPosition,
    // 設置方向
    orientation: Transforms.headingPitchRollQuaternion(
        zhuhaiPosition,
        new HeadingPitchRoll(
            Math.toRadians(30),
            Math.toRadians(30)
        )
    ) as any,
    ellipsoid: {
        radii: new Cartesian3(46000, 46000, 46000),
        innerRadii: new Cartesian3(42000, 42000, 42000),
        minimumCone: Math.toRadians(89.8),
        maximumCone: Math.toRadians(90.2),
        material: new Color(0.95, 0.82, 0.49, .5)
    }
})

// 蓝色上半球
viewer.entities.add({
    name: '蓝色空心上半球',
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI),
    ellipsoid: {
        radii: new Cartesian3(25000, 25000, 25000),
        // pi/2
        maximumCone: Math.PI_OVER_TWO,
        material: Color.BLUE.withAlpha(0.5),
        outline: true
    }
})

// 红色空心上半椭球
viewer.entities.add({
    name: '红色空心上半椭球',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + .5, Destination.ZHU_HAI[1]),
    ellipsoid: {
        // 只要控制三个参数就可以控制球的形状
        radii: new Cartesian3(25000, 20000, 15000),
        // 向内填充
        innerRadii: new Cartesian3(10000, 8000, 6000),
        maximumCone: Math.PI_OVER_TWO,
        material: Color.RED.withAlpha(0.5),
        outline: true
    }
})

// 黄色顶部有切口的空心上半球
viewer.entities.add({
    name: '黄色顶部有切口的空心上半球',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + 1, Destination.ZHU_HAI[1]),
    ellipsoid: {
        radii: new Cartesian3(25000, 25000, 25000),
        innerRadii: new Cartesian3(10000, 10000, 10000),
        // 向上挖空20度
        minimumCone: Math.toRadians(20.0),
        // 向下挖空90度
        maximumCone: Math.PI_OVER_TWO,
        material: Color.YELLOW.withAlpha(0.5),
        outline: true
    }
})

// 青绿色顶部和底部都有切口的空心球
viewer.entities.add({
    name: '青绿色顶部和底部都有切口的空心球',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + 1.5, Destination.ZHU_HAI[1], 25000),
    ellipsoid: {
        radii: new Cartesian3(25000, 25000, 25000),
        innerRadii: new Cartesian3(10000, 10000, 10000),
        minimumCone: Math.toRadians(20.0),
        maximumCone: Math.toRadians(160.0),
        material: Color.DARKCYAN.withAlpha(0.5),
        outline: true
    }
})

// 绿色碗状
viewer.entities.add({
    name: '绿色碗状',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0], Destination.ZHU_HAI[1] + .5, 25000),
    ellipsoid: {
        radii: new Cartesian3(25000, 25000, 25000),
        innerRadii: new Cartesian3(22000, 22000, 22000),
        minimumCone: Math.PI_OVER_TWO,
        material: Color.GREEN.withAlpha(0.5),
        outline: true
    }
})

// 粉色纵向切口的空心上半球
viewer.entities.add({
    name: '粉色纵向切口的空心上半球',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + .5, Destination.ZHU_HAI[1] + .5),
    ellipsoid: {
        radii: new Cartesian3(25000, 25000, 25000),
        innerRadii: new Cartesian3(15000, 15000, 15000),
        maximumCone: Math.PI_OVER_TWO,
        // 沿x轴逆时针挖空130度
        minimumClock: Math.toRadians(130.0),
        material: Color.PINK.withAlpha(0.5),
        outline: true
    }
})

// 橙色纵向切口的空心上半球
viewer.entities.add({
    name: '橙色纵向切口的空心上半球',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + 1, Destination.ZHU_HAI[1] + .5),
    ellipsoid: {
        radii: new Cartesian3(25000, 25000, 25000),
        maximumCone: Math.PI_OVER_TWO,
        // 沿x轴逆时针保留130度, 其余挖空
        maximumClock: Math.toRadians(130.0),
        material: Color.ORANGE.withAlpha(0.5),
        outline: true
    }
})

// 白色球锥
viewer.entities.add({
    name: '白色球锥',
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + 1.5, Destination.ZHU_HAI[1] + .5),
    ellipsoid: {
        radii: new Cartesian3(25000, 25000, 25000),
        innerRadii: new Cartesian3(1, 1, 1),
        minimumCone: Math.toRadians(45.0),
        maximumCone: Math.PI_OVER_TWO,
        minimumClock: Math.toRadians(45.0),
        maximumClock: Math.PI_OVER_TWO,
        outline: true
    }
})

viewer.zoomTo(viewer.entities)
