const chat = require("./utils/chat");


const express = require("express");
const app = express();


const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const router = require("./routes")


app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);


io.on('connection', async function(socket) {

  console.log('Un cliente se ha conectado'); 
  
  const messages = await chat.list();  
  socket.emit('messages', messages);   
  
  io.sockets.emit('productos');

 
  socket.on ('new-message', async function (data){
    try {
      chat.save(data);
      const messages = await chat.list();      
      io.sockets.emit('messages', messages);
    } catch (err) {
      console.log(err);
    }
    
  });

});


httpServer.listen(8080, function() {
  console.log('Servidor corriendo en http://localhost:8080');
})






