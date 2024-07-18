import { createContext, useState } from "react";
import run from "../Config/gemini";
import { assets } from "../assets/assets";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState("");

  const cardItems = [
    {
      title: "Ideas to surprise a friend on their birthday",
      icon: assets.compass_icon,
    },
    {
      title: "Help write SQL to generate a report",
      icon: assets.code_icon,
    },
    {
      title: "I'm sick and need help crafting a text message for my boss",
      icon: assets.message_icon,
    },
    {
      title: "Give me ideas for what to do with what's in this image?",
      icon: assets.bulb_icon,
    },
  ];

  const onSendPrompt = async (prompt) => {
    // setResponseData("");
    setIsLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const parseResponse = (text) => {
      let parts = text.split("**");
      let parsedText = parts.map((part, index) => {
        if (index % 2 === 1) {
          // Odd indices contain text to be bolded
          return (
            <span
              style={{
                whiteSpace: "pre-line",
              }}>
              <b key={index}>{part}</b>
            </span>
          );
        } else {
          // Handle single asterisks to add <br/>
          return part.split("*").map((item, idx) => {
            return (
              <span key={idx}>
                {idx > 0 && <br />}
                {item}
              </span>
            );
          });
        }
      });
      return parsedText;
    };

    try {
      const response = await run(prompt);
      let modifiedResponse = parseResponse(response);

      setResponseData(modifiedResponse);
    } catch (error) {
      console.error("Error:", error);
      setResponseData("Error: Failed to fetch response.");
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const contextVariables = {
    cardItems,
    onSendPrompt,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompt,
    setPreviousPrompt,
    showResult,
    setShowResult,
    isLoading,
    setIsLoading,
    responseData,
    setResponseData,
  };

  return (
    <>
      <Context.Provider value={contextVariables}>
        {props.children}
      </Context.Provider>
    </>
  );
};
