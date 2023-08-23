import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';

const Chat = () => {
    const username = useSelector(state => state.session.user?.username)
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        //???
        const newSocket = new WebSocket('ws://localhost:8000/ws');

        newSocket.onopen = () => {
            console.log('WebSocket connected');
        };

        newSocket.onmessage = e => {
            const message = JSON.parse(e.data);
            handleMessage(message);
        };

        newSocket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const handleMessage = message => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const sendMessage = () => {
        if (inputValue.trim() === '') return;

        // Get current time
        const timestamp = new Date().toLocaleTimeString();
        const formattedMessage = `[${timestamp}] ${username}: ${inputValue}`;
        const message = {
          type: 'chat-message',
          data: formattedMessage,
        };

        socket.send(JSON.stringify(message));
        setInputValue('');
      };

      return (
        <div id='chat'>
            <h1 className='chat-title'>
                Welcome to the Global Chat
            </h1>
          <div className='chat-body'>
            {messages.map((message, index) => (
              <div key={index}>{message.data}</div>
            ))}
          </div>
          <div className='chat-play'>
            <input
            className='chat-input'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className='chat-send' onClick={sendMessage}>Send</button>
          </div>
        </div>
    );
};

export default Chat;
