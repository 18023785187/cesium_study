import { Ion } from 'cesium'

window.CESIUM_BASE_URL = process!.env!.NODE_ENV === 'development' ? __dirname : __dirname + 'cesium_study/'

// 设置令牌
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjhkNzVmYy1kNmQ0LTQzZDktOWQxOS1lMGQ4ZTZmZGVlZjkiLCJpZCI6ODEwNjAsImlhdCI6MTY0MzQzNTU0Mn0.zuc37nVgdwUHPKvktt1hYnhc4U-C8gBWAEL0RXslXZU'
Ion.defaultAccessToken = KEY
