/**
    盒子

    使用的重点api：
        box(BoxGraphics)

    案例演示：
        如何画各种盒子
 */
import { Viewer, Cartesian3, Color } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

// 蓝色盒子
viewer.entities.add({
    name: '蓝色盒子',
    // 放置的位置和高度
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 3000),
    // 放置一个盒子
    box: {
        // 定义盒子的长宽高
        dimensions: new Cartesian3(4000, 4000, 4000),
        // 盒子的材质
        material: Color.BLUE
    }
})
// 红色半透明带轮廓的盒子
viewer.entities.add({
    name: '红色半透明带轮廓的盒子',
    position: Cartesian3.fromDegrees(
        Destination.ZHU_HAI[0] + .1,
        Destination.ZHU_HAI[1],
        3000
    ),
    box: {
        dimensions: new Cartesian3(4000, 4000, 4000),
        material: Color.RED.withAlpha(0.5),
        // 是否使用轮廓线
        outline: true
    }
})
// 黄色只有轮廓线的盒子
viewer.entities.add({
    name: '黄色只有轮廓线的盒子',
    position: Cartesian3.fromDegrees(
        Destination.ZHU_HAI[0] + 0.2,
        Destination.ZHU_HAI[1],
        3000
    ),
    box: {
        dimensions: new Cartesian3(4000, 4000, 4000),
        // 不填充
        fill: false,
        outline: true,
        // 轮廓线颜色设置为黄色
        outlineColor: Color.YELLOW
    }
})

viewer.zoomTo(viewer.entities)
