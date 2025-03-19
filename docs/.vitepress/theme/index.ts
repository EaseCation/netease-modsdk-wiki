import DefaultTheme from 'vitepress/theme'
import MyFeatures from './components/MyFeatures.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('MyFeatures', MyFeatures)
    }
}