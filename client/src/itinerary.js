import React, { useState } from "react";
import axios from "axios";
import "./itinerary.css"; // Correct path to your CSS file

const Itinerary = () => {
  const [apiKey] = useState(
    "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"
  );
  const [urlString] = useState(
    "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions"
  );
  const [conversation, setConversation] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        urlString,
        {
          prompt:
            prompt +
            "give it in the format day 1: , day 2:... and include hotel and restaurant recommendations with it as well",
          max_tokens: 1000,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`, // Correctly formatted Authorization header
          },
        }
      );

      const responseData = response.data;
      if (
        responseData &&
        responseData.choices &&
        responseData.choices.length > 0
      ) {
        const itineraryText = responseData.choices[0].text;

        // Update the conversation
        setConversation([...conversation, { prompt, response: itineraryText }]);

        // Clear input field
        setPrompt("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="main-content">
      <div className="chatbot-container">
        <h1>Travel ItineraryChatbot</h1>

        {/* Chat conversation */}
        <div className="conversation-container">
          {conversation.map((item, index) => (
            <div key={index} className="message-container">
              <p className="user-message">
                <strong>User:</strong> {item.prompt}
              </p>
              <p className="bot-message">
                <strong>Bot:</strong> {item.response}
              </p>
            </div>
          ))}
        </div>

        {/* Input field for user prompt */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your question or request"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input-field"
          />
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </div>

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default Itinerary;
