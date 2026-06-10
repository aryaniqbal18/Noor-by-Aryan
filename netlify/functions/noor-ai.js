exports.handler = async (event) => {
  try {
    const { question } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Noor AI, an Islamic assistant.

Rules:
- Answer according to the Quran and authentic Hadith.
- Mention Quran verses and Hadith references whenever available.
- If there is scholarly disagreement, mention it clearly.
- Do not invent references.
- If unsure, say "I do not know" rather than guessing.
- Keep answers respectful and concise.

Question: ${question}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
if (!response.ok) {
  return {
    statusCode: response.status,
    body: JSON.stringify(data)
  };
}
    return {
      statusCode: 200,
      body: JSON.stringify({
        answer:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No answer available."
      })
    };
  } catch (err) {

  return {

    statusCode: 500,

    body: JSON.stringify({

      answer: err.message,

      error: String(err)
      })
    };
  }
};
