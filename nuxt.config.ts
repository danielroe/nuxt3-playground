import { defineNuxtConfig } from 'nuxt'
import { execaCommand } from 'execa'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  hooks: {
    'vite:extendConfig': async (config, { isServer }) => {
      if (isServer) {
        config.build.rollupOptions.inlineDynamicImports = true
      }
      console.log({
        plugin: config.plugins.find(p => p.name === 'nuxt:composable-keys'),
      })
      config.plugins = config.plugins.filter(
        p => p.name !== 'nuxt:composable-keys'
      )
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
