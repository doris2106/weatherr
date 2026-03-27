# weatherr

Simple Node.js weather app using Express and OpenWeatherMap API.

## Run locally

1. Install dependencies
```bash
npm install
```

2. Create `.env` file and add key
```env
OPENWEATHER_API_KEY=your_api_key_here
```

3. Start server
```bash
npm run dev
```

4. Open
`http://localhost:3000`

## Deploy
- GitHub: push to `main` and enable Pages (docs folder).
- Vercel: connect repo and set `OPENWEATHER_API_KEY` env var.
