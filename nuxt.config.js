export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Inventarios Bosque',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@0,300;0,700;1,300&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/VeeValidate.js' },
    { src: '~/plugins/Axios.js' },
    { src: '~/plugins/Mask.js' },
    { src: '~/plugins/Vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // CSS by Vuetify:
  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Open Sans Condensed'
      },
      icons: 'mdi'
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://127.0.0.1'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules",
      "vuex-persist"
    ],
  },

  // Config server:
  server: {
    port: 3000,
    host: '127.0.0.1', // Server U Bosque: 172.18.92.12
    timing: false
  },

  loading: '~/components/Site/LoaderPage.vue',

  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://127.0.0.1',
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: { url: '/api/logout', method: 'get' },
          user: { url: '/api/user', method: 'get' },
          refresh: false
        },
        token: {
          property: 'data',
          maxAge: 60 * 60
        },
      }
    },
    redirect: {
      login: '/',
      logout: '/',
    }
  }
}
