import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import Chatbox from "./Chatbox";
import AllChats from "./AllChats";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div>
      <div style={{display : "flex", justifyContent : "space-between"}}>
        {user && <AllChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chat;
