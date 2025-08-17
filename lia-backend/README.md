# Lía Backend

Backend minimal para el endpoint `/chat` usando Express + OpenAI SDK.

## Requisitos
- Node.js 18+
- Variable de entorno `OPENAI_API_KEY` válida

## Instalación
```bash
npm install
npm run start
# o en desarrollo
npm run dev
```

## Endpoints
- `GET /health` → estado del servicio
- `POST /chat` → body JSON `{ "message": "texto del usuario" }`

## Notas
- Asegúrate de definir `OPENAI_API_KEY` en `.env` o en tu entorno.
- CORS habilitado por defecto para facilitar consumo desde frontends.
