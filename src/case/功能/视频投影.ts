/**
 * 视频投影
 * 
 * 使用的重点api:
 *  ellipsoid,
 *  rectangle,
 *  VideoSynchronizer
 * 
 * 案例演示：
 *  如何将元素投影到cesium中
 *  将球体进行分片
 */
import { Viewer, Cartesian3, Rectangle, defined, VideoSynchronizer, CallbackProperty, JulianDate, Cartesian2 } from 'cesium'
import { Destination } from '@/constants'
import { ClickButton } from 'utils'
import chinaVideo from 'assets/videos/china.mp4'

// 创建视频
const videoEl: HTMLVideoElement = document.createElement('video')
videoEl.src = chinaVideo
videoEl.autoplay = true
videoEl.loop = true

const viewer: Viewer = new Viewer('viewer', {
    showRenderLoopErrors: false,
    shouldAnimate: true,
})

// 创建四个球体投影
const sphere1 = viewer.entities.add({
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 10000),
    ellipsoid: {
        radii: new Cartesian3(10000, 10000, 10000),
        material: videoEl as any
    }
})
const sphere2 = viewer.entities.add({
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + .5, Destination.ZHU_HAI[1], 10000),
    ellipsoid: {
        radii: new Cartesian3(10000, 10000, 10000),
        material: videoEl as any
    }
})
const sphere3 = viewer.entities.add({
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0], Destination.ZHU_HAI[1] + .5, 10000),
    ellipsoid: {
        radii: new Cartesian3(10000, 10000, 10000),
        material: videoEl as any
    }
})
const sphere4 = viewer.entities.add({
    position: Cartesian3.fromDegrees(Destination.ZHU_HAI[0] + .5, Destination.ZHU_HAI[1] + .5, 10000),
    ellipsoid: {
        radii: new Cartesian3(10000, 10000, 10000),
        material: videoEl as any
    }
})

const rectangle = viewer.entities.add({
    position: Cartesian3.fromDegrees(...Destination.ZHU_HAI, 1000),
    rectangle: {
        coordinates: Rectangle.fromDegrees(
            ...Destination.ZHU_HAI,
            Destination.ZHU_HAI[0] + .5,
            Destination.ZHU_HAI[1] + .5
        ),
        material: videoEl as any
    }
})

// 使时钟与播放速率同步
let synchronizer: VideoSynchronizer | void
const btn1 = new ClickButton('时钟同步no', () => {
    if (btn1.el.textContent === '时钟同步no') {
        btn1.el.textContent = '时钟同步yes'
    } else {
        btn1.el.textContent = '时钟同步no'
    }

    // 每次点击时都会删除上一个synchronizer, 使视频不再受同步器控制
    if (defined(synchronizer)) {
        synchronizer = synchronizer!.destroy();
        videoEl.playbackRate = 1.0;
        return;
    }
    // VideoSynchronizer 可以使时钟与视频同步
    synchronizer = new VideoSynchronizer({
        clock: viewer.clock,
        element: videoEl,
    });
})

// 下面演示分片播放， isRepeating = true四个球分片, 否则不分
let isRepeating: boolean = false
const btn2 = new ClickButton('分片no', () => {
    if(btn2.el.textContent === '分片no') {
        btn2.el.textContent = '分片yes'
    } else {
        btn2.el.textContent = '分片no'
    }
    isRepeating = !isRepeating
})
// 分片将在横纵方向各分8片
const repeat: CallbackProperty = new CallbackProperty(
    (time?: JulianDate, result?: Cartesian2) => {
        if (defined(result)) {
            result = new Cartesian2()
        }
        if (isRepeating) {
            result!.x = 8
            result!.y = 8
        } else {
            result!.x = 1
            result!.y = 1
        }
        return result
    },
    false
)
; (sphere1.ellipsoid?.material as any).repeat = repeat
; (sphere2.ellipsoid?.material as any).repeat = repeat
; (sphere3.ellipsoid?.material as any).repeat = repeat
; (sphere4.ellipsoid?.material as any).repeat = repeat

const buttonBox: HTMLDivElement = document.getElementsByClassName('button-box')[0] as HTMLDivElement
btn1.appendTo(buttonBox)
btn2.appendTo(buttonBox)

// // 使相机跟踪播放器
// viewer.trackedEntity = rectangle;
viewer.zoomTo(viewer.entities)
