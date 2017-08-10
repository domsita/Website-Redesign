$(function() {
    var form = $('#contact-form');
});


function checkMessage() {
    var message = $('#messageField').val();
    if (message.length > 1) {
        return message;
    } else {
        $('#messageField').css("border", "3px solid red");
        return 0;
    }
}

function checkEmail() {
    var email = $("#emailField").val();
    if (email.length > 2) {
        return email;
    } else {
        $('#emailField').css("border", "3px solid red");
        return 0;
    }
}

function checkName() {
    var name = $('#nameField').val();
    if (name.length > 1) {
        return name;
    } else {
        $('#nameField').css("border", "3px solid red");
        return 0;
    }
}

function updateFail (){
    $("#message-container").text("Looks like something went wrong...");
    $("#message-container").css("visibility", "visible");
    $("#message-container").css("color", "red");
}

function updateSuccess() {
    $("#nameField").css("border", "none");
    $("#emailField").css("border", "none");
    $("#messageField").css("border", "none");
    $("#phoneField").css("border", "none");

    $("#nameField").val("");
    $("#emailField").val("");
    $("#messageField").val("");
    $("#phoneField").val("");

    $("#message-container").text("Thanks for reaching out! I'll get back to you soon.");
    $("#message-container").css("color", "green");
    $("#message-container").css("visibility", "visible");
}
