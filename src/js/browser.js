var Main = {
    data() {
        return {
            input: ''
        }
    }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')

let hotcontb = document.getElementById("hotcontent") ;
let hotcountry = document.getElementById("hotcountry") ;
let hotcity = document.getElementById("hotcity") ;

let page = document.getElementById("pagenum") ;

// addtr("testobj",2)

gethotlist() ;

// alert(geturlvalue("attr") == "Filter") ;

function gethotlist()
{
    $.ajax({
        url:'../php/gethotlist.php',
        success:function (data) {
            let hotinf = data.split("|||")

            let contentarray = hotinf[0].split("&") ;
            let countryarray = hotinf[1].split("&") ;
            let cityarray = hotinf[2].split("&") ;

            for(let i = 0 ; i < contentarray.length ; i++)
            {

                addtr(contentarray[i],1) ;
            }

            for(let i = 0 ; i < countryarray.length ; i++)
            {
                addtr(countryarray[i],2) ;
            }

            for(let i = 0 ; i < cityarray.length ; i++)
            {
                addtr(cityarray[i],3) ;
            }

            hotcontb.style.display = "table";
            hotcountry.style.display = "table";
            hotcity.style.display = "table";

            getselectele(1) ;

        },
        error:function (err) {
            alert(err) ;
        },
    })
}

function addtr(trname,addplace)
{
    switch (addplace) {
        case 1:
            hotcontb.appendChild(createtr(trname,addplace)) ;
            break;
        case 2:
            hotcountry.appendChild(createtr(trname,addplace)) ;
            break ;
        case 3:
            hotcity.appendChild(createtr(trname,addplace)) ;
            break ;


    }
}

function createtr(trname,addplace)
{
    let newtr = document.createElement("tr") ;
    newtr.className = "line2" ;
    let newtd = document.createElement("td") ;
    let newa = document.createElement("a") ;

    newa.className = "country" ;
    newa.innerText = trname ;

    let atr ;
    if(addplace == 1)
        atr = "Content" ;
    else if(addplace == 2)
        atr = "Country" ;
    else if(addplace == 3)
        atr = "City" ;

    newa.href = "browser.html?value=" + trname + "&attr=" + atr + "&page=1";

    newtd.appendChild(newa) ;
    newtr.appendChild(newtd) ;

    return newtr ;

}


function getpic(trname,atr)
{
    $.ajax({
        url: '../php/browsersearch.php',
        type: 'POST',
        data: {
            VALUE: trname,
            ATTR: atr,
        },
        success: function (data) {
            let patharray = data.split("&");
            setpic(trname,atr,patharray);

        },
        error: function (err) {
            alert("fail");
        }
    });
}


function setpic(trname,atr,patharray) {
    // for(let i = 0 ; i < patharray.length ; i++)
    let pagenum = Math.ceil(patharray.length/16) ;

    createpage(trname,atr,pagenum) ;

    refreshnum(pagenum) ;

    let pageid = geturlvalue("page") ;
    if(pageid == undefined)
        pageid = 1 ;

    for(let i = 1 ; i <= 16 ; i++)
    {
        // alert("showimg"+i.toString()) ;
        let thepic = document.getElementById("showimg"+i.toString()) ;
        let thea = document.getElementById("a"+i.toString()) ;
        // alert(patharray[pageid*16+i-16-1]) ;
        let pathpattern = /jpg$/ ;
        if(pageid*16+i-16-1 < patharray.length)
        {
            if(pathpattern.test(patharray[pageid*16+i-16-1]))
            {
                let imgcss = "url('../images/travel-images/normal/medium/"+patharray[pageid*16+i-16-1]+"')" ;

                // alert(encodeURI(imgcss)) ;

                thepic.style.backgroundImage = imgcss ;
                // alert(imgcss) ;
                thepic.name = patharray[pageid*16+i-16-1] ;
                thepic.style.backgroundRepeat = "no-repeat" ;
                thepic.style.backgroundPosition = "center" ;
                thepic.style.display = "block" ;
            }
            else
            {
                thepic.style.display = "none" ;
                thea.style.display = "none" ;
            }
        }
        else
        {
            thepic.style.display = "none" ;
            thea.style.display = "none" ;
        }
    }

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

function createpage(search,value,num)
{
    page.innerHTML = "" ;
    const pagebefore = document.createElement("a") ;
    pagebefore.innerText = "<<" ;
    let nowpage = geturlvalue("page") ;
    if(nowpage == undefined)
        nowpage = 1 ;
    let leftpage = Math.max(parseInt(nowpage)-1,1) ;
    pagebefore.href = "browser.html?value="+search+"&attr="+value+"&page="+leftpage.toString() ;
    pagebefore.className = "pagenum2" ;

    page.appendChild(pagebefore) ;

    if(num <= 8)
    {
        for(let i = 1 ; i <= num ; i = i + 1 )
        {
            let onepage = document.createElement("a") ;
            onepage.innerText = i.toString() ;
            onepage.href = "browser.html?value="+search+"&attr="+value+"&page="+i.toString() ;
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
            onepage.href = "browser.html?value="+search+"&attr="+value+"&page="+i.toString() ;
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
            onepage.href = "browser.html?value="+search+"&attr="+value+"&page="+i.toString() ;
            onepage.className = "pagenum" ;
            page.appendChild(onepage) ;
        }


    }

    const pageafter = document.createElement("a") ;
    pageafter.innerText = ">>" ;
    let rightpage = Math.min(parseInt(nowpage)+1,num) ;
    pageafter.href = "browser.html?value="+search+"&attr="+value+"&page="+rightpage.toString() ;
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


function jumpdetail(seq) {

    let jumppath ;
    let picpath;
    let tmp;
    let last;

    for(let i = 1 ; i <= 16 ; i++)
    {
        if(i==seq)
        {
            picpath = document.getElementById("showimg"+i.toString()).style.backgroundImage ;
            tmp = picpath.split('/') ;
            last = tmp[tmp.length-1] ;
            jumppath = last.replace(/"\)$/,"") ;
            let jumpto = "details.html?pic=" + encodeURI(jumppath);
            window.location.href = jumpto ;
        }
    }
}

function searchbytitle()
{
    let value = $("#titleinput").val() ;
    let manner = "Title" ;

    window.location.href = 'browser.html?value=' + value + "&attr=" + manner + "&page=1" ;

}


function getselectele(num)
{
    let attr ;
    if(num == 1)
        attr = "Content" ;
    else if(num == 2)
        attr = "Country" ;

    $.ajax({
        url: '../php/getselectele.php',
        type: 'POST',
        data: {
            ATTR: attr,
        },
        success: function (data) {
            let elearray = data.split("&");
            let selectbox = document.getElementById("button"+num.toString()) ;

            let anoption = document.createElement("option") ;


            let opvalue = geturlvalue("value") ;



            let tmp ;
            let flag = 0 ;

            let testpattern = /\+/ ;

            if(opvalue != undefined && testpattern.test(opvalue))
            {
                tmp = opvalue.split("+") ;
                flag = 1 ;
            }

            if(num == 1)
            {
                anoption.value = "Content" ;
                anoption.innerText = "Content" ;
                anoption.className = "option" ;

            }
            else if(num == 2)
            {
                anoption.value = "Country" ;
                anoption.innerText = "Country" ;
                anoption.className = "option" ;


            }

            selectbox.appendChild(anoption) ;

            for(let i = 0 ; i < elearray.length ; i++)
            {
                anoption = document.createElement("option") ;
                anoption.value = elearray[i] ;
                anoption.innerText = elearray[i] ;
                anoption.className = "option" ;

                if(flag == 1)
                {

                    let tmpvalue = anoption.value.replace(/^\s+/g,"");
                    tmpvalue = tmpvalue.replace(/^\n+/g,"") ;

                    if(encodeURI(tmpvalue) == tmp[0])
                        anoption.selected = true ;
                    if (encodeURI(tmpvalue) == tmp[1])
                        anoption.selected = true ;
                }


                selectbox.appendChild(anoption) ;
            }

            if(num == 1)
            {
                getselectele(2) ;
            }
            else
            {
                getCity() ;
            }



        },
        error: function (err) {
            alert("fail");
        }
    });
}

function getCity() {
    let sltcountry = document.getElementById("button2") ;
    let sltcity    = document.getElementById("button3") ;
    sltcity.innerHTML = "" ;

    // alert(sltcountry.value) ;
    $.ajax({
        url: '../php/getselectele.php',
        type: 'POST',
        data: {
            ATTR: "City",
            NOW: sltcountry.value,
        },
        success: function (data) {
            let elearray = data.split("&");
            let tmp =elearray[0].replace(/\s+/g,"");
            let tmp2 = tmp.replace(/\n+/g,"") ;
            elearray[0] = tmp2 ;
            // let tmp =elearray[0].replace(/\s+/g,"");

            let anoption = document.createElement("option") ;

            let opvalue = geturlvalue("value") ;
            let tmpcity ;
            let flag = 0 ;

            let testpattern = /\+/ ;

            if(opvalue != undefined && testpattern.test(opvalue))
            {
                tmpcity = opvalue.split("+") ;
                flag = 1 ;
            }


            anoption.value = "City" ;
            anoption.innerText = "City" ;
            anoption.className = "option" ;

            sltcity.appendChild(anoption) ;

            if(tmp != "")
            {
                for(let i = 0 ; i < elearray.length ; i++)
                {
                    anoption = document.createElement("option") ;
                    anoption.value = elearray[i] ;
                    anoption.innerText = elearray[i] ;
                    anoption.className = "option" ;

                    if(flag == 1)
                    {

                        let tmpvalue = anoption.value.replace(/^\s+/g,"");
                        tmpvalue = tmpvalue.replace(/^\n+/g,"") ;
                        // alert(tmpcity[2]) ;

                        if(encodeURI(tmpvalue) == tmpcity[2])
                            anoption.selected = true ;

                    }



                    sltcity.appendChild(anoption) ;
                }

            }

            if(geturlvalue("attr") == "Filter")
            {
                filterpic(decodeURI(geturlvalue("value"))) ;
            }

            else if(geturlvalue("page"))
            {
                getpic(decodeURI(geturlvalue("value")),decodeURI(geturlvalue("attr"))) ;
            }
            else
            {
                getpic(null,"ALL") ;
            }



        },
        error: function (err) {
            alert("fail");
        }
    })
}

function filterpic(trname)
{

    let tmp = trname.split("+") ;

    $.ajax({
        url: '../php/filter.php',
        type: 'POST',
        data: {
            Content: tmp[0],
            Country: tmp[1],
            City: tmp[2],
        },
        success: function (data) {
            let patharray = data.split("&");
            let tmp = patharray[0].replace(/\s+/g,"");
            let tmp2 = tmp.replace(/\n+/g,"") ;
            patharray[0] = tmp2 ;
            setpic(trname,"Filter",patharray);

        },
        error: function (err) {
            alert(err);
        }
    });
}

function clickfilter()
{
    let b1 = document.getElementById("button1") ;
    let b2 = document.getElementById("button2") ;
    let b3 = document.getElementById("button3") ;

    let value = b1.value + "+" + b2.value + "+" + b3.value ;

    window.location.href = "browser.html?value=" + value + "&attr=Filter&page=1" ;
}

var SELE = {
    data() {
        return {
            select: ''
        }
    }
};
var Ct = Vue.extend(SELE) ;
new Ct().$mount('#selectcontent') ;




