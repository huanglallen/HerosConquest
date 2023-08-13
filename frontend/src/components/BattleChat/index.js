import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import * as sessionActions from "../../store/session";

const BattleChat = ({ battle }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const webSocket = useRef(null);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setUsername(''); // Set the username based on your user restoration logic
    });
  }, [dispatch]);

  useEffect(() => {
    if (!username) return;

    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = (e) => {
      console.log(`Connection open: ${e}`);
      setMessages([]);
    };

    ws.onerror = (e) => {
      console.log(e);
    };

    ws.onclose = (e) => {
      console.log(`Connection close: ${e}`);
      webSocket.current = null;
      setUsername('');
      setMessages([]);
    };

    webSocket.current = ws;

    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
      }
    };
  }, [username]);

  useEffect(() => {
    if (webSocket.current !== null) {
      webSocket.current.onmessage = (e) => {
        console.log(`Processing incoming message ${e.data}...`);

        const chatMessage = JSON.parse(e.data);
        const message = chatMessage.data;
        message.created = new Date(message.created);

        setMessages([message, ...messages]);
      };
    }
  }, [messages]);

  useEffect(() => {
    const handleHpChange = (type, newHp) => {
      const newMessage = {
        id: uuid(),
        username: 'System', // You can customize this to the desired sender name
        message: `${type === 'hero' ? 'Hero' : 'Monster'} HP changed to ${newHp}`,
        created: new Date(),
      };

      const jsonNewMessage = JSON.stringify({
        type: 'send-chat-message',
        data: newMessage,
      });

      console.log(`Sending message: ${jsonNewMessage}...`);
      webSocket.current.send(jsonNewMessage);

      setMessages([newMessage, ...messages]);
    };

    battle.on('heroHpChange', (newHp) => {
      handleHpChange('hero', newHp);
    });

    battle.on('monsterHpChange', (newHp) => {
      handleHpChange('monster', newHp);
    });

    return () => {
      battle.off('heroHpChange');
      battle.off('monsterHpChange');
    };
  }, [battle, messages]);

  const handleLeave = () => {
    setUsername('');
  };

  return (
    <div>
      {/* Render your chat UI */}
    </div>
  );
};

export default BattleChat;
