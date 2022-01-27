import { Ion } from 'cesium'

window.CESIUM_BASE_URL = process!.env!.NODE_ENV === 'development' ? __dirname : __dirname + 'cesium_study/'

// 设置令牌
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOGU3OTM5Mi01MjI4LTRiZDEtOTFhZi03MzEzOGU5ZGE2MjYiLCJpZCI6Nzk3ODQsImlhdCI6MTY0MjQwNDE1OH0.xmGnGw53moQCCGbwOATjDK5NblI0tWyCErL8zAYeaSU'
Ion.defaultAccessToken = KEY
