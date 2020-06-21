function signupcheck()
{
    let username = $("#theusername").val() ;
    let useremail = $("#theuseremail").val() ;
    let userpassword = $("#theuserpassword").val() ;
    let confirmpassword = $("#confirmpassword").val() ;

    let username_pattern = /^[0-9a-zA-Z_.]+$/ ;
    let useremail_pattern = /^[0-9a-zA-Z._-]+[@][0-9a-zA-Z._-]+([.][a-zA-Z]+){1,2}$/ ;
    let userpassword_pattern = /^\S{8,}$/ ;

    let easypassword_pattern = /^[0-9]+$|^[a-zA-z]+$/ ;

    if(!username_pattern.test(username))
    {
        $("#inf").html("") ;
        let tmp = username.replace(/\s+/g,"") ;
        if(tmp == "")
            $("#inf").html("*Please input the username.") ;
        else if(username)
            $("#inf").html("*Just numbers, letters, '.'and '_' are allowed in username.") ;
        else
            $("#inf").html("") ;
    }
    else if (!useremail_pattern.test(useremail))
    {
        $("#inf").html("") ;
        let tmp = useremail.replace(/\s+/g,"") ;

        if(tmp == "")
            $("#inf").html("*Please input the email.") ;
        else if(useremail)
            $("#inf").html("*Email pattern is wrong.") ;
        else
            $("#inf").html("") ;
    }
    else if (!userpassword_pattern.test(userpassword))
    {
        let tmp = userpassword.replace(/\s+/g,"") ;
        if(tmp == "")
            $("#inf").html("*Please set the password.") ;
        else
            $("#inf").html("*The password should be more than 8 characters.") ;
    }
    else if(easypassword_pattern.test(userpassword))
    {
        $("#inf").html("*At least 1 letter and 1 number should be included in the password.") ;
    }
    else if (userpassword != confirmpassword)
    {
        $("#inf").html("*Two inputs of the password are not equal.") ;
    }
    else
    {
        let salt = randomString(12) ;
        let beforepass = userpassword + salt ;
        let hashpass = hex_md5(beforepass) ;


        $.ajax({
            url: '../php/register.php' ,
            type: 'POST',
            data:{
                User:username,
                Email:useremail,
                Password:hashpass,
                Salt:salt,
            },
            success:function(data){

                if(data == "success")
                {
                    $("#inf").html("Sign up successfully, you will jump to the login page after 5s.") ;
                    $("#inf").css("color","green") ;
                    $("#jumpnow").html("Jump now") ;
                    setTimeout(jumptologin,5000) ;
                }
                else if(data == "failname")
                {
                    $("#inf").html("The username is occupied, please change one.") ;
                }
                else if(data == "failemail")
                {
                    $("#inf").html("The email is occupied, please change one.") ;
                }
            },
            error:function(err){
                alert("error!") ;
            }
        });
    }
    return false ;
    // let tmp = compileStr(account) ;
    // // alert(login) ;
    // window.location.href = "./src/html/index.html?" +"user="+ encodeURI(tmp); ;
}

function jumptologin() {
    window.location.href = "../html/login.html" ;
}

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++)
    {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
