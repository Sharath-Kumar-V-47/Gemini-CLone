import React, { createContext, useState } from "react";
import run from "../Config/gemini";
import { assets } from "../assets/assets";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState("");

  const typingEffect = (index, nextWord) => {
    setTimeout(() => {
      setResponseData((prev) => [...prev, nextWord]);
    }, 100 * index);
  };

  const cardItems = [
    {
      id: 1,
      title: "Ideas to surprise a friend on their birthday",
      icon: assets.compass_icon,
    },
    {
      id: 2,
      title: "Help write SQL to generate a report",
      icon: assets.code_icon,
    },
    {
      id: 3,
      title: "I'm sick and need help crafting a text message for my boss",
      icon: assets.message_icon,
    },
    {
      id: 4,
      title: "Give me ideas for what to do with what's in this image?",
      icon: assets.bulb_icon,
    },
  ];

  const parseResponse = (text) => {
    let parts = text.split("**");
    let parsedText = parts.map((part, index) => {
      if (index % 2 === 1) {
        // Odd indices contain text to be bolded
        return (
          <span
            key={index}
            style={{
              whiteSpace: "pre-line",
            }}>
            <b>{part}</b>
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

  const onSendPrompt = async (prompt) => {
    setResponseData("");
    setIsLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setPreviousPrompt((prev) => [...prev, input]);
    try {
      const response = await run(prompt);
      const modifiedResponse = parseResponse(response);

      setResponseData([]);

      modifiedResponse.forEach((word, index) => {
        typingEffect(index, word);
      });
    } catch (error) {
      console.error("Error:", error);
      setError(["Error: Failed to fetch response."]);
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
    error,
    setError,
  };

  return (
    <Context.Provider value={contextVariables}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
