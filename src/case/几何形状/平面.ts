/**
 * 平面
 * 
 * 使用的重点api：
 *  plane(PlaneGraphics),
 *  Plane
 * 
 * 案例演示：
 *  如何画各种平面
 */
import { Viewer, Cartesian3, Cartesian2, Plane, Color } from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: Viewer = new Viewer('viewer')

    // 蓝色平面
    const bluePlane = viewer.entities.add({
        name: '蓝色平面',
        // 放置的位置
        position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 20000),
        plane: {
            // 平面的法线
            plane: new Plane(Cartesian3.UNIT_X, 0.0),
            // 已法线为中心展开的长宽
            dimensions: new Cartesian2(40000, 40000),
            material: Color.BLUE,
        }
    })
    // 红色带轮廓线平面
    const redPlane = viewer.entities.add({
        name: '红色带轮廓线平面',
        position: Cartesian3.fromDegrees(...Destination.GUANG_ZHOU, 20000),
        plane: {
            plane: new Plane(Cartesian3.UNIT_Y, 0.0),
            dimensions: new Cartesian2(40000, 40000),
            material: Color.RED,
            outline: true,
            outlineWidth: 3000,
            outlineColor: Color.WHITE
        }
    })
    // 黄色轮廓平面
    const yellowOutlinePlane = viewer.entities.add({
        name: '黄色轮廓平面',
        position: Cartesian3.fromDegrees(...Destination.GUANG_ZHOU, 20000),
        plane: {
            plane: new Plane(Cartesian3.UNIT_Z, 0.0),
            dimensions: new Cartesian2(40000, 40000),
            // 去除填充
            fill: false,
            outline: true,
            outlineWidth: 3000,
            outlineColor: Color.YELLOW
        }
    })

    viewer.zoomTo(viewer.entities)

    return () => {
        viewer.destroy()
    }
}