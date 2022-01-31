/**
 * 墙
 * 
 * 使用的重点api：
 *   wall(WallGraphics)
 * 
 * 案例演示：
 *  绘制各种墙
 */
import { Viewer, Cartesian3, Color } from 'cesium'

export default () => {
    const viewer: Viewer = new Viewer('viewer')

    // 红色墙体
    viewer.entities.add({
        name: '红色墙体',
        // 构建墙体
        wall: {
            // 墙体放置的位置与高度
            positions: Cartesian3.fromDegreesArrayHeights([
                -115.0,
                44.0,
                200000.0,
                -90.0,
                44.0,
                200000.0,
            ]),
            // 用于墙底而不是地球表面的高度数组，如果不指定墙体将置于地上
            minimumHeights: [100000.0, 100000.0],
            material: Color.RED,
        }
    })
    // 绿色带轮廓线围墙
    viewer.entities.add({
        name: "绿色带轮廓线围墙",
        wall: {
            // 定义四个坐标使墙围起来
            positions: Cartesian3.fromDegreesArrayHeights([
                -107.0,
                43.0,
                100000.0,
                -97.0,
                43.0,
                100000.0,
                -97.0,
                40.0,
                100000.0,
                -107.0,
                40.0,
                100000.0,
                -107.0,
                43.0,
                100000.0,
            ]),
            material: Color.GREEN,
            outline: true,
        },
    });
    // 蓝色带轮廓线曲折墙体
    viewer.entities.add({
        name: "蓝色带轮廓线曲折墙体",
        wall: {
            // 定义多个点确定墙体每个点位置
            positions: Cartesian3.fromDegreesArray([
                -115.0,
                50.0,
                -112.5,
                50.0,
                -110.0,
                50.0,
                -107.5,
                50.0,
                -105.0,
                50.0,
                -102.5,
                50.0,
                -100.0,
                50.0,
                -97.5,
                50.0,
                -95.0,
                50.0,
                -92.5,
                50.0,
                -90.0,
                50.0,
            ]),
            // 指定要用于墙顶的高度数组，而不是每个位置的高度
            maximumHeights: [
                100000,
                200000,
                100000,
                200000,
                100000,
                200000,
                100000,
                200000,
                100000,
                200000,
                100000,
            ],
            // 一高一低使墙体底部形成折线
            minimumHeights: [
                0,
                100000,
                0,
                100000,
                0,
                100000,
                0,
                100000,
                0,
                100000,
                0,
            ],
            material: Color.BLUE.withAlpha(0.5),
            outline: true,
            outlineColor: Color.BLACK,
        },
    })

    viewer.zoomTo(viewer.entities)

    return () => {
        viewer.destroy()
    }
}