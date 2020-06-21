let img1 = $("#favorimg") ;


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

function loadpic(picpath)
{
    let imgcss = "url('../images/travel-images/normal/medium/"+picpath+"')" ;
    img1.css("background-image",imgcss) ;
    img1.css("background-repeat","no-repeat") ;
    img1.css("background-position","center") ;

    detailsinf(picpath) ;
}


loadpic(geturlvalue("pic")) ;

function detailsinf(picpath)
{
    $.ajax({
        url:'../php/details.php',
        data:{
            PATH:picpath,
        },
        type:'POST',
        success:function(data){
            let tmp = data.split("&") ;
            let likenumber = tmp[0] ;
            let nation = tmp[1] ;
            let city = tmp[2] ;
            let des = tmp[3] ;
            let content = tmp[4] ;
            let title = tmp[5] ;
            // alert(des) ;
            if(des)
                $("#pictext").html(des) ;
            else
                $("#pictext").html("No description.") ;

            $("#fn").html(likenumber) ;
            $("#content1").html("Content:&nbsp"+content) ;
            $("#content2").html("Country:&nbsp"+nation) ;
            $("#content3").html("City:&nbsp"+city) ;
            $("#title").html(title) ;
        },
        error:function (err) {
            alert(err) ;
        }
    })
}

function favor(picpath)
{
    $.ajax({
        url:'../php/favor.php',
        data:{
            PATH:picpath,
        },
        type:'POST',
        success:function(data){
            if(data == "notlogin")
            {
                var Main = {
                    methods: {
                        open() {
                            this.$alert('Please login at first', 'Page Error', {
                                confirmButtonText: 'Confirm',
                            }).then(() => {
                                window.location.href = "../html/login.html";
                            });
                        }
                    }
                };
                var Ctor = Vue.extend(Main);
                new Ctor().$mount('#alert');
                document.getElementById("alertbutton").click() ;
            }
            else
                loadpic(picpath) ;
        },

    })
}



