let userdiv = $("#userlist") ;
let userhtml = userdiv.html() ;
let img1 = $("#mainimg1") ;
let img2 = $("#mainimg2") ;
let img3 = $("#mainimg3") ;
let img4 = $("#mainimg4") ;
let img5 = $("#mainimg5") ;
let img6 = $("#mainimg6") ;
let img7 = $("#mainimg7") ;
let img8 = $("#mainimg8") ;

let t1 = $("#title1") ;
let t2 = $("#title2") ;
let t3 = $("#title3") ;
let t4 = $("#title4") ;
let t5 = $("#title5") ;
let t6 = $("#title6") ;
let t7 = $("#title7") ;
let t8 = $("#title8") ;

let d1 = $("#des1") ;
let d2 = $("#des2") ;
let d3 = $("#des3") ;
let d4 = $("#des4") ;
let d5 = $("#des5") ;
let d6 = $("#des6") ;
let d7 = $("#des7") ;
let d8 = $("#des8") ;

window.onload = checklogin ;
getphotopath("hot") ;

function checklogin()
{
    $.ajax({
        url:'src/php/checklogin.php',
        success:function (data) {
            if(data == "success")
            {
                userdiv.css("width","180px") ;
                userdiv.css("display","block") ;
                userdiv.html(userhtml) ;
            }
            else
            {
                let replacehtml = "<a href=\"src/html/login.html\">Login</a>" ;
                userdiv.css("width","60px") ;
                userdiv.css("display","block") ;
                userdiv.html(replacehtml) ;
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
        url:'src/php/deletelogin.php',
        success:function (data) {
            window.location.href = "src/html/login.html" ;
        },
        error:function (err) {
            alert(err) ;
        }
    });
}






function getphotopath(met)
{
    $.ajax({
        //真的坑爹，为什么这个路径是基于html的，我还以为是我php写的有问题
        url:'src/php/homephoto.php',
        type:'POST',
        data:{
            method:met,
        },
        success:function(data){
            // alert(data) ;
            let picinf = data.split("|||")

            let picpatharray = picinf[0].split("&") ;
            let pictitlearray = picinf[1].split("&") ;
            let picdesarray = picinf[2].split("&") ;

            for(let i = 1 ; i <= 8 ; i = i + 1)
            {
                let imgcss = "url('src/images/travel-images/normal/medium/"+picpatharray[i-1]+"')" ;

                // alert(picdesarray[2].length) ;
                switch (i) {
                    case 1:
                        img1.css("background-image",imgcss) ;
                        img1.css("background-repeat","no-repeat") ;
                        img1.css("background-position","center") ;
                        t1.html(pictitlearray[0]) ;
                        d1.html(picdesarray[0]) ;
                        if(!picdesarray[0])
                            d1.html("No description") ;

                        break ;
                    case 2:
                        img2.css("background-image",imgcss) ;
                        img2.css("background-repeat","no-repeat") ;
                        img2.css("background-position","center") ;
                        t2.html(pictitlearray[1]) ;
                        d2.html(picdesarray[1]) ;
                        if(!picdesarray[1])
                            d2.html("No description") ;

                        break ;
                    case 3:
                        img3.css("background-image",imgcss) ;
                        img3.css("background-repeat","no-repeat") ;
                        img3.css("background-position","center") ;
                        t3.html(pictitlearray[2]) ;
                        d3.html(picdesarray[2]) ;
                        if(!picdesarray[2])
                            d3.html("No description") ;

                        break ;
                    case 4:
                        img4.css("background-image",imgcss) ;
                        img4.css("background-repeat","no-repeat") ;
                        img4.css("background-position","center") ;
                        t4.html(pictitlearray[3]) ;
                        d4.html(picdesarray[3]) ;
                        if(!picdesarray[3])
                            d4.html("No description") ;

                        break ;
                    case 5:
                        img5.css("background-image",imgcss) ;
                        img5.css("background-repeat","no-repeat") ;
                        img5.css("background-position","center") ;
                        t5.html(pictitlearray[4]) ;
                        d5.html(picdesarray[4]) ;
                        if(!picdesarray[4])
                            d5.html("No description") ;

                        break ;
                    case 6:
                        img6.css("background-image",imgcss) ;
                        img6.css("background-repeat","no-repeat") ;
                        img6.css("background-position","center") ;
                        t6.html(pictitlearray[5]) ;
                        d6.html(picdesarray[5]) ;
                        if(!picdesarray[5])
                            d6.html("No description") ;

                        break ;
                    case 7:
                        img7.css("background-image",imgcss) ;
                        img7.css("background-repeat","no-repeat") ;
                        img7.css("background-position","center") ;
                        t7.html(pictitlearray[6]) ;
                        d7.html(picdesarray[6]) ;
                        if(!picdesarray[6])
                            d7.html("No description") ;

                        break ;
                    case 8:
                        img8.css("background-image",imgcss) ;
                        img8.css("background-repeat","no-repeat") ;
                        img8.css("background-position","center") ;
                        t8.html(pictitlearray[7]) ;
                        d8.html(picdesarray[7]) ;
                        if(!picdesarray[7])
                            d8.html("No description") ;

                        break ;
                }
            }

        },
        error:function(err) {
            alert("123") ;
            alert(err) ;
        }

    });
}

function jumpdetail(seq) {

    let jumppath ;
    let picpath;
    let tmp;
    let last;
    switch (seq) {
        case 1:
            picpath = img1.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;

        case 2:
            picpath = img2.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;

        case 3:
            picpath = img3.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;

        case 4:
            picpath = img4.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;

        case 5:
            picpath = img5.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;

        case 6:
            picpath = img6.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;

        case 7:
            picpath = img7.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;

        case 8:
            picpath = img8.css("background-image") ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;

            break ;


    }

    let hrefpattern = /\?/ ;
    let jumpto ;
    let nowhref = window.location.href ;
    nowhref = nowhref.replace(/index/,"src/html/details") ;
    if(hrefpattern.test(nowhref))
        jumpto = nowhref + "&pic="+ encodeURI(jumppath);
    else
        jumpto = nowhref + "?pic="+ encodeURI(jumppath);

    window.location.href = jumpto ;


}

