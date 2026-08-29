// Decap CMS GitHub login — step 2.
// Exchanges the code GitHub returns for an access token, then hands it back to
// the CMS window using the postMessage handshake Decap expects.
// Requires the Netlify environment variables: OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET
exports.handler = async function (event) {
  const q = event.queryStringParameters || {};
  const code = q.code;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  let status = 'error';
  let content = { error: 'Unknown error' };

  try {
    if (!code) throw new Error('Missing authorization code');
    if (!clientId || !clientSecret) throw new Error('OAuth credentials are not configured');

    const resp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code: code })
    });
    const data = await resp.json();

    if (data && data.access_token) {
      status = 'success';
      content = { token: data.access_token, provider: 'github' };
    } else {
      content = { error: (data && (data.error_description || data.error)) || 'No access token returned' };
    }
  } catch (err) {
    content = { error: String((err && err.message) || err) };
  }

  const message = 'authorization:github:' + status + ':' + JSON.stringify(content);

  const html =
    '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<p>Completing sign-in… you can close this window if it does not close on its own.</p>' +
    '<script>(function () {' +
    '  var message = ' + JSON.stringify(message) + ';' +
    '  function send() { if (window.opener) { window.opener.postMessage(message, "*"); } }' +
    '  window.addEventListener("message", function () { send(); }, false);' +
    '  if (window.opener) { window.opener.postMessage("authorizing:github", "*"); }' +
    '})();</script></body></html>';

  return { statusCode: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }, body: html };
};
