window.onload = checklogin ;




let userdiv = $("#userlist") ;
let userhtml = userdiv.html() ;



let gotohtml ;

function checklogin()
{
    $.ajax({
        url:'../php/checklogin.php',
        success:function (data) {
            // alert(data) ;
            if(data == "success")
            {
                userdiv.css("width","180px") ;
                userdiv.css("display","block") ;
                userdiv.html(userhtml) ;
            }
            else
            {
                let place = window.location.href ;
                let tmp = place.split("/") ;
                let placepattern = /.html/;
                let goto ;

                for(let i = 0 ; i < tmp.length ; i++)
                {
                    if(placepattern.test(tmp[i]))
                    {
                        let tmp2 = tmp[i].split(".html") ;
                        goto = tmp2[0] ;
                        // alert(goto) ;
                        break ;
                    }
                }

                if(goto == "details")
                    gotohtml = "../html/login.html?before="+goto + "&pic=" + geturlvalue("pic") ;
                else
                    gotohtml = "../html/login.html?before="+goto;

                if(goto == "my_photo" || goto == "favor" || goto == "upload")
                {
                    var Main = {
                        methods: {
                            open() {
                                this.$alert('Please login at first', 'Page Error', {
                                    confirmButtonText: 'Confirm',
                                }).then(() => {
                                    let place = window.location.href ;
                                    let tmp = place.split("/") ;
                                    let placepattern = /.html/;
                                    let goto ;

                                    for(let i = 0 ; i < tmp.length ; i++)
                                    {
                                        if(placepattern.test(tmp[i]))
                                        {
                                            let tmp2 = tmp[i].split(".html") ;
                                            goto = tmp2[0] ;
                                            // alert(goto) ;
                                            break ;
                                        }
                                    }
                                    window.location.href = "../html/login.html?before="+goto ;
                                });
                            }
                        }
                    };
                    var Ctor = Vue.extend(Main);
                    new Ctor().$mount('#alert');
                    document.getElementById("alertbutton").click() ;
                }
                else
                {
                    let replacehtml = "<a href=\"javascript:\" onclick = loginjump()>Login</a>" ;
                    userdiv.css("width","60px") ;
                    userdiv.css("display","block") ;
                    userdiv.html(replacehtml) ;
                }
            }
        },
        error:function (err) {
            alert(err) ;
        }
    });

}

function deletelogin()
{
    $.ajax({
        url:'../php/deletelogin.php',
        success:function (data) {
            window.location.href = "../html/login.html" ;
        },
        error:function (err) {
            alert(err) ;
        }
    });
}

function loginjump() {
    window.location.href = gotohtml ;
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