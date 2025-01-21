export default function manifest() {
    return {
      name: 'KomikKuntul',
      short_name: 'KK',
      description: 'Baca komik online bahasa indonesia',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }