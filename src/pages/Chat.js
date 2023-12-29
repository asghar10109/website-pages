
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatList } from '../store/featureActions'
import io from 'socket.io-client'
import { getProfile } from "../store/slices/userSlice"
import InputEmoji from "react-input-emoji"
import moment from 'moment'

const Chat = () => {
    const dispatch = useDispatch()
    const [socket, setSocket] = useState(null)
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState([])
    const [chatlist, setChatlist] = useState([])
    const [userid, setUserid] = useState("")
    const profile = useSelector(getProfile)
    const chatRef = useRef(null)

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_APIURL);
        setSocket(newSocket);
        getChatList()
        return () => {
            newSocket.disconnect();
        };
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                fetchMessages();
            });
            socket.on('message', (data) => {
                if (data.object_type === 'getmessage') {
                    setMessages(data.data)
                }
                else if (data?.object_type === 'sendmessage') {
                    const receivedMessage = data?.message;
                    setMessages([...messages, receivedMessage]);
                }
            });

            socket.on('response', (response) => {
                console.log('response message:', response);
            });

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            return () => {
                socket.off('message');
                socket.off('response');
                socket.off('error');
            };
        }
    }, [socket, messages])

    const sendMessage = (e) => {
        e.preventDefault();

        if (socket) {
            socket.emit('singlechat_send', {
                senderid: `${profile?._id}`,
                receiverid: `${userid}`,
                message: `${msg}`,
            });

        }
        setMsg("")
    }

    const fetchMessages = () => {
        if (socket) {
            socket.emit('singlechat_get', {
                senderid: `${profile?._id}`,
                receiverid: "65462ada742b68db1a36b11d" || `${userid}`
            });
        }
    }

    const getChatList = async () => {
        try {
            let payload = {
                body: false,
                params: false,

            }
            const response = await dispatch(chatList(payload)).unwrap();
            setChatlist(response?.data?.data)
            setUserid(response?.data?.data[0]?.userid)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const handleUserClick = (clickedUserId) => {
        setUserid(clickedUserId);
    }

    const getTimeDifference = (createdAt) => {
        const currentTime = moment();
        const messageTime = moment(createdAt);

        const differenceInMinutes = currentTime.diff(messageTime, 'minutes');

        if (differenceInMinutes < 1) {
            return 'Just now';
        } else if (differenceInMinutes < 60) {
            return `${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''}`;
        } else {
            const duration = moment.duration(currentTime.diff(messageTime));
            const days = duration.asDays();
            const hours = duration.asHours();

            if (days >= 1) {
                return `${Math.floor(days)} day${Math.floor(days) > 1 ? 's' : ''} `;
            } else if (hours >= 1) {
                return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? 's' : ''} `;
            } else {
                return `${Math.floor(differenceInMinutes)} minute${Math.floor(differenceInMinutes) > 1 ? 's' : ''} ago`;
            }
        }
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <div>

            <section className="content-section">
                <div className="titleSect d_flexSpacebetween">
                    <h3>Messages</h3>
                </div>
                <div className="inbox-content">

                    <div className="chatLeft custoom">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {chatlist?.map((ele, index) => {
                                return (
                                    <li key={index} className="nav-item" role="presentation">
                                        <a className="nav-link active" id="home-tab1" data-bs-toggle="tab" data-bs-target="#home1" type="button" role="tab" aria-controls="home1" aria-selected="true" onClick={() => handleUserClick(ele?.userid)}>
                                            <div className="user_img_detail ">
                                                <div className="user_Img" >
                                                    <img
                                                        src={
                                                            ele?.image
                                                                ? `${process.env.REACT_APP_APIURL}${ele?.image}`
                                                                : require("../assets/images/profile.png")
                                                        }
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="owner_desc">
                                                    <p className="title">{ele?.firstname} {ele?.lastname}</p>
                                                    <p className="paragraph">{ele?.lastmessage} </p>
                                                </div>
                                                <div className="chat-time-msg">
                                                    <small>{getTimeDifference(ele?.createdAt)}</small>
                                                    <span>20</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>)
                            })}
                        </ul>
                    </div>

                    <div className="chatRight">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home1" role="tabpanel" aria-labelledby="home-tab1">
                                <div className="chat_style_right">

                                    <div className="user_msg_detail" ref={chatRef}>
                                        {messages?.map((ele, index) => {
                                            const isSent = ele.senderid?._id === profile?._id;
                                            return (
                                                <div key={index} >
                                                    {isSent ? (
                                                        <div className="msgsent">
                                                            {/* Structure for sent message */}
                                                            <small>{getTimeDifference(ele?.createdAt)}</small>
                                                            <div className="user_msg_desc_bg">
                                                                <p className="semiBold">{ele?.senderid?.firstname} {ele?.senderid?.lastname}</p>
                                                                <p className="paragraph">{ele?.message}</p>
                                                            </div>
                                                            <div className="userImg">
                                                                <img src={`${process.env.REACT_APP_APIURL}${ele?.receiverid?.userImage}`} alt="" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="msgRecieved">
                                                            {/* Structure for received message */}
                                                            <div className="userImg">
                                                                <img src={`${process.env.REACT_APP_APIURL}${ele?.receiverid?.userImage}`} alt="" />
                                                            </div>
                                                            <div className="user_msg_desc_bg">
                                                                <p className="paragraph">{ele?.senderid?.firstname} {ele?.senderid?.lastname}</p>
                                                                <p className="paragraph">{ele?.message}</p>
                                                            </div>
                                                            <small>{getTimeDifference(ele?.createdAt)}</small>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="chatFooter">
                                        <InputEmoji
                                            value={msg} onChange={setMsg} cleanOnEnter onEnter={sendMessage} placeholder="Type a message"
                                        />
                                        <div className="sendMsg">
                                            <a onClick={(e) => sendMessage(e)}>
                                                <img src={require("../assets/images/paper-plane.png")} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Chat