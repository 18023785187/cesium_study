/**
 * 折线体
 * 
   使用的重点api：
    polylineVolume(PolylineVolumeGraphics)
 * 
 * 案例演示：
 *  绘制各种折线体
 */
import { Viewer, Cartesian2, Math as CMath, Cartesian3, Color } from 'cesium'
import { Destination } from '@/constants'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    // 红色圆柱体折线体
    viewer.entities.add({
        name: '红色圆柱体折线体',
        // 构建折线体
        polylineVolume: {
            // 将经纬度坐标当做描绘的点
            positions: Cartesian3.fromDegreesArray(
                [
                    ...Destination.ZHU_HAI,
                    Destination.ZHU_HAI[0] + .5,
                    Destination.ZHU_HAI[1],
                    Destination.ZHU_HAI[0] + .5,
                    Destination.ZHU_HAI[1] + .5
                ]
            ),
            // 指定 Cartesian2 位置的数组，这些位置定义了要拉伸的形状
            shape: computeCircle(10000),
            material: Color.RED
        }
    })
    // 绿色半透明带轮廓线正方体折线体
    viewer.entities.add({
        name: '绿色半透明带轮廓线正方体折线体',
        polylineVolume: {
            positions: Cartesian3.fromDegreesArray(
                [
                    Destination.ZHU_HAI[0] + 1,
                    Destination.ZHU_HAI[1],
                    Destination.ZHU_HAI[0] + 1.5,
                    Destination.ZHU_HAI[1],
                    Destination.ZHU_HAI[0] + 1.1,
                    Destination.ZHU_HAI[1] - 0.1
                ]
            ),
            // 定义成正方体状
            shape: [
                new Cartesian2(-5000, -5000),
                new Cartesian2(5000, -5000),
                new Cartesian2(5000, 5000),
                new Cartesian2(-5000, 5000)
            ],
            material: Color.GREEN.withAlpha(0.5),
            outline: true
        }
    })
    // 蓝色带高度星型折线体
    viewer.entities.add({
        name: '蓝色带高度星型折线体',
        polylineVolume: {
            positions: Cartesian3.fromDegreesArrayHeights(
                [
                    Destination.ZHU_HAI[0] + 1.7,
                    Destination.ZHU_HAI[1],
                    0,
                    Destination.ZHU_HAI[0] + 2.2,
                    Destination.ZHU_HAI[1],
                    10000,
                    Destination.ZHU_HAI[0] + 2.2,
                    Destination.ZHU_HAI[1] - .5,
                    20000
                ]
            ),
            shape: computeStar(7, 10000, 5000),
            material: Color.BLUE,
            outline: true
        }
    })

    viewer.zoomTo(viewer.entities)

    /**
     * 返回以radius为半径的圆形笛卡尔2坐标数组
     * @param radius
     * @returns Cartesian2[]
     */
    function computeCircle(radius: number): Cartesian2[] {
        const position: Cartesian2[] = []
        // 使360度都具有坐标
        for (let i = 0; i < 360; ++i) {
            const radians = CMath.toRadians(i)
            position.push(
                new Cartesian2(
                    radius * Math.cos(radians),
                    radius * Math.sin(radians)
                )
            )
        }
        return position
    }
    /**
     * 返回一个星型形状的笛卡尔2坐标数组
     * @param arms 角的个数
     * @param rOuter 外角的半径
     * @param rInner 内角的半径
     * @returns Cartesian2[]
     */
    function computeStar(arms: number, rOuter: number, rInner: number): Cartesian2[] {
        // 一个角的度数
        const angle: number = Math.PI / arms
        // 因为⭐是具有内外角的，所以角树要*2
        const length: number = 2 * arms
        const positions: Cartesian2[] = new Array(length)
        // 
        for (let i = 0; i < length; ++i) {
            const r: number = i % 2 === 0 ? rOuter : rInner
            positions[i] = new Cartesian2(
                Math.cos(i * angle) * r,
                Math.sin(i * angle) * r
            );
        }
        return positions
    }

    return () => {
        viewer.destroy()
    }
}