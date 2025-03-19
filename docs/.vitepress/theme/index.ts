import DefaultTheme from 'vitepress/theme'
import MyFeatures from './components/MyFeatures.vue'
import CodeHeader from './components/content/CodeHeader.vue'
import WikiImage from './components/content/WikiImage.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('MyFeatures', MyFeatures);
        app.component('CodeHeader', CodeHeader);
        app.component('WikiImage', WikiImage);
    }
}