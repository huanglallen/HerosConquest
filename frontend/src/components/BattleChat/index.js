import React, { useState, useEffect } from 'react';

const BattleChat = ({ battle }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    battle.on('heroHpChange', (newHp) => {
      handleMessage(`Hero's HP changed to ${newHp}`);
    });

    battle.on('monsterHpChange', (newHp) => {
      handleMessage(`Monster's HP changed to ${newHp}`);
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      battle.off('heroHpChange');
      battle.off('monsterHpChange');
    };
  }, [battle]);

  return (
    <div>
      <h2>Battle Chat</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default BattleChat;
