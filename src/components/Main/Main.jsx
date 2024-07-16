import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
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
              <div className='card'>
                <p>Ideas to surprise a friend on their birthday</p>
                <img src={assets.compass_icon} alt='compass_icon' />
              </div>

              <div className='card'>
                <p>Help write SQL to generate a report</p>
                <img src={assets.code_icon} alt='code_icon' />
              </div>

              <div className='card'>
                <p>
                  I'm sick and need help crafting a text message for my boss
                </p>
                <img src={assets.message_icon} alt='message_icon' />
              </div>

              <div className='card'>
                <p>Give me ideas for what to do with what's in this image?</p>
                <img src={assets.bulb_icon} alt='bulb_icon' />
              </div>
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
                  <>
                    <p>{responseData}</p>
                  </>
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
