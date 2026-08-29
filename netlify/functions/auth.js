// Decap CMS GitHub login — step 1.
// Sends the editor to GitHub to authorise, then GitHub returns them to callback.js.
// Requires the Netlify environment variable: OAUTH_CLIENT_ID
exports.handler = async function (event) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return { statusCode: 500, body: 'OAUTH_CLIENT_ID is not set in Netlify.' };
  }

  const proto = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers.host;
  const redirectUri = `${proto}://${host}/.netlify/functions/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo', // full repo scope — needed to read/write a PRIVATE repo
    state: Math.random().toString(36).slice(2) + Date.now().toString(36),
    allow_signup: 'false'
  });

  return {
    statusCode: 302,
    headers: { Location: `https://github.com/login/oauth/authorize?${params.toString()}` },
    body: ''
  };
};
