# Lord Metadata API

A premium Node.js + Express + TypeScript API for metadata monetization and social platform integrations.

## Features

- Express server with TypeScript
- Security middleware: helmet, cors, compression
- Social metadata endpoints for Facebook, Instagram, Pinterest
- JSON API responses
- HTML landing page at `/`
- Health endpoint at `/health`
- Structured service layer with clean separation

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Endpoints

- `GET /`
- `GET /health`
- `GET /api/v1/meta`
- `GET /api/v1/social/facebook`
- `GET /api/v1/social/instagram`
- `GET /api/v1/social/pinterest`
- `GET /api/v1/social/:platform`

## Example

```bash
curl http://localhost:3000/api/v1/social/facebook
```
