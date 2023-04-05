import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Socket } from "socket.io-client";
import { IGamesPosts } from "../interfaces";

interface IProps {
  socket: Socket;
  roomId: string;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gamePostUserName: string;
}

interface IMessage {
  roomId: string;
  author: string;
  message: string;
  time: string;
}

function Chat({ socket, roomId, setIsChatOpen, gamePostUserName }: IProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        roomId: roomId,
        author: gamePostUserName,
        message: currentMessage,

        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: IMessage) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  console.log(roomId);

  return (
    <div className="chat-window">
      <div className="chat-header" onClick={() => setIsChatOpen(false)}>
        <p>
          Live Chat <span>{roomId}</span>{" "}
        </p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                className="message"
                key={i}
                id={
                  gamePostUserName === messageContent.author ? "other" : "you"
                }
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta text-black">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
