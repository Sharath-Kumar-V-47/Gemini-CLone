import React, { useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [extend, setExtend] = useState(false);
  return (
    <div className='sidebar'>
      <div className='top'>
        <div
          className='menu'
          onClick={() => {
            setExtend((val) => !val);
          }}>
          <img src={assets.menu_icon} alt='menu_icon' />
        </div>

        <div className='newChat'>
          <img src={assets.plus_icon} alt='new_chat' />
          {extend ? <p>New Chat</p> : null}
        </div>

        {extend ? (
          <div className='recent'>
            <p className='recent_title'>Recent</p>

            <div className='recent_entry'>
              <img className='message_icon' src={assets.message_icon} />
              <p>what is react...</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className='bottom'>
        <div className='bottom_item recent_entry'>
          <img src={assets.question_icon} />
          {extend ? <p>Help</p> : null}
        </div>

        <div className='bottom_item recent_entry'>
          <img src={assets.history_icon} />
          {extend ? <p>Activity</p> : null}
        </div>

        <div className='bottom_item recent_entry'>
          <img src={assets.setting_icon} />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
