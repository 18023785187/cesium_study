/**
 * 数据项
 */

type navDataItem = {
    title: string,
    data: {
        name: string,
        default: () => Promise<any>
    }[]
}

/**
 * 案例异步代码集合
 */
const caseAsyncScriptMap = {
    // 创建
    // #region
    '普通的地球': () => import('@/cases/创建/普通的地球'),
    '纯粹的地球': () => import('@/cases/创建/纯粹的地球'),
    '生成建筑物': () => import('@/cases/创建/生成建筑物'),
    '地形': () => import('@/cases/创建/地形'),
    // #endregion
    // 相机
    // #region
    '飞到一个位置': () => import('@/cases/相机/飞到一个位置'),
    '打印某个地点的位置': () => import('@/cases/相机/打印某个地点的位置'),
    '飞到指定实体上': () => import('@/cases/相机/飞到指定实体上'),
    '缓动函数': () => import('@/cases/相机/缓动函数'),
    '锁定到某个点': () => import('@/cases/相机/锁定到某个点'),
    '围绕一个点运行': () => import('@/cases/相机/围绕一个点运行'),
    // #endregion
    // 功能
    // #region
    '动态时间': () => import('@/cases/功能/动态时间'),
    'CallbackProperty': () => import('@/cases/功能/CallbackProperty'),
    '飞行结束执行动画': () => import('@/cases/功能/飞行结束执行动画'),
    '视频投影': () => import('@/cases/功能/视频投影'),
    '按距离显示': () => import('@/cases/功能/按距离显示'),
    '贴图为地球皮肤': () => import('@/cases/功能/贴图为地球皮肤'),
    '显示与隐藏实体': () => import('@/cases/功能/显示与隐藏实体'),
    '3D瓦砖功能样式': () => import('@/cases/功能/3D瓦砖功能样式'),
    '构建飞行跟踪器': () => import('@/cases/功能/构建飞行跟踪器'),
    // #endregion
    // 材质
    // #region
    '颜色': () => import('@/cases/材质/颜色'),
    '图片': () => import('@/cases/材质/图片'),
    '棋盘': () => import('@/cases/材质/棋盘'),
    '条纹': () => import('@/cases/材质/条纹'),
    '网格': () => import('@/cases/材质/网格'),
    '发光的线': () => import('@/cases/材质/发光的线'),
    '带轮廓的线': () => import('@/cases/材质/带轮廓的线'),
    // #endregion
    // 几何形状
    // #region
    '点': () => import('@/cases/几何形状/点'),
    '画一条线': () => import('@/cases/几何形状/画一条线'),
    '各种线': () => import('@/cases/几何形状/各种线'),
    '走廊': () => import('@/cases/几何形状/走廊'),
    '平面': () => import('@/cases/几何形状/平面'),
    '圆与椭圆': () => import('@/cases/几何形状/圆与椭圆'),
    '圆锥与圆柱': () => import('@/cases/几何形状/圆锥与圆柱'),
    '各种球': () => import('@/cases/几何形状/各种球'),
    '盒子': () => import('@/cases/几何形状/盒子'),
    '多边形': () => import('@/cases/几何形状/多边形'),
    '折线体': () => import('@/cases/几何形状/折线体'),
    '墙体': () => import('@/cases/几何形状/墙体'),
    // #endregion
    // 标记
    // #region
    '地图别针': () => import('@/cases/标记/地图别针'),
    '标签': () => import('@/cases/标记/标签'),
    '放置html元素': () => import('@/cases/标记/放置html元素'),
    // #endregion
    // 3D模型
    // #region
    '创建模型': () => import('@/cases/3D模型/创建模型'),
    // #endregion
    // 粒子系统
    // #region
    '创建粒子': () => import('@/cases/粒子系统/创建粒子'),
    '粒子发射器': () => import('@/cases/粒子系统/粒子发射器'),
    'ParticleBurst': () => import('@/cases/粒子系统/ParticleBurst'),
    'updateCallback': () => import('@/cases/粒子系统/updateCallback'),
    '粒子系统': () => import('@/cases/粒子系统/粒子系统'),
    '烟花': () => import('@/cases/粒子系统/烟花粒子'),
    // #endregion
    // 数据源
    // #region
    'GeoJson和TopoJson': () => import('@/cases/数据源/GeoJson和TopoJson'),
    'Wmst': () => import('@/cases/数据源/Wmst'),
    // #endregion
}

/**
 * Nav组件的数据
 */
const navData: navDataItem[] = [
    // 创建
    {
        title: '创建',
        data: [
            {
                name: '普通的地球',
                default: caseAsyncScriptMap['普通的地球']
            },
            {
                name: '纯粹的地球',
                default: caseAsyncScriptMap['纯粹的地球']
            },
            {
                name: '生成建筑物',
                default: caseAsyncScriptMap['生成建筑物']
            },
            {
                name: '地形',
                default: caseAsyncScriptMap['地形']
            },
        ]
    },
    // 相机
    {
        title: '相机',
        data: [
            {
                name: '飞到一个位置',
                default: caseAsyncScriptMap['飞到一个位置']
            },
            {
                name: '打印某个地点的位置',
                default: caseAsyncScriptMap['打印某个地点的位置']
            },
            {
                name: '飞到指定实体上',
                default: caseAsyncScriptMap['飞到指定实体上']
            },
            {
                name: '缓动函数',
                default: caseAsyncScriptMap['缓动函数']
            },
            {
                name: '锁定到某个点',
                default: caseAsyncScriptMap['锁定到某个点']
            },
            {
                name: '围绕一个点运行',
                default: caseAsyncScriptMap['围绕一个点运行']
            }
        ]
    },
    // 功能
    {
        title: '功能',
        data: [
            {
                name: '动态时间',
                default: caseAsyncScriptMap['动态时间']
            },
            {
                name: 'CallbackProperty',
                default: caseAsyncScriptMap['CallbackProperty']
            },
            {
                name: '飞行结束执行动画',
                default: caseAsyncScriptMap['飞行结束执行动画']
            },
            {
                name: '视频投影',
                default: caseAsyncScriptMap['视频投影']
            },
            {
                name: '按距离显示',
                default: caseAsyncScriptMap['按距离显示']
            },
            {
                name: '贴图为地球皮肤',
                default: caseAsyncScriptMap['贴图为地球皮肤']
            },
            {
                name: '显示与隐藏实体',
                default: caseAsyncScriptMap['显示与隐藏实体']
            },
            {
                name: '3D瓦砖功能样式',
                default: caseAsyncScriptMap['3D瓦砖功能样式']
            },
            {
                name: '构建飞行跟踪器',
                default: caseAsyncScriptMap['构建飞行跟踪器']
            }
        ]
    },
    // 材质
    {
        title: '材质',
        data: [
            {
                name: '颜色',
                default: caseAsyncScriptMap['颜色']
            },
            {
                name: '图片',
                default: caseAsyncScriptMap['图片']
            },
            {
                name: '棋盘',
                default: caseAsyncScriptMap['棋盘']
            },
            {
                name: '条纹',
                default: caseAsyncScriptMap['条纹']
            },
            {
                name: '网格',
                default: caseAsyncScriptMap['网格']
            },
            {
                name: '发光的线',
                default: caseAsyncScriptMap['发光的线']
            },
            {
                name: '带轮廓的线',
                default: caseAsyncScriptMap['带轮廓的线']
            }
        ]
    },
    // 几何形状
    {
        title: '几何形状',
        data: [
            {
                name: '点',
                default: caseAsyncScriptMap['点']
            },
            {
                name: '画一条线',
                default: caseAsyncScriptMap['画一条线']
            },
            {
                name: '各种线',
                default: caseAsyncScriptMap['各种线']
            },
            {
                name: '走廊',
                default: caseAsyncScriptMap['走廊']
            },
            {
                name: '平面',
                default: caseAsyncScriptMap['平面']
            },
            {
                name: '圆与椭圆',
                default: caseAsyncScriptMap['圆与椭圆']
            },
            {
                name: '圆锥与圆柱',
                default: caseAsyncScriptMap['圆锥与圆柱']
            },
            {
                name: '各种球',
                default: caseAsyncScriptMap['各种球']
            },
            {
                name: '盒子',
                default: caseAsyncScriptMap['盒子']
            },
            {
                name: '多边形',
                default: caseAsyncScriptMap['多边形']
            },
            {
                name: '折线体',
                default: caseAsyncScriptMap['折线体']
            },
            {
                name: '墙体',
                default: caseAsyncScriptMap['墙体']
            }
        ]
    },
    // 标记
    {
        title: '标记',
        data: [
            {
                name: '地图别针',
                default: caseAsyncScriptMap['地图别针']
            },
            {
                name: '标签',
                default: caseAsyncScriptMap['标签']
            },
            {
                name: '放置html元素',
                default: caseAsyncScriptMap['放置html元素']
            }
        ]
    },
    // 粒子系统
    {
        title: '粒子系统',
        data: [
            {
                name: '创建粒子',
                default: caseAsyncScriptMap['创建粒子']
            },
            {
                name: '粒子发射器',
                default: caseAsyncScriptMap['粒子发射器']
            },
            {
                name: 'ParticleBurst',
                default: caseAsyncScriptMap['ParticleBurst']
            },
            {
                name: 'updateCallback',
                default: caseAsyncScriptMap['updateCallback']
            },
            {
                name: '粒子系统',
                default: caseAsyncScriptMap['粒子系统']
            },
            {
                name: '烟花',
                default: caseAsyncScriptMap['烟花']
            }
        ]
    },
    // 3D模型
    {
        title: '3D模型',
        data: [
            {
                name: '创建模型',
                default: caseAsyncScriptMap['创建模型']
            }
        ]
    },
    // 数据源
    {
        title: '数据源',
        data: [
            {
                name: 'GeoJson和TopoJson',
                default: caseAsyncScriptMap['GeoJson和TopoJson']
            },
            {
                name: 'Wmst',
                default: caseAsyncScriptMap['Wmst']
            }
        ]
    }
]

export {
    navData,
    caseAsyncScriptMap
}

export type {
    navDataItem
}
