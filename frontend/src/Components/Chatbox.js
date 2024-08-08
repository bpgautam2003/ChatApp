import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";
import '../styles.css'

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div className={`my-chats ${selectedChat ? "flex" : "none"}`}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;