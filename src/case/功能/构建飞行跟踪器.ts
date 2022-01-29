/**
 * 构建飞行跟踪器
 * 
 * 使用的重点api：
 *  JulianDate,
 *  SampledPositionProperty 存储时间与位置的集合的类,
 *  VelocityOrientationProperty 根据位置自动调整实体方向
 * 
 * 案例演示：
 *  模拟旧金山到哥本哈根的真实航班。
 *  该案例假设你已经学会如何添加实体。
 *  原理：
 *      我们已经得到了航班每个间隔的雷达点，假设每个雷达点的时间间隔为30秒，
 *      通过SampledPositionProperty把每个雷达点的到达时间和位置存储起来，
 *      使得飞机能依据时间飞到特定雷达点
 * 
 *  本案例篇幅较长，请根据以下锚点定位(第xx行)：
 *      44: Step1 定义时间,
 *      73: Step2 创建雷达点,
 *      94: Step3 创建飞机与路线
 */
import {
    Viewer,
    createWorldTerrain,
    createOsmBuildings,
    Cesium3DTileset,
    Cartesian3,
    Color,
    JulianDate,
    SampledPositionProperty,
    TimeIntervalCollection,
    TimeInterval,
    VelocityOrientationProperty,
    LagrangePolynomialApproximation
} from 'cesium'
import { flightData } from '@/constants'
import type { flightDataPointType } from '@/constants'
import CesiumAirModel from 'assets/3d_model/Cesium_Air.glb'

const viewer: Viewer = new Viewer('viewer', {
    terrainProvider: createWorldTerrain()
});
const osmBuildingsTileset: Cesium3DTileset = createOsmBuildings()
viewer.scene.primitives.add(osmBuildingsTileset)

// Step1 定义时间
// 定义时间步长为30秒
const timeStepInSeconds = 30;
// 定义航班的持续时间（该时间由雷达个数 * 步长得出）
const totalSeconds = timeStepInSeconds * (flightData.length - 1);
// 定义航班的开始时间
const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z");
// 定义航班结束的时间，该时间是开始时间加上总长
// addSeconds 将提供的秒数添加到提供的日期实例中
const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
// zoomTo 将时间线设置为定义的区间
viewer.timeline.zoomTo(start, stop);
// 播放时间加快50倍
viewer.clock.multiplier = 50;
// 开始播放
viewer.clock.shouldAnimate = true;
// 该实例用于存储雷达样本系列中每个样本的位置和时间戳
const positionProperty: SampledPositionProperty = new SampledPositionProperty();
// 插值操作，后期使飞机移动圆滑
positionProperty.setInterpolationOptions({
    // 获取检索值时要执行的内插度
    interpolationDegree: 5,
    // 获取检索值时要使用的插值算法
    interpolationAlgorithm: LagrangePolynomialApproximation,
})
// Step2 创建雷达点
for (let i = 0; i < flightData.length; ++i) {
    const dataPoint: flightDataPointType = flightData[i]
    // 到达该点的时间戳
    const time = JulianDate.addSeconds(start, i * timeStepInSeconds, new JulianDate());
    // 雷达的位置
    const position = Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
    // 这条语句是将时间戳和位置存储在positionProperty中
    // 我们还可以实时添加雷达，如果这些数据是从服务器实时返回的话
    positionProperty.addSample(time, position);
    // 添加雷达点
    viewer.entities.add({
        description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
        position,
        point: {
            pixelSize: 10,
            color: Color.YELLOW
        }
    })
}
// Step3 创建飞机与路线
// 添加飞机与路线，飞机会根据位置集合和时间移动
const airplaneEntity = viewer.entities.add({
    // 按开始时间排序的TimeInterval实例的非重叠集合, 使TimeInterval集合间隔相等
    availability: new TimeIntervalCollection([
        // 由开始和停止时间定义的时间间隔
        new TimeInterval({ start: start, stop: stop })
    ]),
    // 位置为positionProperty定义的集合
    position: positionProperty,
    // 创建3D模型实体
    model: {
        uri: CesiumAirModel
    },
    // 从所在位置自动计算方向
    orientation: new VelocityOrientationProperty(positionProperty),
    // 创建路径实体
    path: {
        width: 3
    }
});
// 跟踪飞机
viewer.trackedEntity = airplaneEntity;
