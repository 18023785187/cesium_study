/**
 * 3D瓦砖功能样式
 * 
 * 使用的重点api：
 *  createWorldTerrain,
 *  createOsmBuildings,
 *  ScreenSpaceEventHandler,
 *  ScreenSpaceEventType,
 *  Cesium3DTileStyle,
 *  viewer.scene.pick
 * 
 * 案例演示：
 *  按照指定的功能为建筑物染色、过滤。
 *  当前案例篇幅比较长，建议打开ctrl+f快速查找以下案例依赖的函数：
 *      colorByDistanceToCoordinate 按鼠标所选建筑物距离显示样式,
 *      colorByHeight 按高度渲染颜色,
 *      highlightAllResidentialBuildings 突出住宅建筑,
 *      showBuildingInOffice 仅显示办公楼
 */
import {
    Viewer,
    Cartesian3,
    Cesium3DTileset,
    createWorldTerrain,
    createOsmBuildings,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Cesium3DTileStyle,
    Math
} from 'cesium'
import { Destination } from '@/constants'
import { ClickButton } from 'utils'

export default () => {
    const viewer: Viewer = new Viewer('viewer', {
        // 创建地形
        terrainProvider: createWorldTerrain()
    })
    // 创建建筑物, 把建筑物赋值给一个变量方便后期操作
    const osmBuildingsTileset: Cesium3DTileset = createOsmBuildings()
    viewer.scene.primitives.add(osmBuildingsTileset)
    // 处理用户输入事件。可以添加自定义功能以在以下位置执行当用户输入输入时
    const handler: ScreenSpaceEventHandler = new ScreenSpaceEventHandler(viewer.scene.canvas)

    // 按鼠标所选建筑物距离显示样式 start
    const btn1 = new ClickButton('按鼠标所选建筑物距离显示样式', () => {
        // 在启动功能时默认选择该坐标作中心点
        colorByDistanceToCoordinate(23.1202, 113.32056);
        // 设置要在输入事件上执行的功能
        handler.setInputAction(
            (movement) => {
                // 选择显示器置为无目标，使信息弹窗不弹出
                viewer.selectedEntity = undefined;
                // 返回目标经纬度的建筑物信息，该信息与选中弹窗的信息相同
                const pickedBuilding = viewer.scene.pick(movement.position);
                if (pickedBuilding) {
                    const pickedLatitude: number = pickedBuilding.getProperty(
                        "cesium#latitude"
                    );
                    const pickedLongitude: number = pickedBuilding.getProperty(
                        "cesium#longitude"
                    );
                    colorByDistanceToCoordinate(pickedLatitude, pickedLongitude);
                }
            },
            /**
             * ScreenSpaceEventType 此枚举类型用于对鼠标事件进行分类:向下，向上，单击，双击，按住按钮时移动
             * LEFT_CLICK 鼠标左点击
             */
            ScreenSpaceEventType.LEFT_CLICK
        )
    })
    /**
     * 依据所选经纬度坐标按特定距离显示不同颜色
     * @param pickedLatitude 
     * @param pickedLongitude 
     */
    function colorByDistanceToCoordinate(
        pickedLatitude: number,
        pickedLongitude: number
    ): void {
        /**
         * 计算使用 3D Tiles样式化语言:
         *      http://cesium.xin/cesium/cn/Documentation1.62/Cesium3DTileStyle.html?classFilter=Cesium3DTileStyle
         */
        osmBuildingsTileset.style = new Cesium3DTileStyle({
            // 定义中心距离，这次以我们传入的经纬度坐标作为中心距离
            defines: {
                distance:
                    "distance(vec2(${feature['cesium#longitude']}, ${feature['cesium#latitude']}), vec2(" +
                    pickedLongitude +
                    "," +
                    pickedLatitude +
                    "))",
            },
            // 定义颜色
            color: {
                // 根据distance显示相应的颜色, 其中distance为defines定义的值
                conditions: [
                    ["${distance} > 0.014", "color('black')"], /** 当大于中心距离0.014的时候 */
                    ["${distance} > 0.010", "color('purple')"], /** 当大于中心距离0.010的时候 */
                    ["${distance} > 0.006", "color('red')"], /** 当大于中心距离0.006的时候 */
                    ["${distance} > 0.0001", "color('pink')"], /** 当大于中心距离0.0001的时候 */
                    ["true", "color('gold')"], /** 条件始终为true，也就是else的情况  */
                ],
            },
        })
    }
    // 按鼠标所选建筑物距离显示样式 end
    // 按高度渲染颜色 start
    const btn2 = new ClickButton('按高度渲染颜色', colorByHeight)
    function colorByHeight(): void {
        osmBuildingsTileset.style = new Cesium3DTileStyle({
            // 根据cesium#estimatedHeight信息作依据
            defines: {
                height: "${feature['cesium#estimatedHeight']}",
            },
            // 根据building的值改变建筑颜色
            color: {
                conditions: [
                    // 根据height显示相应的颜色, 其中height为defines定义的值
                    ["${height} > 400", "color('gold')"],
                    ["${height} > 300", "color('pink')"],
                    ["${height} > 200", "color('red', 0.5)"],
                    ["${height} > 100", "color('purple', 0.5)"],
                    ["${height} > 50", "color('blue', 0.5)"],
                    ["${height} > 0", "color('white', 0.8)"],
                    ["true", "color('white', 0.8)"], /** 条件始终为true，也就是else的情况  */
                ],
            },
        });
    }
    // 按高度渲染颜色 end
    // 突出住宅建筑 start
    const btn3 = new ClickButton('突出住宅建筑', highlightAllResidentialBuildings)
    function highlightAllResidentialBuildings(): void {
        osmBuildingsTileset.style = new Cesium3DTileStyle({
            color: {
                conditions: [
                    // 根据building的值进行染色
                    [
                        "${feature['building']} === 'apartments' || ${feature['building']} === 'residential'",
                        "color('cyan')",
                    ],
                    ['true', "color('#fff', 0.5)"]
                ]
            }
        })
    }
    // 突出住宅建筑 end
    // 仅显示办公楼 start
    const btn4 = new ClickButton('仅显示办公楼', showBuildingInOffice)
    function showBuildingInOffice(): void {
        osmBuildingsTileset.style = new Cesium3DTileStyle({
            // 指定符合值的建筑才能显示
            show: "${feature['building']} === 'office'",
            color: {
                conditions: [["${feature['building']} === 'office'", "color('pink')"]]
            }
        })
    }
    // 仅显示办公楼 end

    viewer.scene.camera.setView({
        destination: Cartesian3.fromDegrees(...Destination.GUANG_ZHOU_TA, 1000),
        orientation: {
            pitch: Math.toRadians(-20),
        }
    })

    const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
    btn1.appendTo(buttonBox)
    btn2.appendTo(buttonBox)
    btn3.appendTo(buttonBox)
    btn4.appendTo(buttonBox)

    return () => {
        viewer.destroy()
        btn1.remove()
        btn2.remove()
        btn3.remove()
        btn4.remove()
    }
}