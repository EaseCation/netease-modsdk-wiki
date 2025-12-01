import Layout from './layout/Layout.vue'

import DefaultTheme from 'vitepress/theme'
import MyFeatures from './components/MyFeatures.vue'
import CodeHeader from './components/content/CodeHeader.vue'
import WikiImage from './components/content/WikiImage.vue'
import Button from './components/content/Button.vue'
import FolderView from './components/content/FolderView/FolderView.vue'
import Checklist from './components/content/Checklist.vue'
import ApiTable from './components/ApiTable.vue'
import AssistantDock from './components/AssistantDock.vue'

// 引入 Ant Design Reset 样式，供 Ant Design X 使用
import 'antd/dist/reset.css'

import './style.css';

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({ app }) {
        app.component('ApiTable', ApiTable);
        app.component('MyFeatures', MyFeatures);
        app.component('CodeHeader', CodeHeader);
        app.component('WikiImage', WikiImage);
        app.component('BButton', Button);
        app.component('Checklist', Checklist);
        app.component('FolderView', FolderView);
        app.component('AssistantDock', AssistantDock);
    }
}
