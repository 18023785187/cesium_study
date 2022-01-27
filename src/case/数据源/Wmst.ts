/**
 * wmst服务
 * 
 * 使用的重点api:
 *  addImageryProvider
 *  WebMapTileServiceImageryProvider
 * 
 * 以珠海边界为例
 */
import { Viewer, ImageryLayerCollection, WebMapTileServiceImageryProvider, GeographicTilingScheme, Rectangle } from 'cesium'

const WMST_URL = 'https://icas.obtdata.com/geoserver'
const GRID_NAMES = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];

const viewer: Viewer = new Viewer('viewer')
const imageLayers: ImageryLayerCollection = viewer.imageryLayers

// 添加一个图层
imageLayers.addImageryProvider(
    // 用于创建wmst服务的class
    new WebMapTileServiceImageryProvider({
        url: WMST_URL + '/gwc/service/wmts',
        layer: 'zhuhai_lsqs:zhuhai_border',
        style: '',
        // service: 'WMTS',
        format: 'image/png',
        tileMatrixSetID: 'EPSG:4326',
        tileMatrixLabels: GRID_NAMES,
        tilingScheme: new GeographicTilingScheme({
            numberOfLevelZeroTilesX: 2,
            numberOfLevelZeroTilesY: 1,
        }),
        // 限制显示范围
        rectangle: Rectangle.fromDegrees(
            113.0829300000005,
            21.422918593422843,
            114.51032801113968,
            22.48708455500005
        )
    })
)

// 镜头移至珠海高新区
viewer.camera.setView({
    // 范围是一个矩形边框
    destination: Rectangle.fromDegrees(
        113.0829300000005,
        21.422918593422843,
        114.51032801113968,
        22.48708455500005
    ),
}); 
