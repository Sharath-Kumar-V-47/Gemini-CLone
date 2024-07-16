import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState("");

  const onSendPrompt = async (prompt) => {
    // setResponseData("");
    setIsLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    try {
      const response = await run(prompt);
      setResponseData(response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const contextVariables = {
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
