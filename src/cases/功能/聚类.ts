/**
 * 聚类
 * 
 * 使用的重点api：
 *  KmlDataSource,
 *  DataSource
 * 
   案例演示：
    使用聚类避免渲染过多的数据
 */
import {
    Viewer,
    KmlDataSource,
    DataSource,
    PinBuilder,
    Color,
    defined,
    VerticalOrigin,
    Event,
    Entity
} from 'cesium'
import { ClickButton, RangeInput } from 'utils'
import facilitiesKml from 'assets/kml/facilities.kml'

export default async () => {
    const viewer: Viewer = new Viewer('viewer')
    // 添加数据源
    const dataSource: DataSource = await viewer.dataSources.add(
        // 创建一个对提供了KML数据的新实例的Promise
        KmlDataSource.load(
            facilitiesKml,
            {
                camera: viewer.camera,
                canvas: viewer.canvas
            }
        )
    )
    const initPixelRange = 15
    const initMinimumClusterSize = 3
    // clustering 定义屏幕空间对象（广告牌，点，标签）的聚集方式
    // 启用集群
    dataSource.clustering.enabled = true
    // 扩展屏幕空间边界框的像素范围
    dataSource.clustering.pixelRange = initPixelRange
    // 可以群集的最小屏幕空间对象
    dataSource.clustering.minimumClusterSize = initMinimumClusterSize
    // 生成用于地图图钉的画布元素
    const pinBuilder: PinBuilder = new PinBuilder()
    // 定义各种图钉并生成对应的url
    const pin50 = pinBuilder
        .fromText("50+", Color.RED, 48)
        .toDataURL()
    const pin40 = pinBuilder
        .fromText("40+", Color.ORANGE, 48)
        .toDataURL()
    const pin30 = pinBuilder
        .fromText("30+", Color.YELLOW, 48)
        .toDataURL()
    const pin20 = pinBuilder
        .fromText("20+", Color.GREEN, 48)
        .toDataURL()
    const pin10 = pinBuilder
        .fromText("10+", Color.BLUE, 48)
        .toDataURL()
    // 个位数的图钉数组
    const singleDigitPins = new Array(8)
    for (let i = 0; i < singleDigitPins.length; ++i) {
        singleDigitPins[i] = pinBuilder
            .fromText("" + (i + 2), Color.PINK, 48)
            .toDataURL()
    }
    // 订阅将在显示新集群时引发的事件的取消事件
    let removeListener: Event.RemoveCallback | undefined
    // 个性化风格
    function customStyle(): void {
        // 如果有removeListener
        if (defined(removeListener)) {
            // 删除上次监听的功能
            removeListener!()
            removeListener = undefined
        } else {
            // 获取将在显示新集群时引发的事件
            removeListener = dataSource.clustering.clusterEvent.addEventListener(
                // clusteredEntities: 集群, cluster: 集群的代表
                (clusteredEntities: Entity[], cluster: any /** Entity */) => {
                    // 使用个性化风格时要隐藏文本信息
                    cluster.label.show = false
                    // 显示图钉
                    cluster.billboard.show = true
                    cluster.billboard.id = cluster.label.id
                    cluster.billboard.verticalOrigin = VerticalOrigin.BOTTOM
                    // 根据集群内实体的个数渲染信息（图钉）
                    if (clusteredEntities.length >= 50) {
                        cluster.billboard.image = pin50
                    } else if (clusteredEntities.length >= 40) {
                        cluster.billboard.image = pin40
                    } else if (clusteredEntities.length >= 30) {
                        cluster.billboard.image = pin30
                    } else if (clusteredEntities.length >= 20) {
                        cluster.billboard.image = pin20
                    } else if (clusteredEntities.length >= 10) {
                        cluster.billboard.image = pin10
                    } else {
                        cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2]
                    }
                }
            )
        }
        // 使用新样式设置集群, 重新设置像素范围
        const pixelRange = dataSource.clustering.pixelRange
        dataSource.clustering.pixelRange = 0
        dataSource.clustering.pixelRange = pixelRange
    }
    // 初始化时使用个性化样式
    customStyle()

    const btn1 = new ClickButton('开启聚类yes', () => {
        if (btn1.el.textContent === '开启聚类yes') {
            btn1.el.textContent = '开启聚类no'
            dataSource.clustering.enabled = false
        } else {
            btn1.el.textContent = '开启聚类yes'
            dataSource.clustering.enabled = true
        }
    })
    const btn2 = new ClickButton('个性化yes', () => {
        if (btn2.el.textContent === '个性化yes') {
            btn2.el.textContent = '个性化no'
        } else {
            btn2.el.textContent = '个性化yes'
        }
        customStyle()
    })
    const range1 = new RangeInput(
        '像素范围',
        { min: 1, max: 200, initialValue: initPixelRange },
        (e: globalThis.Event) => {
            dataSource.clustering['pixelRange'] = parseInt((e.target as HTMLInputElement).value)
        }
    )
    const range2 = new RangeInput(
        '最小集群大小',
        { min: 1, max: 200, initialValue: initMinimumClusterSize },
        (e: globalThis.Event) => {
            dataSource.clustering['minimumClusterSize'] = parseInt((e.target as HTMLInputElement).value)
        }
    )

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    btn2.appendTo(buttonBox)
    const rangeBox: HTMLDivElement = document.getElementsByClassName('range-box')[0] as HTMLDivElement
    range1.appendTo(rangeBox)
    range2.appendTo(rangeBox)

    return () => {
        viewer.destroy()
        btn1.remove()
        btn2.remove()
        range1.remove()
        range2.remove()
    }
}
