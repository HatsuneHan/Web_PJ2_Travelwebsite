let page = document.getElementById("pagenum") ;

for(let i = 1 ; i <= 4 ; i++)
{
    document.getElementById("funcbutton" + i.toString()).style.display = "none" ;
}

window.onloado = getfavorpicinf() ;


function getfavorpicinf()
{
    $.ajax({
        url:'../php/myfavor.php',
        success:function(data){
            let picinf;
            let pictitlearray;
            let picdesarray;
            let picpatharray;
            let pagenum;
            if(data != "||||||")
            {
                picinf = data.split("|||");
                pictitlearray = picinf[0].split("&") ;
                picdesarray = picinf[1].split("&") ;
                picpatharray = picinf[2].split("&") ;
                pagenum = Math.ceil(picpatharray.length/4) ;

                createpage(pagenum) ;
                refreshnum(pagenum) ;

                let pageid = geturlvalue("page") ;

                if(pageid == undefined)
                    pageid = 1 ;

                for(let i = 1 ; i <= 4 ; i++)
                {
                    let image = document.getElementById("favorimg"+i.toString()) ;
                    let tt = document.getElementById("favortitle"+i.toString()) ;
                    let txt = document.getElementById("favortext" + i.toString()) ;
                    // let bt = document.getElementById("b" + i.toString()) ;
                    let tr = document.getElementById("a" + i.toString()) ;
                    let bdiv = document.getElementById("funcbutton" + i.toString()) ;


                    if((pageid*4+i-4-1)<picpatharray.length)
                    {
                        let imgcss = "url('../images/travel-images/normal/medium/"+picpatharray[pageid*4+i-4-1]+"')" ;

                        image.style.backgroundImage = imgcss ;
                        image.name = picpatharray[pageid*4+i-4-1] ;
                        image.style.backgroundRepeat = "no-repeat" ;
                        image.style.backgroundPosition = "center" ;
                        image.style.display = "block" ;
                        tt.innerHTML = pictitlearray[pageid*4+i-4-1] ;
                        txt.innerHTML = picdesarray[pageid*4+i-4-1] ;

                        txt.style.display = "block" ;

                        bdiv.style.display = "block" ;


                        if(!picdesarray[pageid*4+i-4-1])
                            txt.innerHTML = "No description" ;

                    }
                    else {
                        tr.style.display = "none" ;
                        tt.style.display = "none" ;
                        txt.style.display = "none" ;
                        bdiv.style.display = "none" ;
                    }
                }
            }
            else
            {
                for(let i = 1 ; i <= 4 ; i++) {
                    let tt = document.getElementById("favortitle" + i.toString());
                    let txt = document.getElementById("favortext" + i.toString());
                    // let bt = document.getElementById("b" + i.toString());
                    let tr = document.getElementById("a" + i.toString()) ;

                    let bdiv = document.getElementById("funcbutton" + i.toString()) ;

                    tr.style.display = "none" ;
                    tt.style.display = "none" ;
                    txt.style.display = "none" ;
                    bdiv.style.display = "none" ;
                }

                let frame = document.getElementById("photoframe") ;
                let spaninf = document.createElement("span") ;
                spaninf.innerHTML = "You don't have any favorite photo, see our photos and choose the one you like!" ;
                spaninf.style.color = "red" ;

                frame.appendChild(spaninf) ;



            }




        },
        error:function(err) {
            alert(err)
        }

    });

}

function createpage(num)
{
    const pagebefore = document.createElement("a") ;
    pagebefore.innerText = "<<" ;
    let nowpage = geturlvalue("page") ;
    if(nowpage == undefined)
        nowpage = 1 ;
    let leftpage = Math.max(parseInt(nowpage)-1,1) ;
    pagebefore.href = "favor.html?page="+leftpage.toString() ;
    pagebefore.className = "pagenum2" ;

    page.appendChild(pagebefore) ;

    if(num <= 8)
    {
        for(let i = 1 ; i <= num ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "favor.html?page="+i.toString() ;
            onepage.className = "pagenum" ;
            onepage.id = "p" + i.toString() ;
            page.appendChild(onepage) ;
        }
    }
    else
    {
        for(let i = 1 ; i <= 6 ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "favor.html" ;
            onepage.className = "pagenum" ;
            onepage.id = "p" + i.toString() ;
            page.appendChild(onepage) ;
        }


        const pagecenter = document.createElement("a") ;
        pagecenter.innerText = "..." ;
        pagecenter.href = "favor.html" ;
        pagecenter.className = "pagenum2" ;

        page.appendChild(pagecenter) ;



        for(let i = num-2 ; i <= num ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "favor.html" ;
            onepage.className = "pagenum" ;
            page.appendChild(onepage) ;
        }


    }

    const pageafter = document.createElement("a") ;
    pageafter.innerText = ">>" ;
    let rightpage = Math.min(parseInt(nowpage)+1,num) ;
    pageafter.href = "favor.html?page=" + rightpage.toString() ;
    pageafter.className = "pagenum2" ;

    page.appendChild(pageafter) ;


}

function refreshnum(num) {
    let pageid = geturlvalue("page") ;
    if(pageid == undefined)
        pageid = 1 ;

    for(let i = 1 ; i <= num ; i++)
    {

        let tmp = document.getElementById("p"+i.toString()) ;

        if(pageid == i)
        {
            tmp.style.color = "black" ;
        }
        else
        {
            tmp.style.color = "#08a0ad" ;
        }

    }

}


function deletefavor(picpath) {


    $.ajax({
        url:'../php/deletefavor.php',
        type:'POST',
        data:{
            PATH:picpath,
        },
        success:function (data) {
            location.reload() ;
        },
        error:function (err) {
            alert(err) ;
        }
    })
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



function jumptodetail(picnum)
{
    let path ;
    switch(picnum){
        case 1:

            path = (document.getElementById("favorimg1").name) ;
            window.location.href = "../html/details.html?pic=" + path ;
            break ;
        case 2:
            path = (document.getElementById("favorimg2").name) ;
            window.location.href = "../html/details.html?pic=" + path ;
            break ;
        case 3:
            path = (document.getElementById("favorimg3").name) ;
            window.location.href = "../html/details.html?pic=" + path ;
            break ;
        case 4:
            path = (document.getElementById("favorimg4").name) ;
            window.location.href = "../html/details.html?pic=" + path ;
            break ;
    }
}



var button1 = {
    methods: {
        open() {
            this.$confirm('This action will delete the picture, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg1").name) ;
                let but = document.getElementById("b1") ;
                but.click(deletefavor(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        }
    }
};

var button2 = {
    methods: {
        open() {
            this.$confirm('This action will delete the picture, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg2").name) ;
                let but = document.getElementById("b2") ;
                but.click(deletefavor(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        }
    }
};

var button3 = {
    methods: {
        open() {
            this.$confirm('This action will delete the picture, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg3").name) ;
                let but = document.getElementById("b3") ;
                but.click(deletefavor(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        }
    }
};

var button4 = {
    methods: {
        open() {
            this.$confirm('This action will delete the picture, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg4").name) ;
                let but = document.getElementById("b4") ;
                but.click(deletefavor(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        }
    }
};

var Ctor1 = Vue.extend(button1);
new Ctor1().$mount('#funcbutton1');

var Ctor2 = Vue.extend(button2);
new Ctor2().$mount('#funcbutton2');

var Ctor3 = Vue.extend(button3);
new Ctor3().$mount('#funcbutton3');

var Ctor4 = Vue.extend(button4);
new Ctor4().$mount('#funcbutton4');