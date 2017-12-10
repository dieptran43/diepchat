var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(process.env.PORT,3000");

var mangUser =[];
//khoi tao io lang nghe
//var count = 0;
io.on("connection", function(socket){
    console.log("Co nguoi dang ket noi: " +socket.id);
    socket.on("disconnect", function(){
        console.log(socket.id + " Da ngat ket noi...");
        
    });

    socket.on("client-send-data", function(data){
        console.log("Server da nhan: " + data);
        io.sockets.emit("server-send","server phat lai cho moi nguoi: "+ data);
        //return to mrA
       // socket.emit("server-send-owner", "Server send owner"+ data);
       //Send everyone not send owner
       //socket.broadcast.emit("server-send-broadcast", "Broadcast: " +data);

    } );

    socket.on("client-send-UserName", function(data){
        if(mangUser.indexOf(data) >= 0)
        {
            socket.emit("server-send-fail", "Ten dang nhap da ton tai, pls tao ten moi");
        }
        else{
            mangUser.push(data);
            socket.userName = data;
            socket.emit("server-send-success", data);
            io.sockets.emit("server-send-mangUser", mangUser);
            console.log(mangUser);
        }
    });

    socket.on("client-send-logout", function() {
        console.log("Da vao logout");
        mangUser.splice(
           mangUser.indexOf(socket.userName, 1)
        );
        socket.broadcast.emit("server-send-mangUser", mangUser);
    });

    socket.on("client-send-chat", function(data){
        io.sockets.emit("server-send-chatall", {un: socket.userName, nd: data});
    });

    socket.on("client-stypping",function(){
        socket.broadcast.emit("server-message-typping", socket.userName);
    })

     socket.on("client-stypping-out",function(){
        socket.broadcast.emit("server-message-typping-out");
    })
});


app.get("/", function(req, res){
    res.render("trangchu");
});
