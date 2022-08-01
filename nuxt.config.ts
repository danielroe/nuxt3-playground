import { defineNuxtConfig } from 'nuxt'
import { execaCommand } from 'execa'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  hooks: {
    'vite:extendConfig': async (config, { isServer }) => {
      if (isServer) {
        config.build.rollupOptions.inlineDynamicImports = true
      }
    },
    'nitro:init'(nitro) {
      nitro.hooks.hook('compiled', async () => {
        await execaCommand(
          'tar -cvzf dist/app.tgz --exclude node_modules --exclude .git --exclude dist/app.tgz .'
        )
      })
    },
  },
})
