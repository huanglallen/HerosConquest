import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';

const Chat = () => {
    const username = useSelector(state => state.session.user?.username)
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
      //for render live
        const newSocket = new WebSocket('wss://https://heros-conquest.onrender.com/:8080/ws');
        // const newSocket = new WebSocket('ws://localhost:5055/ws');

        newSocket.onopen = () => {
            console.log('WebSocket connected');
        };

        newSocket.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log('e.data', message.data)
            handleMessage(message.data);
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

        //message format
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
              <div key={index} className={`${message.username}-chat`}>
                <span style={{ color: message.includes(username) ? 'black' : '#6986c0' }}>
                    {message}
                </span>
              </div>
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
