import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import OneSignalVuePlugin from '@onesignal/onesignal-vue3'

import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    ctx.app.use(OneSignalVuePlugin, {
      appId: '6328a550-a96b-45d3-af96-d65f541cc29a',
      safari_web_id: 'web.onesignal.auto.05605657-a1ec-46ab-8d61-441038586900',
      notifyButton: {
        enable: true,
      },
    })
  },
)
