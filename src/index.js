export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Blok Keamanan untuk Vault
    if (url.pathname.startsWith('/vault-publik/')) {
      const authHeader = request.headers.get('Authorization');
      // Menggunakan Base64 untuk mase:observatory0
      const expectedAuth = 'Basic bWFzZTpvYnNlcnZhdG9yeTA=';
      
      if (!authHeader || authHeader !== expectedAuth) {
        return new Response('Akses Ditolak. Protokol keamanan aktif.', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Secure Vault"',
          },
        });
      }
    }

    // 2. Perbaikan Routing 404
    let assetUrl = new URL(request.url);
    
    // Jika URL diakhiri dengan garis miring (contoh: / atau /tips-and-tricks/)
    // otomatis arahkan untuk membaca index.html
    if (assetUrl.pathname.endsWith('/')) {
      assetUrl.pathname += 'index.html';
    }

    // Ambil file dari direktori Anda
    let response = await env.ASSETS.fetch(new Request(assetUrl, request));

    // Jika masih 404 (misal user mengetik /tips-and-tricks tanpa garis miring di akhir)
    // Coba tambahkan /index.html sebagai perlindungan ekstra
    if (response.status === 404 && !assetUrl.pathname.split('/').pop().includes('.')) {
      assetUrl.pathname += '/index.html';
      response = await env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return response;
  },
};