/**
 * GeoJson和TopoJson
 * 
 * 使用的重点api:
 *  dataSources,
 *  GeoJsonDataSource
 *
 * 案例演示：
 *          1. 将geojson数据源渲染到viewer中。
 *          2. 简单修改geojson样式。
 *          3. 自定义geojson样式。
 */
import { Viewer, GeoJsonDataSource, Color, Entity, Math } from 'cesium'
import { ClickButton } from 'utils'
import { GeoJson } from '@/constants'

const viewer: Viewer = new Viewer('viewer')

// 最简单的用法
const btn1 = new ClickButton('默认样式', () => {
    // 为了不影响效果删除所有数据源
    viewer.dataSources.removeAll()
    // 插入一个数据源
    viewer.dataSources.add(
        // 加载geojson数据源
        GeoJsonDataSource.load(GeoJson.ZHONG_GUO)
    )
})
// 加样式
const btn2 = new ClickButton('基本造型', () => {
    viewer.dataSources.removeAll()
    viewer.dataSources.add(
        GeoJsonDataSource.load(
            GeoJson.ZHONG_GUO,
            // 定义样式
            {
                // 线的颜色
                stroke: Color.ORANGE,
                // 填充颜色
                fill: Color.PINK.withAlpha(0.4),
                // 线宽度
                strokeWidth: 100,
                // 将几何特征（多边形或线串）固定在地面上
                // clampToGround: true,
            }
        )
    )
})
// 多样化
const btn3 = new ClickButton('自定义样式', () => {
    Math.setRandomNumberSeed(0);
    viewer.dataSources.removeAll()
    const promise: Promise<GeoJsonDataSource> = GeoJsonDataSource.load(GeoJson.ZHONG_GUO)
    promise
        .then((dataSource: GeoJsonDataSource) => {
            viewer.dataSources.add(dataSource)
            // Entity实体，这条代码会拿到Entity实体，当前实体信息是每个省和直辖市的各种信息
            const entities: Entity[] = dataSource.entities.values;
            for (let i = 0; i < entities.length; ++i) {
                // 获取实体
                const entity: Entity = entities[i];
                // 获取实体的name
                const name: string | undefined = entity.name;
                // 如果有name，那么给这个Entity加一个随机颜色
                if (name) {
                    // 将轮廓颜色设置为我们定义的颜色
                    (entity.polygon as any).material = Color.fromRandom({
                        // 使用要使用的alpha分量代替随机值
                        alpha: 1.0,
                    });
                    // 删除实体的轮廓线
                    (entity.polygon as any).outline = false;
                    // 根据adcode调整地图板块高度
                    (entity.polygon as any).extrudedHeight = entity.properties!.adcode
                }
            }
        })
    // .otherwise(err => console.error(`GeoJson和TopoJson.ts: ${err}`))
})

const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
btn1.appendTo(buttonBox)
btn2.appendTo(buttonBox)
btn3.appendTo(buttonBox)
