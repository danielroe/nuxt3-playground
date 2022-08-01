import { defineNuxtConfig } from 'nuxt'
import { execaCommand } from 'execa'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    build: {
      rollupOptions: {
        inlineDynamicImports: true,
      },
    },
  },
  hooks: {
    'nitro:init'(nitro) {
      nitro.hooks.hook('compiled', async () => {
        await execaCommand(
          'tar -cvzf dist/app.tgz --exclude node_modules --exclude .git --exclude dist/app.tgz .'
        )
      })
    },
  },
})
