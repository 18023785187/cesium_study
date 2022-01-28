/**
 * 多边形
 * 
 * 使用的重点api：
 *  polygon(PolygonGraphics)
 * 
 * 案例演示：
 *  画各种各样的多边形
 */
import { Viewer, Cartesian3, Color, ArcType } from 'cesium'
import { Destination } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

// 红色多边形
viewer.entities.add({
    name: '红色多边形',
    //  绘制多边形
    polygon: {
        // 根据各经纬度坐标连线得到多边形
        hierarchy: Cartesian3.fromDegreesArray(
            [
                ...Destination.ZHU_HAI,
                ...getZhuHaiRoundPosition(-0.02, 0.01),
                ...getZhuHaiRoundPosition(-0.01, 0.01),
                ...getZhuHaiRoundPosition(-0.01, 0.02),
                ...getZhuHaiRoundPosition(0.01, 0.01),
            ]
        ) as any,
        material: Color.RED
    }
})
// 绿色挤压高度的多边形
viewer.entities.add({
    name: '绿色挤压高度的多边形',
    polygon: {
        hierarchy: Cartesian3.fromDegreesArray(
            [
                ...getZhuHaiRoundPosition(0.03, 0),
                ...getZhuHaiRoundPosition(0.04, 0),
                ...getZhuHaiRoundPosition(0.04, 0.03),
            ]
        ) as any,
        material: Color.GREEN,
        // 挤压的高度
        extrudedHeight: 2000,
        // 不关闭顶部封口
        closeTop: false,
        // 不关闭底部封口
        closeBottom: false
    }
})
// 顶点高度不一致带轮廓的橙色多边体
viewer.entities.add({
    name: '顶点高度不一致带轮廓的橙色多边体',
    polygon: {
        // 采用fromDegreesArrayHeights使顶点具有高度
        hierarchy: Cartesian3.fromDegreesArrayHeights(
            [
                ...getZhuHaiRoundPosition(0.06, 0),
                1000,
                ...getZhuHaiRoundPosition(0.08, 0),
                2000,
                ...getZhuHaiRoundPosition(0.08, 0.02),
                3000,
                ...getZhuHaiRoundPosition(0.06, 0.02),
                4000
            ]
        ) as any,
        extrudedHeight: 0,
        material: Color.ORANGE.withAlpha(0.5),
        outline: true,
        // 是否使用指定的高度，只有为true定义的高度才会生效
        perPositionHeight: true
    }
})
// 蓝色回字多边形
viewer.entities.add({
    name: '蓝色回字多边形',
    polygon: {
        // 定义多边形中孔的多边形层次结构
        hierarchy: {
            positions: Cartesian3.fromDegreesArray([
                ...getZhuHaiRoundPosition(0.1, 0),
                ...getZhuHaiRoundPosition(0.15, 0),
                ...getZhuHaiRoundPosition(0.15, 0.05),
                ...getZhuHaiRoundPosition(0.1, 0.05)
            ]),
            holes: [
                {
                    positions: Cartesian3.fromDegreesArray([
                        ...getZhuHaiRoundPosition(0.11, 0.01),
                        ...getZhuHaiRoundPosition(0.14, 0.01),
                        ...getZhuHaiRoundPosition(0.14, 0.04),
                        ...getZhuHaiRoundPosition(0.11, 0.04)
                    ]),
                    holes: [
                        {
                            positions: Cartesian3.fromDegreesArray([
                                ...getZhuHaiRoundPosition(0.115, 0.015),
                                ...getZhuHaiRoundPosition(0.135, 0.015),
                                ...getZhuHaiRoundPosition(0.135, 0.035),
                                ...getZhuHaiRoundPosition(0.115, 0.035)
                            ]),
                            holes: [
                                {
                                    positions: Cartesian3.fromDegreesArray([
                                        ...getZhuHaiRoundPosition(0.12, 0.02),
                                        ...getZhuHaiRoundPosition(0.13, 0.02),
                                        ...getZhuHaiRoundPosition(0.13, 0.03),
                                        ...getZhuHaiRoundPosition(0.12, 0.03)
                                    ]),
                                } as any,
                            ],
                        },
                    ],
                },
            ],
        },
        material: Color.BLUE.withAlpha(0.5),
        outline: true
    }
})
// 青色垂直多边形
viewer.entities.add({
    name: '青色垂直多边形',
    polygon: {
        // 只要有两个角度相同，高度不一致即可
        hierarchy: Cartesian3.fromDegreesArrayHeights(
            [
                ...getZhuHaiRoundPosition(0, 0.05),
                0,
                ...getZhuHaiRoundPosition(0, 0.1),
                4000,
                ...getZhuHaiRoundPosition(0, 0.1),
                0
            ]
        ) as any,
        material: Color.CYAN.withAlpha(0.5),
        // 应用高度
        perPositionHeight: true
    }
})
// // 紫色贴地跟弧度多边体
// viewer.entities.add({
//     name: "Purple polygon using rhumb lines with outline",
//     polygon: {
//         hierarchy: Cartesian3.fromDegreesArray([
//             ...getZhuHaiRoundPosition(50, 1),
//             ...getZhuHaiRoundPosition(0.1, 1),
//             ...getZhuHaiRoundPosition(0.1, 0.1),
//             ...getZhuHaiRoundPosition(50, 0.1)
//         ]) as any,
//         extrudedHeight: 1000,
//         material: Color.PURPLE,
//         outline: true,
//         outlineColor: Color.MAGENTA,
//         // ArcType定义连接顶点应采用的路径，本次使用贴地路径
//         arcType: ArcType.RHUMB,
//     },
// })

function getZhuHaiRoundPosition(longitude: number, latitude: number): [number, number] {
    return [
        Destination.ZHU_HAI[0] + longitude,
        Destination.ZHU_HAI[1] + latitude
    ]
}

viewer.zoomTo(viewer.entities)
