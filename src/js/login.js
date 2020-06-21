
function getsalt()
{
    let username = $("#theusername").val() ;
    let password = $("#theuserpassword").val() ;

    $.ajax({
        url:'../php/hashsalt.php',
        type:'POST',
        data:{
          USERNAME:username ,
        },
        success:function(data){

            let finalpassword = password + data ;
            let hashpassword = hex_md5(finalpassword) ;

            checkpassword(username,hashpassword) ;
        },
        error:function (err) {
            alert(err) ;
        }
    });

}


// function changetohashsalt()
// {
//     let salt = randomString(12) ;
//     document.write(salt) ;
//     document.write("<br/>");
//     let hashpassword = "abcd1234" + salt ;
//     document.write(hex_md5(hashpassword)) ;
//
// }
//
// for(let i = 1 ; i <= 25 ; i++)
// {
//     document.write("<br/>"+i+":"+"<br/>") ;
//     changetohashsalt() ;
// }









function checkpassword(acc,pass)
{
    $.ajax({
        url:'../php/login.php' ,
        type:'POST',
        data:{
            account:acc,
            password:pass,
        },
        success:function(data){
            if(data == "bad")
            {
                $("#inf").html("*Invalid account or password.") ;
            }
            else if(data == "good")
            {
                $("#inf").html("") ;
                let goto = geturlvalue("before") ;
                let picnum = geturlvalue("pic") ;
                if(goto != null && goto != "details")
                    window.location.href = "../html/"+goto+".html" ;
                else if(goto == "details")
                    window.location.href = "../html/"+goto+".html?pic=" + picnum ;
                else
                    window.location.href = "../../index.html" ;
            }

        },
        error:function(err){
            alert("error!") ;
        }
    });

    return false ;
}



function geturlvalue(searchvalue){
    let loc = location.href;
    let tmp = loc.split("?") ;
    let urlsearch = tmp[1] ;
    let urlans ;
    try{
        let urlpara = urlsearch.split("&") ;
        for( var i = 0 ; i < urlpara.length ; i++) {
            var pair = urlpara[i].split("=");
            if (pair[0] == searchvalue) {
                urlans = pair[1];
                break;
            } else {
                urlans = undefined;
            }
        }
    }catch(err){
        urlans = undefined;
    }
    return urlans ;
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

