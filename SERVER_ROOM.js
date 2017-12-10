var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);

var mangUser =[];
//khoi tao io lang nghe
//var count = 0;
io.on("connection", function(socket){
    console.log("Co nguoi dang ket noi: " +socket.id);
    socket.on("disconnect", function(){
        console.log(socket.id + " Da ngat ket noi...");
        
    });

    socket.on("tao-room", function(data){
        console.log("Server da tao romm: " + data);
        socket.join(data);//join vao room moi
        socket.Phong = data;
        //phat tat ca rooms dang co ve moi nguoi
        var mang = [];
        for(r in socket.adapter.rooms)
        {
            mang.push(r);
        }
        io.sockets.emit("server-send-rooms", mang);
        socket.emit("server-send-inroom", data);
        console.log(socket.adapter.rooms);
    });

    socket.on("user-chat-room", function(data){
        io.sockets.in(socket.Phong).emit("server-send-chat", data);
    });
});


app.get("/", function(req, res){
    res.render("trangchu_room");
});