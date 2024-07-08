'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { io,Socket } from "socket.io-client";
interface SocketProviderprops{

    children?: React.ReactNode;
}
interface ISocketContext{
    sendMessage:(message: string) => any;
}


const SocketContext = React.createContext<ISocketContext | null>(null);
export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);
  
    return state;
  };

export const SocketProvider:React.FC<SocketProviderprops> = ({children})=>{
    const [socket,setSocket]= useState<Socket>();
const sendMessage:ISocketContext["sendMessage"] = useCallback((message:string)=>{

    console.log("sending message",message);
    if(socket){
        socket.emit('event:message',{message:message});
        
    }

},[socket]);
useEffect(()=>{
    const _socket = io("http://localhost:8000");
    setSocket(_socket);
    
    return () => {
        _socket.disconnect();
        setSocket(undefined);
    };
},[]);
return(
    <SocketContext.Provider value={{sendMessage}}>
     {children}
    </SocketContext.Provider>
);
};