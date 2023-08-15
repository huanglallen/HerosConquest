import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BattleChat = ({ battle }) => {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);

    const heroesObj = useSelector(state => state.heroes?.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const hero = userHeroes.find(hero => hero.id === battle?.heroId);

    const monstersObj = useSelector(state => state.monsters?.monsters);
    const monsters = Object.values(monstersObj);
    const monster = monsters.find(monster => monster.id === battle?.monsterId);

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
    if (battle.heroHp) {
        const newMessage = {
            message: `${hero.name} has attacked! ${monster.name} lost 5 hp`,
            created: new Date(),
        };

        const jsonNewMessage = JSON.stringify({
            type: 'send-chat-message',
            data: newMessage,
        });

        console.log(`Sending message: ${jsonNewMessage}...`);

        if (webSocket.current) {
            webSocket.current.send(jsonNewMessage);
        }

        setMessages([newMessage, ...messages]);
        }

        if (battle.monsterHp) {
        const newMessage = {
            message: `${monster.name} has attacked! ${hero.name} lost 5 hp.`,
            created: new Date(),
        };

        const jsonNewMessage = JSON.stringify({
            type: 'send-chat-message',
            data: newMessage,
        });

        let newMsg = JSON.parse(jsonNewMessage);

        console.log(`Sending message: ${newMsg.data.message}...`);

        if (webSocket.current) {
            webSocket.current.send(jsonNewMessage);
        }

        setMessages([...messages, newMsg]);
        }
    }, [battle.heroHp, battle.monsterHp]);
    console.log('[MESSAGES]', messages)

  return (
    <div>
      {messages.map(msg => {
        return (
            <li>
                {msg.data.message}
            </li>
        )
      })}
    </div>
  );
};

export default BattleChat;
