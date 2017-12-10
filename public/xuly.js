var socket = io("https://diepchat.herokuapp.com/");
$(function(){
    $("#noidung1").html("Balala Anh Diep lam Nodejs");
    $("#mrA").click(function(){
        socket.emit("client-send-data", "A goi B nghe ko??");
    });

    //Hide, show div
    $("#loginForm").show();
    $("#chatForm").hide();

        //user click dang ky
    $("#btnRegister").click(function(){
        socket.emit("client-send-UserName", $("#txtUserName").val());
    });

    //user click logout
    $("#btnLogout").click(function(){
        debugger;
        socket.emit("client-send-logout");
        $("#chatForm").hide(2000);
        $("#loginForm").show(1000);
    });

    $("#btnSendMessage").click(function(){
        socket.emit("client-send-chat", $("#txtMessage").val());
    });

    $("#txtMessage").focusin(function() {
        socket.emit("client-stypping");
    });

    $("#txtMessage").focusout(function() {
        socket.emit("client-stypping-out");
    });
                    
});
socket.on("server-send", function(data){
        $("#noidung1").html(data);
    });

socket.on("server-send-owner", function(data){
    $("#mrA_owner").html(data);
})

socket.on("server-send-broadcast", function(data){
    $("#reBroadcast").html(data);
});

socket.on("server-send-fail", function(data)
{
    $("#lblMessage").text(data);
});

socket.on("server-send-success", function(data)
{
    $("#lblMessage").text(data +" da tham gia thanh cong");
    $('#currentUser').text(data);
});

socket.on("server-send-mangUser", function(data)
{
    debugger;
    //$("#lblMessage").text(data +" da tham gia thanh cong");
    $("#chatForm").show();
    // for (var index = 0; index < data.length; index++) {
    //     var element = data[index];
    //     $('#boxContent').append("<div class='userOnline'>" +element +"</div>")
    // }
    
    $('#boxContent').html("");
    data.forEach(function(element) {
         $('#boxContent').append("<div class='userOnline'>" +element+ "</div>");
    });
});

socket.on("server-send-chatall",function(data){
    var msg = "<div>" + data.un +": "+data.nd +"</div>";
   
   var curr =  $('#currentUser').text();
    if(curr == socket.userName)
    {
        msg = "<div style='float:right;'>" + data.un +": "+data.nd +"</div>";
    }

    $("#listMessages").append(msg);
});

socket.on("server-message-typping", function(data){
    //Thong bao dang go
    $("#lblTypping").html("<img width='20px' src='typing05.gif'> "+ data +" dang nhap van bang");
});
socket.on("server-message-typping-out", function(){
    //Xoa Thong bao dang go
    $("#lblTypping").html("");
});

