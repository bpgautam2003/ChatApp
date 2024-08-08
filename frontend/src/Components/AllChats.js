import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/chatLogics";
import { ChatState } from "../Context/ChatProvider";
import "../styles.css"; 

const AllChats = ({ fetchAgain }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setSearchResult(data);
    } catch (error) {
      alert('Error occurred while searching');
    }
  };

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setSearchResult([]); 
      setSearch(""); 
    } catch (error) {
      alert('Error fetching the chat');
    }
  };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      setChats(data);
    } catch (error) {
      alert("Failed to load the chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className="all-chats-container">
      <div className="all-chats-header">
        Welcome, {user.name}
      </div>
      <div className="search-section">
      <input
        type="text"
        placeholder="Find people"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>Go</button>
      </div>
      <div className="search-result-container">
        {searchResult && 
        searchResult.map((user) => (
          <div className="search-result" onClick={() => accessChat(user._id)} key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))
        }
      </div>

      <div className="chats-list">
        <div>
          All Chats
        </div>
        {chats ? (
          <div style={{ overflowY: "scroll" }}>
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={`chat-item ${
                  selectedChat === chat ? "chat-item-selected" : ""
                }`}
                key={chat._id}
              >
                <p>
                  {getSender(loggedUser, chat.users)}
                </p>
                {chat.latestMessage && (
                  <p className="latest-message">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : ""}
      </div>
    </div>
  );
};

export default AllChats;
