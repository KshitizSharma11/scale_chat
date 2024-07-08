import { Server } from "socket.io";


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

 }
 public initListeners(){
 const io = this.io;
 io.on('connect', (socket) => {
console.log("new socket connected",socket.id);
socket.on('event:message',async ({message}:{message:string}) => {

    console.log('new message recieved',message);
});

 });


}
get io(){
    return this._io;
}

}
export default SocketService;