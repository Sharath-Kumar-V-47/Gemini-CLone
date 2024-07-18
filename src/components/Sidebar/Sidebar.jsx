import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const { previousPrompt, onSendPrompt } = useContext(Context);
  const [extend, setExtend] = useState(false);

  const handleMenuClick = () => {
    setExtend((val) => !val);
  };

  return (
    <div className='sidebar'>
      <div className='top'>
        <div className='menu' onClick={handleMenuClick}>
          <img src={assets.menu_icon} alt='menu_icon' />
        </div>

        <div className='newChat'>
          <img src={assets.plus_icon} alt='new_chat' />
          {extend && <p>New Chat</p>}
        </div>

        {extend && (
          <div className='recent'>
            <p className='recent_title'>Recent</p>
            {previousPrompt.map((prompt, index) => (
              <div className='recent_entry' key={index}>
                <img className='message_icon' src={assets.message_icon} />
                <p className='prompt-text'>
                  {prompt.length > 20 ? `${prompt.slice(0, 20)}...` : prompt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='bottom'>
        <div className='bottom_item recent_entry'>
          <img src={assets.question_icon} />
          {extend && <p>Help</p>}
        </div>

        <div className='bottom_item recent_entry'>
          <img src={assets.history_icon} />
          {extend && <p>Activity</p>}
        </div>

        <div className='bottom_item recent_entry'>
          <img src={assets.setting_icon} />
          {extend && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
