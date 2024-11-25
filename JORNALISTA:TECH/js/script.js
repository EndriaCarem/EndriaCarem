async function callGeminiAPI(content) {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: content
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if we have a valid response with the expected structure
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response structure from Gemini API');
    }
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get response from AI: ' + error.message);
  }
}

// Example usage
async function testGeminiAPI() {
  try {
    const response = await callGeminiAPI("What is the weather like today?");
    console.log("AI Response:", response);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testGeminiAPI();