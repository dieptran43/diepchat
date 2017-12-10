var socket = io("https://diepchat.herokuapp.com/");
$(function(){
    
        //user click dang ky
    $("#btnTaoRoom").click(function(){
        socket.emit("tao-room", $("#txtRoom").val());
    });
    
    $("#btnChat").click(function(){
        socket.emit("user-chat-room", $("#txtMessage").val());
    });

});

socket.on("server-send-rooms", function(data)
{
    $("#dsRoom").html("");
    data.map(function(r){
        $("#dsRoom").append("<h4 class='clroom'>"+ r + "</h4>");
    });
});

socket.on("server-send-inroom",function(data){
    $("#roomHienTai").html(data);
});

socket.on("server-send-chat", function(data){

    $("#right").append(data +"<br/>");
});
