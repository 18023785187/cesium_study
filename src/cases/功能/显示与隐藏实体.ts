/**
 * 显示与隐藏实体
 * 
 * 使用的重点api:
 *  Entity.show,
 *  parent
 * 
 * 案例演示：
 *  如何显示与隐藏实体
 */
import { Viewer, EntityCollection, Entity, Cartesian3, Color } from 'cesium'
import { Destination } from '@/constants'
import { ClickButton } from 'utils'

export default () => {
    const viewer: Viewer = new Viewer('viewer')
    const entities: EntityCollection = viewer.entities
    // 以下创建三类实体的实体管理
    const boxs = entities.add(new Entity())
    const ellipsoids = entities.add(new Entity())
    const spheres = entities.add(new Entity())
    // 创建5个三类的实体并添加到其所属的组中
    for (let i = 1; i <= 5; ++i) {
        // 高度递增
        const height: number = 5000 * i
        // 随机颜色, 但是不透明
        const colorRandom: Color = Color.fromRandom({ alpha: 1.0 })
        const box = entities.add({
            name: '矩形',
            // 指定该实体应该添加到那个实体内
            parent: boxs,
            position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, height),
            box: {
                dimensions: new Cartesian3(2500, 2500, 2500),
                material: colorRandom
            }
        })
        const ellipsoid = entities.add({
            name: '椭球体',
            parent: ellipsoids,
            position: Cartesian3.fromDegrees(
                Destination.ZHU_HAI[0] + .1,
                Destination.ZHU_HAI[1],
                height
            ),
            ellipsoid: {
                radii: new Cartesian3(2500, 2000, 1500),
                material: colorRandom
            }
        })
        const sphere = entities.add({
            name: '球体',
            parent: spheres,
            position: Cartesian3.fromDegrees(
                Destination.ZHU_HAI[0] + .2,
                Destination.ZHU_HAI[1],
                height
            ),
            ellipsoid: {
                radii: new Cartesian3(2500, 2500, 2500),
                material: colorRandom
            }
        })
    }

    viewer.zoomTo(entities)

    // 切换立方体
    const btn1 = new ClickButton('切换立方体', () => {
        boxs.show = !boxs.show
    })
    // 切换椭球体
    const btn2 = new ClickButton('切换椭球体', () => {
        ellipsoids.show = !ellipsoids.show
    })
    // 切换球体
    const btn3 = new ClickButton('切换球体', () => {
        spheres.show = !spheres.show
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