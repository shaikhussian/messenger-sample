import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from "../Messages/Messages";
// import './Chat.css';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://messengerapplication.herokuapp.com/'
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT)
        setName(name);
        setRoom(room);
        socket.emit('join', { name, room }, () => {
        });
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [messages]);

    const sendMessage = (event) => {
        console.log("event", event)
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);
    return (
        <Row>
            <Col xs={12} sm={7} md={6} lg={8} xl={10}>
                <div style={{ flex: 1 }}>
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </Col>
            <Col xs={12} sm={5} md={6} lg={4} xl={2} >
                <div className="background">
                    <TextContainer users={users} />
                </div>
            </Col>
        </Row>
    )
}

export default Chat;