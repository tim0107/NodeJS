const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();



app.use(express.static("./public"));

// socket setup

//const server = require('http').createServer();
const server = http.createServer(app); // create a http server with express , socket will use this to control the real time.

const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả các domain kết nối
  },
});

//listen to the client ,
// whenever one client connect, socketio will create an object for that client ( identify by socket.id)
io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on('chat', (data) => {
    io.emit('chat',data);
  })

  
// Nhận message từ client
// "message" is the name of the event
// data is the data from the client
// io.emit is use to send data back to all the client connected  --- aka broadcast message
// socket.on("message", (data) => {
//     console.log("📩 Received:", data);
//     io.emit("message", data); // Gửi lại cho tất cả clients
//   });
  
//   // Xử lý khi client ngắt kết nối
//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
  
});

server.listen(5000, () => {
    console.log("server is running at port 5000");
  });
