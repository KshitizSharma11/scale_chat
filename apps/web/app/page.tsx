"use client"
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";
export default function Page(){
 const {sendMessage,messages}= useSocket();
 const [message,setMessage]= useState('');
  return (
    <div>
      <div>
        <h1>messages</h1>
      </div>
<div>
  <input  onChange={e=>setMessage(e.target.value)} className={classes["chat-input"]} type="text" placeholder="Your Message"/>
  <button onClick={e => sendMessage(message)} className={classes["button"]}>Send</button>
</div>
<div>
  <h1>Recieved Chat</h1>
  {messages.map((message,i)=>{
    return <p key={i}>{message}</p>;
  })}
</div>
    </div>
  );
};