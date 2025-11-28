addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)

  const modifiedResponse = new Response(response.body, response)
  
  // Aggiunta degli headers di sicurezza
  modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff')
  modifiedResponse.headers.set('X-Frame-Options', 'DENY')
  modifiedResponse.headers.set('X-XSS-Protection', '1; mode=block')
  modifiedResponse.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  modifiedResponse.headers.set('Content-Security-Policy', "default-src 'self';")

  return modifiedResponse
}