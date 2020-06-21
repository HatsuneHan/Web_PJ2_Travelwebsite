
let page = document.getElementById("pagenum") ;

if(geturlvalue("attr") != null && geturlvalue("value") != null)
{
    if(geturlvalue("attr") == "title")
    {
        $("#fbt").attr("checked",true);
        $("#search").val(decodeURI(geturlvalue("value"))) ;
    }
    else
    {
        $("#fdt").attr("checked",true);
        $("#searcharea").val(decodeURI(geturlvalue("value"))) ;
    }

     conductsearch() ;
}

document.getElementById("a1").style.display = "none" ;
document.getElementById("a2").style.display = "none" ;
document.getElementById("a3").style.display = "none" ;
document.getElementById("a4").style.display = "none" ;




function filter()
{
    let val = $('input[name="FilterbyTitle"]:checked').val() ;
    let attr ;
    let value ;

    if(val == "fbt")
    {
        attr = "title" ;
        value = $("#search").val() ;
    }
    else if(val == "fbd")
    {
        attr = "description" ;
        value = $("#searcharea").val() ;
    }

    window.location.href = "search.html?attr=" + attr + "&value=" + value + "&page=1" ;
}





function conductsearch()
{
    let val = $('input[name="FilterbyTitle"]:checked').val() ;
    let attr ;
    let value ;

    if(val == "fbt")
    {
        attr = "title" ;
        value = $("#search").val() ;
    }
    else if(val == "fbd")
    {
        attr = "description" ;
        value = $("#searcharea").val() ;
    }

    $.ajax({
        url:'../php/search.php',
        type:'POST',
        data:{
            ATTR:attr,
            VALUE:value,
        },
        success:function(data){
            laypic(data) ;
        },
        error:function (err){
        }
    })

}


function laypic(data)
{
    let picinf;
    let pictitlearray;
    let picdesarray;
    let picpatharray;
    let pagenum;

    if(data != "||||||")
    {
        picinf = data.split("|||");
        picpatharray = picinf[0].split("&") ;
        pictitlearray = picinf[1].split("&") ;
        picdesarray = picinf[2].split("&") ;
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
                tr.style.display = "inline-block" ;
                if(!picdesarray[pageid*4+i-4-1])
                    txt.innerHTML = "No description" ;

            }
            else {
                tr.style.display = "none" ;
                tt.style.display = "none" ;
                txt.style.display = "none" ;
            }
        }
    }
    else
    {
        for(let i = 1 ; i <= 4 ; i++) {
            let tt = document.getElementById("favortitle" + i.toString());
            let txt = document.getElementById("favortext" + i.toString());
            let tr = document.getElementById("a" + i.toString()) ;

            tr.style.display = "none" ;
            tt.style.display = "none" ;
            txt.style.display = "none" ;
        }

    }
}



function createpage(num)
{
    let val = $('input[name="FilterbyTitle"]:checked').val() ;
    let attr ;
    let value ;

    if(val == "fbt")
    {
        attr = "title" ;
        value = $("#search").val() ;
    }
    else if(val == "fbd")
    {
        attr = "description" ;
        value = $("#searcharea").val() ;
    }



    document.getElementById("pagenum").innerHTML = "" ;
    const pagebefore = document.createElement("a") ;
    pagebefore.innerText = "<<" ;
    let nowpage = geturlvalue("page") ;
    if(nowpage == undefined)
        nowpage = 1 ;
    let leftpage = Math.max(parseInt(nowpage)-1,1) ;
    pagebefore.href = "search.html?attr=" + attr + "&value=" + value + "&page=" + leftpage.toString() ;
    pagebefore.className = "pagenum2" ;

    page.appendChild(pagebefore) ;

    if(num <= 8)
    {
        for(let i = 1 ; i <= num ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "search.html?attr=" + attr + "&value=" + value + "&page=" + i.toString() ;
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
            onepage.href = "search.html?attr=" + attr + "&value=" + value + "&page=" + i.toString() ;
            onepage.className = "pagenum" ;
            onepage.id = "p" + i.toString() ;
            page.appendChild(onepage) ;
        }


        const pagecenter = document.createElement("a") ;
        pagecenter.innerText = "..." ;
        pagecenter.href = "search.html?attr=" + attr + "&value=" + value + "&page=undefined" ;
        pagecenter.className = "pagenum2" ;

        page.appendChild(pagecenter) ;



        for(let i = num-2 ; i <= num ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "search.html?attr=" + attr + "&value=" + value + "&page=" + i.toString() ;
            onepage.className = "pagenum" ;
            page.appendChild(onepage) ;
        }


    }

    const pageafter = document.createElement("a") ;
    pageafter.innerText = ">>" ;
    let rightpage = Math.min(parseInt(nowpage)+1,num) ;
    pageafter.href = "search.html?attr=" + attr + "&value=" + value + "&page=" + rightpage.toString() ;
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

// conductsearch()