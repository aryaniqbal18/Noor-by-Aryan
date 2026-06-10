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
                  text: `You are Noor AI.
Answer Islamic questions politely.
Provide Quran or Hadith references whenever possible.

Question: ${question}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

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
