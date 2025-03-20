import DefaultTheme from 'vitepress/theme'
import MyFeatures from './components/MyFeatures.vue'
import CodeHeader from './components/content/CodeHeader.vue'
import WikiImage from './components/content/WikiImage.vue'
import Button from './components/content/Button.vue'
import FolderView from './components/content/FolderView/FolderView.vue'
import Checklist from './components/content/Checklist.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('MyFeatures', MyFeatures);
        app.component('CodeHeader', CodeHeader);
        app.component('WikiImage', WikiImage);
        app.component('BButton', Button);
        app.component('Checklist', Checklist);
        app.component('FolderView', FolderView);
    }
}