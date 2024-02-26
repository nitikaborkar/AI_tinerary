import React, { useState } from "react";
import axios from "axios";
import "./itinerary.css"; 

const Itinerary = () => {
  const [apiKey] = useState(
    "Your_Key"

  );
  const [urlString] = useState(
    "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions"
  );
  const [conversation, setConversation] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const formatItineraryText = (text) => {
    // Split the text by "day X:" but exclude the match from the parts array
    const parts = text.split(/day \d+:/i);
    // Find all the "day X:" matches
    const days = text.match(/day \d+:/gi);
  
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {index !== 0 && <><br /><br /></>} {/* Adds a line break before day headings except for the first day */}
        {days && index - 1 >= 0 && days.length > index - 1 && (
          <strong>{days[index - 1]}</strong>
        )}
        {part}
      </React.Fragment>
    ));
  };
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        urlString,
        {
          prompt:
            prompt +
            "give a detailed itenary based on the interests in the format day 1: , day 2:.... mention the desination, best time to visit, and the best hotel for the user at the start of the answer before the itenary",
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
  const handleKeyPress = (event) => {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      handleSubmit(); // Call handleSubmit function when Enter key is pressed
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
              <bt />
              <p className="bot-message">
                <strong>Bot:</strong> {formatItineraryText(item.response)}
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
            onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
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
