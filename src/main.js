import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import {i18n} from './plugins/i18n'
import './plugins/metamask'
import { List,Cell,CellGroup,Toast,RadioGroup,Radio} from 'vant';

const app = createApp(App);
app.use(Toast).use(List).use(Cell).use(RadioGroup).use(Radio).use(CellGroup)

app.use(store).use(i18n).use(router).mount('#app');

export default app
