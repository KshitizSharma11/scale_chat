import { Server } from "socket.io";
import Redis from "ioredis";


const pub = new Redis({host: "localhost", port:6379});
const sub = new Redis({host: "localhost", port:6379});

pub.on('connect', () => {
    console.log('Publisher connected to Redis');
  });
  
  pub.on('error', (err) => {
    console.error('Publisher Redis connection error:', err);
  });
  
  sub.on('connect', () => {
    console.log('Subscriber connected to Redis');
  });
  
  sub.on('error', (err) => {
    console.error('Subscriber Redis connection error:', err);
  });

class SocketService{

 protected _io: Server;
 constructor() {
    console.log("SocketService");
     
    this._io = new Server({
        cors: {
          origin: "*",
          allowedHeaders: ["*"]
        },
  
    });
    sub.subscribe("MESSAGES",)

 }
 public initListeners(){
 const io = this.io;
 io.on('connect', (socket) => {
console.log("new socket connected",socket.id);
socket.on('event:message',async ({message}:{message:string}) => {

    console.log('new message recieved',message);
    await pub.publish('MESSAGES',JSON.stringify({message}));
});

 });

sub.on('message',(channel:string,message:string)=>{
    if(channel=="MESSAGES")
    {
        console.log(message);
        io.emit('message', JSON.parse(message));
        console.log('message delivered to clients',message);
    }
})
}
get io(){
    return this._io;
}

}
export default SocketService;