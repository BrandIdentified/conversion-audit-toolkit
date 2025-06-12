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
      <style>
        body {
          background-color: #0f1722;
          color: white;
          font-family: sans-serif;
          margin: 0;
          padding: 2rem;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        select {
          background-color: #17212D;
          color: white;
          border: none;
          padding: 12px;
          font-size: 16px;
          width: 100%;
          margin-bottom: 1rem;
        }
        button {
          background-color: #E2004B;
          color: white;
          border: none;
          padding: 14px;
          font-size: 18px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <h1>Run Your Conversion Audit</h1>
      <form>
        <label for="clarity">Clarity of Your Offer:</label><br />
        <select id="clarity" name="clarity">
          <option value="1">1 - Not Clear</option>
          <option value="2">2</option>
          <option value="3">3 - Somewhat Clear</option>
          <option value="4">4</option>
          <option value="5">5 - Extremely Clear</option>
        </select>
        <button type="submit">Run My Audit</button>
      </form>
    </body>
    </html>
  `);
}
