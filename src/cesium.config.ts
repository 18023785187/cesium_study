import { Ion } from 'cesium'
import { ASSETS_TOKEN } from '@/constants'

window.CESIUM_BASE_URL = process!.env!.NODE_ENV === 'development' ? __dirname : __dirname + 'cesium_study/'

// 设置令牌
Ion.defaultAccessToken = ASSETS_TOKEN
