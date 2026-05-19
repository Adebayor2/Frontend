import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), tailwindcss(), 
     VitePWA({
      // registerType handles how the service worker is updated. 
      // 'autoUpdate' is the simplest way for beginners.
      registerType: 'autoUpdate',
      
      manifestFilename: 'manifest.json',

      includeAssets: ['stockmanager-192by192.png','stockmanager-512by512.png'],

      // The Web App Manifest makes your app look like a real app on a phone.
      manifest: {
        name: 'stockmanager',
        short_name: 'stckman',
        description: 'A stock and sales tracking platform',
        theme_color: '#225129',
        background_color: '#ebffe6',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/stockmanager-192by192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/stockmanager-512by512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },


      // IMPORTANT FOR BEGINNERS TO TEST:
      // This section allows the PWA to work while you are running 'npm run dev'.
      // Without this, you would only see it working after you 'build' the project.
      devOptions: {
        enabled: true
      }
    })

  ],
})


