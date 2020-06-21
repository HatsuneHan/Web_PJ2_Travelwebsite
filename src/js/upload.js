getselectele(2) ;
function getselectele(num)
{
    let attr ;
    if(num == 2)
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
            //
            // if(num == 2)
            // {
            //     anoption.value = "Country" ;
            //     anoption.innerText = "Country" ;
            //     anoption.className = "option" ;
            //     anoption.selected  = true ;
            //     selectbox.appendChild(anoption) ;
            //
            // }



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
                update(geturlvalue("pic")) ;
                // getCity() ;
            }



        },
        error: function (err) {
            alert("fail");
        }
    });
}
function getCity(changecity) {
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

            if(changecity != "no")
            {
                let citybox = document.getElementById("button3") ;
                let citylen = citybox.options.length ;

                for(let i = 0 ; i < citylen ; i++)
                {
                    if(citybox.options[i].value == changecity)
                    {
                        citybox.options[i].selected = true ;
                    }
                    else
                    {
                        citybox.options[i].selected = false ;
                    }
                }
            }


        },
        error: function (err) {
            alert("fail");
        }
    })
}

function loadpic(path)
{
    let imgsrc = "../images/travel-images/normal/medium/" + path ;
    document.getElementById("scenery").src = imgsrc ;
    document.getElementById("nopic").style.display="none";;
}

function changeupload()
{
    let btn = document.getElementById("pica") ;
    btn.innerHTML = "Modify<input type=\"file\" name=\"file\" id=\"file\" onchange=\"showPreview(this, 'scenery')\" required>" ;
}

if(geturlvalue("mode") && geturlvalue("pic"))
{
    loadpic(geturlvalue("pic")) ;
    changeupload() ;
    modifymode(geturlvalue("pic")) ;
}
else
{
    uploadmode() ;
}

function modifymode(picpath)
{
    let submitbtn = document.getElementById("submit") ;
    let filebox = document.getElementById("file") ;
    filebox.required = false ;
    let Main = {
        methods: {
            open() {
                this.$alert('The title is too long', 'Input Error', {
                    confirmButtonText: 'Confirm',
                })
            }
        }
    };
    let Ctor = Vue.extend(Main);
    new Ctor().$mount('#alert2');
    submitbtn.onclick = function () {
        let titlelen = $("#search").val().length ;
        if(titlelen > 255)
        {
            document.getElementById("alertbutton2").click() ;
        }
        else
        {
            modify(picpath) ;
            event.preventDefault();
            aftersubmit() ;
        }
    }
}

function uploadmode() {
    let form = document.getElementById("form1") ;
    let Main = {
        methods: {
            open() {
                this.$alert('Do you want to upload?', 'Page Confirmation', {
                    confirmButtonText: 'Confirm',
                }).then(() => {
                    aftersubmit() ;
                });
            }
        }
    };
    let Ctor = Vue.extend(Main);
    new Ctor().$mount('#alert');

    let Main2 = {
        methods: {
            open() {
                this.$alert('The title is too long', 'Input Error', {
                    confirmButtonText: 'Confirm',
                })
            }
        }
    };
    let Ctor2 = Vue.extend(Main2);
    new Ctor2().$mount('#alert2');


    form.onsubmit = function () {
        let titlelen = $("#search").val().length ;
        if(titlelen > 255)
        {
            document.getElementById("alertbutton2").click() ;
        }
        else
        {
            document.getElementById("alertbutton").click() ;
        }

    }
}



function modify(picpath)
{
    let title = document.getElementById("search").value ;
    let des = document.getElementById("searcharea").value ;

    let contentsel=document.getElementById("button1");
    let contentindex=contentsel.selectedIndex;
    let content= contentsel.options[contentindex].text;

    let countrysel=document.getElementById("button2");
    let countryindex=countrysel.selectedIndex;
    let country= countrysel.options[countryindex].text;

    let citysel=document.getElementById("button3");
    let cityindex=citysel.selectedIndex;
    let city= citysel.options[cityindex].text;

    // alert(title+"&"+des+"&"+country+"&"+city+"&"+content) ;

    $.ajax({
        url:'../php/modify.php',
        type:'POST',
        data:{
            PATH:picpath,
            TITLE:title,
            DESCRIPTION:des,
            CONTENT:content,
            COUNTRY:country,
            CITY:city,
        },
        success:function(data) {

        },
        error:function(err) {
            alert(err) ;
        }
    })
}

function aftersubmit() {
    window.location.href = "my_photo.html" ;
}

function update(picpath){
    let contentbox = document.getElementById("button1") ;
    let nationbox = document.getElementById("button2") ;
    let titlebox = document.getElementById("search") ;
    let desbox = document.getElementById("searcharea") ;

    $.ajax({
        url:'../php/details.php',
        type:'POST',
        data:{
            PATH:picpath,
        },
        success:function(data) {
            let tmp = data.split("&") ;
            let nation = tmp[1] ;
            let city = tmp[2] ;
            let des = tmp[3] ;
            let content = tmp[4] ;
            let title = tmp[5] ;

            let contentlen = contentbox.options.length ;

            for(let i = 0 ; i < contentlen ; i++)
            {
                if(contentbox.options[i].value == content)
                {
                    contentbox.options[i].selected = true ;
                }
                else
                {
                    contentbox.options[i].selected = false ;
                }
            }

            let nationlen = nationbox.options.length ;

            for(let i = 0 ; i < nationlen ; i++)
            {
                if(nationbox.options[i].value == nation)
                {
                    nationbox.options[i].selected = true ;
                    getCity(city) ;
                }
                else
                {
                    nationbox.options[i].selected = false ;
                }
            }
            titlebox.value = title ;
            desbox.value = des ;


        },
        error:function(err) {

        }
    })
}


