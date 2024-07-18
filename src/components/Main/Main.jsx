import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {
  const {
    cardItems,
    onSendPrompt,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    isLoading,
    setIsLoading,
    responseData,
    setResponseData,
    error,
  } = useContext(Context);

  const handleSend = (e) => {
    if (e.key === "Enter") {
      onSendPrompt(input);
      setInput("");
    }
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='user-icon' />
      </div>

      <div className='main_container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p>
                <span> Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className='cards'>
              {cardItems.map((card, index) => (
                <div className='card' key={index}>
                  <p>{card.title}</p>
                  <img src={card.icon} alt={`icon_${index}`} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='result'>
              <div className='result_title'>
                <img src={assets.user_icon} alt='user_icon' />
                <p>{recentPrompt}</p>
              </div>

              <div className='result_data'>
                <img src={assets.gemini_icon} alt='gemini_icon' />
                {!isLoading ? (
                  Array.isArray(responseData) && responseData.length <= 0 ? (
                    <div className='error-msg'>
                      <p
                        style={{
                          color: "red",
                          padding: "8px",
                        }}>
                        {error}
                      </p>
                    </div>
                  ) : (
                    <p>{responseData}</p>
                  )
                ) : (
                  <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className='main_bottom'>
          <div className='message_box'>
            <input
              type='text'
              placeholder='Enter a prompt here'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={handleSend}
            />
            <div>
              <img src={assets.gallery_icon} alt='gallery_icon' />
              <img src={assets.mic_icon} alt='mic_icon' />
              <img
                src={assets.send_icon}
                alt='send_icon'
                onClick={handleSend}
              />
            </div>
          </div>

          <p className='botton_info'>
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
