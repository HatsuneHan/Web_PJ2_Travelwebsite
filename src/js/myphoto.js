let page = document.getElementById("pagenum") ;

for(let i = 1 ; i <= 4 ; i++)
{
    document.getElementById("funcbutton" + i.toString()).style.display = "none" ;
}

getmypicinf() ;


function getmypicinf()
{
    $.ajax({
        url:'../php/myphoto.php',
        success:function(data){
            // alert(data) ;
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
                    let bdiv = document.getElementById("funcbutton" + i.toString()) ;
                    let tr = document.getElementById("a" + i.toString()) ;


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
                        tt.style.display = "none" ;
                        txt.style.display = "none" ;
                        bdiv.style.display = "none" ;
                        tr.style.display = "none" ;

                    }
                }
            }
            else
            {
                for(let i = 1 ; i <= 4 ; i++) {
                    let tt = document.getElementById("favortitle" + i.toString());
                    let txt = document.getElementById("favortext" + i.toString());
                    let bdiv = document.getElementById("funcbutton" + i.toString()) ;
                    let tr = document.getElementById("a" + i.toString()) ;
                    tt.style.display = "none" ;
                    txt.style.display = "none" ;
                    bdiv.style.display = "none" ;
                    tr.style.display = "none" ;

                }

                let frame = document.getElementById("photoframe") ;
                let spaninf = document.createElement("span") ;
                spaninf.innerHTML = "You haven't uploaded any photo, please click 'Upload' in usercentre and add your own photo!" ;
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
    pagebefore.href = "my_photo.html?page="+leftpage.toString() ;
    pagebefore.className = "pagenum2" ;

    page.appendChild(pagebefore) ;

    if(num <= 8)
    {
        for(let i = 1 ; i <= num ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "my_photo.html?page="+i.toString() ;
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
            onepage.href = "my_photo.html?page="+i.toString() ;
            onepage.className = "pagenum" ;
            onepage.id = "p" + i.toString() ;
            page.appendChild(onepage) ;
        }


        const pagecenter = document.createElement("a") ;
        pagecenter.innerText = "..." ;
        pagecenter.href = "#" ;
        pagecenter.className = "pagenum2" ;

        page.appendChild(pagecenter) ;



        for(let i = num-2 ; i <= num ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "my_photo.html?page="+i.toString() ;
            onepage.className = "pagenum" ;
            page.appendChild(onepage) ;
        }


    }

    const pageafter = document.createElement("a") ;
    pageafter.innerText = ">>" ;
    let rightpage = Math.min(parseInt(nowpage)+1,num) ;
    pageafter.href = "my_photo.html?page=" + rightpage.toString() ;
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

function deletemy(picpath) {


    $.ajax({
        url:'../php/deletemy.php',
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
            this.$confirm('This action will delete the picture forever, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg1").name) ;
                let but = document.getElementById("b1") ;
                but.click(deletemy(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        },

        modify(){
            this.$confirm('Do you want to go to the modify page?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg1").name) ;
                window.location.href = 'upload.html?mode=modify&pic='+path ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Modification cancelled'
                });
            });
        }
    }
};

var button2 = {
    methods: {
        open() {
            this.$confirm('This action will delete the picture forever, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg2").name) ;
                let but = document.getElementById("b2") ;
                but.click(deletemy(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        },

        modify(){
            this.$confirm('Do you want to go to the modify page?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg2").name) ;
                window.location.href = 'upload.html?mode=modify&pic='+path ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Modification cancelled'
                });
            });
        }
    }
};

var button3 = {
    methods: {
        open() {
            this.$confirm('This action will delete the picture forever, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg3").name) ;
                let but = document.getElementById("b3") ;
                but.click(deletemy(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        },

        modify(){
            this.$confirm('Do you want to go to the modify page?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg3").name) ;
                window.location.href = 'upload.html?mode=modify&pic='+path ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Modification cancelled'
                });
            });
        }
    }
};

var button4 = {
    methods: {
        open() {
            this.$confirm('This action will delete the picture forever, are you sure?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg4").name) ;
                let but = document.getElementById("b4") ;
                but.click(deletemy(path)) ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Deletion cancelled'
                });
            });
        },

        modify(){
            this.$confirm('Do you want to go to the modify page?', 'Info', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let path = (document.getElementById("favorimg4").name) ;
                window.location.href = 'upload.html?mode=modify&pic='+path ;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Modification cancelled'
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
