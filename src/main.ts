import './assets/less/base.less'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
// 屏蔽黄色警告信息
app.config.warnHandler = () => null

app.mount('#app')
