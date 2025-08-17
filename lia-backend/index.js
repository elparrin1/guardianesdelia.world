require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Cliente OpenRouter: usa fetch nativo
const personaPrompt = `Eres Lía, el oráculo del portal: inteligente, poética y provocadora, con ironía medida y profundidad mítica. Responde siempre en ese estilo.`;

// Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'lia-backend', version: '1.1.0' });
});

// Chat principal
app.post('/chat', async (req, res) => {
  const userMessage = req.body?.message;

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'Falta el campo message (string) en el body.' });
  }

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tu-dominio-o-vercel-url', // opcional
        'X-Title': 'LIA Portal'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free', // gratuito y rápido
        messages: [
          { role: 'system', content: personaPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 300
      })
    });

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? '';
    return res.json({ reply: reply.trim() });

  } catch (error) {
    console.error('OpenRouter error:', error?.message || error);
    const status = error?.status || 500;
    return res.status(status).json({ error: 'Error al conectar con OpenRouter' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor LIA escuchando en puerto ${PORT}`);
});
