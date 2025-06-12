export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Frame-Options', 'ALLOWALL');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Conversion Audit Toolkit</title>
    </head>
    <body style="background:#0f1722; color:white; font-family:sans-serif; padding:2rem;">
      <h1>Embed Route Working</h1>
      <p>If you see this, iframe embedding will now work.</p>
    </body>
    </html>
  `);
}
