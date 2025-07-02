# Local Development Setup for Netlify

## Option 1: Use Netlify Dev (Recommended for testing functions)

1. **Install Netlify CLI globally**:

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:

   ```bash
   netlify login
   ```

3. **Start Netlify Dev server**:

   ```bash
   netlify dev
   ```

   This will:

   - Start Vite dev server
   - Enable Netlify functions locally
   - Proxy requests to `/.netlify/functions/*`

4. **Access application**:
   - App: http://localhost:8888
   - Health endpoint: http://localhost:8888/health

## Option 2: Standard Vite Dev (Current setup)

1. **Start development server**:

   ```bash
   npm run dev
   ```

2. **Access application**:
   - App: http://localhost:5173
   - Health Monitor shows "Development Mode" with mock data

## Health Monitor Behavior

### Development Mode (npm run dev):

- ✅ Shows "Development Mode" badge
- ✅ Uses mock health data
- ✅ Green healthy status
- ✅ Mock response times

### Netlify Dev Mode (netlify dev):

- ✅ Connects to actual health function
- ✅ Real Netlify function responses
- ✅ Tests actual deployment scenario

### Production:

- ✅ Calls `/.netlify/functions/health`
- ✅ Real health checks
- ✅ Error handling for failures

## Testing Health Endpoint

### Local with curl (when using netlify dev):

```bash
curl http://localhost:8888/health | jq
```

### Production:

```bash
curl https://your-site.netlify.app/health | jq
```

## Troubleshooting

### Health Monitor shows "unhealthy" in development:

- This is expected if not using `netlify dev`
- The component automatically falls back to mock data
- No action needed for development

### Health Monitor shows errors in production:

1. Check if Netlify function is deployed
2. Check function logs in Netlify dashboard
3. Verify `netlify.toml` configuration
4. Check CORS headers

### To use real functions in development:

```bash
# Instead of npm run dev, use:
netlify dev
```

This will enable:

- Real Netlify functions
- Environment variables from Netlify
- Exact production behavior
