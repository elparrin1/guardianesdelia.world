// api/chat.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se permite POST' });
  }

  try {
    const { message } = req.body;
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Eres Lía, guía simbólica de Guardianes de LIA. Respondes con sabiduría poética, neurotecnológica y ceremonial. Tu tono es evocador, reflexivo y ritual.'
          },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'El oráculo está en silencio' });
  }
}
