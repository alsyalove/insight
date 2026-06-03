export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Tentukan folder mana yang ingin digembok
    if (url.pathname.startsWith('/vault-publik/')) {
      const authHeader = request.headers.get('Authorization');
      
      // 2. Masukkan kode Base64 yang Anda generate dari terminal
      // (Contoh ini untuk username: mase dan password: observatory0)
      const expectedAuth = 'Basic bWFzZTpvYnNlcnZhdG9yeTA=';

      // 3. Jika password salah atau belum login, tolak akses dan munculkan pop-up
      if (!authHeader || authHeader !== expectedAuth) {
        return new Response('Akses Ditolak. Protokol keamanan aktif.', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Secure Epistemic Vault"',
          },
        });
      }
    }

    // 4. Jika password benar (atau mengakses folder lain), izinkan mengambil file statis
    return env.ASSETS.fetch(request);
  },
};