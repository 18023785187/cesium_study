/**
 * 城市坐标
 */
interface IDestination {
    readonly [propName: string]: [number, number]
}

/**
 * 城市坐标
 */
const Destination: IDestination = {
    // 广东
    GUANG_DONG: [113.307755, 23.355569],
    // 广州
    GUANG_ZHOU: [113.280637, 23.125178],
    // 珠海
    ZHU_HAI: [113.52, 22.3],
    // 罗定
    LUO_DING: [111.56, 22.77],
    // 广州塔
    GUANG_ZHOU_TA: [113.31915, 23.10902],
    // 珠穆朗玛峰
    EVEREST: [86.934165,27.990458]
}

export default Destination