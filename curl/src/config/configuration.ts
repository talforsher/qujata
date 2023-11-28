export default () => ({
    nginx: {
        host: process.env.NGINX_HOST || "nginx",
        port: process.env.NGINX_PORT || 4433
    },
    algorithms: (process.env.DEFAULT_GROUPS || "prime256v1:secp384r1:frodo640aes:frodo640shake:frodo976aes:frodo976shake:frodo1344aes:frodo1344shake:kyber512:p256_kyber512:kyber768:p384_kyber768:x25519_kyber768:kyber1024:bikel1:bikel3:bikel5:hqc128:hqc192:hqc256").split(':')
  });