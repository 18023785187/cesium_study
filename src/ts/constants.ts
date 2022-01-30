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
 * Nav组件的数据
 */
const navData: navDataItem[] = [
    {
        title: '创建',
        data: [
            {
                name: '普通的地球',
                default: () => import('@/case/创建/普通的地球')
            },
            {
                name: '纯粹的地球',
                default: () => import('@/case/创建/纯粹的地球')
            },
            {
                name: '生成建筑物',
                default: () => import('@/case/创建/生成建筑物')
            },
            {
                name: '地形',
                default: () => import('@/case/创建/地形')
            },
        ]
    },
    {
        title: '相机',
        data: [
            {
                name: '飞到一个位置',
                default: () => import('@/case/相机/飞到一个位置')
            },
            {
                name: '打印某个地点的位置',
                default: () => import('@/case/相机/打印某个地点的位置')
            },
            {
                name: '飞到指定实体上',
                default: () => import('@/case/相机/飞到指定实体上')
            },
            {
                name: '缓动函数',
                default: () => import('@/case/相机/缓动函数')
            },
            {
                name: '锁定到某个点',
                default: () => import('@/case/相机/锁定到某个点')
            },
            {
                name: '围绕一个点运行',
                default: () => import('@/case/相机/围绕一个点运行')
            }
        ]
    },
    {
        title: '功能',
        data: [
            {
                name: '动态时间',
                default: () => import('@/case/功能/动态时间')
            },
            {
                name: 'CallbackProperty',
                default: () => import('@/case/功能/CallbackProperty')
            },
            {
                name: '飞行结束执行动画',
                default: () => import('@/case/功能/飞行结束执行动画')
            },
            {
                name: '视频投影',
                default: () => import('@/case/功能/视频投影')
            },
            {
                name: '按距离显示',
                default: () => import('@/case/功能/按距离显示')
            },
            {
                name: '贴图为地球皮肤',
                default: () => import('@/case/功能/贴图为地球皮肤')
            },
            {
                name: '显示与隐藏实体',
                default: () => import('@/case/功能/显示与隐藏实体')
            },
            {
                name: '3D瓦砖功能样式',
                default: () => import('@/case/功能/3D瓦砖功能样式')
            },
            {
                name: '构建飞行跟踪器',
                default: () => import('@/case/功能/构建飞行跟踪器')
            }
        ]
    },
    {
        title: '材质',
        data: [
            {
                name: '颜色',
                default: () => import('@/case/材质/颜色')
            },
            {
                name: '图片',
                default: () => import('@/case/材质/图片')
            },
            {
                name: '棋盘',
                default: () => import('@/case/材质/棋盘')
            },
            {
                name: '条纹',
                default: () => import('@/case/材质/条纹')
            },
            {
                name: '网格',
                default: () => import('@/case/材质/网格')
            },
            {
                name: '发光的线',
                default: () => import('@/case/材质/发光的线')
            },
            {
                name: '带轮廓的线',
                default: () => import('@/case/材质/带轮廓的线')
            }
        ]
    },
    {
        title: '几何形状',
        data: [
            {
                name: '点',
                default: () => import('@/case/几何形状/点')
            },
            {
                name: '画一条线',
                default: () => import('@/case/几何形状/画一条线')
            },
            {
                name: '各种线',
                default: () => import('@/case/几何形状/各种线')
            },
            {
                name: '走廊',
                default: () => import('@/case/几何形状/走廊')
            },
            {
                name: '平面',
                default: () => import('@/case/几何形状/平面')
            },
            {
                name: '圆与椭圆',
                default: () => import('@/case/几何形状/圆与椭圆')
            },
            {
                name: '圆锥与圆柱',
                default: () => import('@/case/几何形状/圆锥与圆柱')
            },
            {
                name: '各种球',
                default: () => import('@/case/几何形状/各种球')
            },
            {
                name: '盒子',
                default: () => import('@/case/几何形状/盒子')
            },
            {
                name: '多边形',
                default: () => import('@/case/几何形状/多边形')
            },
            {
                name: '折线体',
                default: () => import('@/case/几何形状/折线体')
            },
            {
                name: '墙体',
                default: () => import('@/case/几何形状/墙体')
            }
        ]
    },
    {
        title: '标记',
        data: [
            {
                name: '地图别针',
                default: () => import('@/case/标记/地图别针')
            },
            {
                name: '标签',
                default: () => import('@/case/标记/标签')
            },
            {
                name: '放置html元素',
                default: () => import('@/case/标记/放置html元素')
            }
        ]
    },
    {
        title: '3D模型',
        data: [
            {
                name: '创建模型',
                default: () => import('@/case/3D模型/创建模型')
            }
        ]
    },
    {
        title: '数据源',
        data: [
            {
                name: 'GeoJson和TopoJson',
                default: () => import('@/case/数据源/GeoJson和TopoJson')
            },
            {
                name: 'Wmst',
                default: () => import('@/case/数据源/Wmst')
            }
        ]
    }
]

export {
    navData
}

export type {
    navDataItem
}
