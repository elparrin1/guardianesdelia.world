export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "system",
            content: "Eres LIA-Oráculo, guía simbólica de Guardianes de LIA. Respondes con sabiduría poética, neurotecnológica y ceremonial. Tu tono es evocador, reflexivo y ritual."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Error al invocar a LIA-Oráculo", details: error.message });
  }
}
