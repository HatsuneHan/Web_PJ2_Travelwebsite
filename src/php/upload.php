<?php

define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$city=$_POST['city'];
$country=$_POST['country'];
$content=$_POST['content'];
$title=$_POST['titletext'];
$description=$_POST['destext'];
//echo $select_value ;


function random($length, $chars = '0123456789')
{
    $hash = '';
    $max = strlen($chars) - 1;
    for($i = 0; $i < $length; $i++) {
        $hash .= $chars[mt_rand(0, $max)];
    }
    return $hash;
}

function checkname($picpath)
{
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE PATH = :picpath ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    if($path = $query->fetchColumn())
    {
        $pdo = null ;
        return true ;
    }
    else
    {
        $pdo = null ;
        return false ;
    }


}


function insertpic($path,$title,$description,$content,$country,$city)
{
    session_start() ;
    $nowuser = $_SESSION['Username'] ;


    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($country == "Country")
    {
        $countryiso = null ;
    }
    else
    {
        $querycountry = $pdo->prepare("SELECT ISO FROM geocountries WHERE CountryName = :country ;");
        $querycountry->bindValue(':country',$country) ;
        $querycountry->execute() ;
        $countryiso = $querycountry->fetchColumn() ;
    }


    if($city == "City")
    {
        $cityiso = null ;
    }
    else
    {
        $querycity = $pdo->prepare("SELECT GeoNameID FROM geocities WHERE AsciiName = :city ;");
        $querycity->bindValue(':city',$city) ;
        $querycity->execute() ;
        $cityiso = $querycity->fetchColumn() ;
    }

    $queryuser = $pdo->prepare("SELECT UID FROM traveluser WHERE UserName = :user OR Email = :user ;");
    $queryuser->bindValue(':user',$nowuser) ;
    $queryuser->execute() ;
    $userid = $queryuser->fetchColumn() ;

    $querymax = $pdo->prepare("SELECT ImageID FROM travelimage ORDER BY ImageID DESC LIMIT 1");
    $querymax->bindValue(':user',$nowuser) ;
    $querymax->execute() ;
    $maxid = $querymax->fetchColumn() ;
    $imageid = $maxid + 1 ;

//    echo $userid . "<br/>" ;
//    echo $title . "<br/>" ;
//    echo $description . "<br/>" ;
//    echo $city. "<br/>" ;
//    echo $country . "<br/>" ;
//    echo $path . "<br/>" ;
//    echo $content . "<br/>" ;
//    echo $imageid . "<br/>" ;

    $insertsql = $pdo->prepare("INSERT INTO travelimage VALUES (:imageid,:title,:description,NULL,NULL,:cityiso,:countryiso,:theuser,:path,:content) ;");
    $insertsql->bindValue(':theuser',$userid) ;
    $insertsql->bindValue(':title',$title) ;
    $insertsql->bindValue(':description',$description) ;
    $insertsql->bindValue(':cityiso',$cityiso) ;
    $insertsql->bindValue(':countryiso',$countryiso) ;
    $insertsql->bindValue(':path',$path) ;
    $insertsql->bindValue(':content',$content) ;
    $insertsql->bindValue(':imageid',$imageid) ;
    $insertsql->execute() ;

    $pdo = null ;

}


$localname = random(10, '1234567890abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');

if ((($_FILES["file"]["type"] == "image/gif")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/pjpeg")
        || ($_FILES["file"]["type"] == "image/jpg")
        || ($_FILES["file"]["type"] == "image/png"))
    )
{
    if(($_FILES["file"]["size"] < 83886080))
    {
        if ($_FILES["file"]["error"] > 0)
        {
            echo "Error: " . $_FILES["file"]["error"] . "<br />";
        }
        else
        {
//            echo "Upload: " . $_FILES["file"]["name"] . "<br />";
//            echo "Type: " . $_FILES["file"]["type"] . "<br />";
//            echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
//            echo "Stored in: " . $_FILES["file"]["tmp_name"] . "<br />" ;

            $arr = explode(".",$_FILES["file"]["name"]);
            $len = count($arr) ;

            $picpath = $localname . "." . $arr[$len-1] ;

            while(checkname($picpath))
            {
                $localname = random(10, '1234567890abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
                $picpath = $localname . "." . $arr[$len-1] ;
            }

            move_uploaded_file($_FILES["file"]["tmp_name"],
                "src/images/travel-images/normal/medium/" . $picpath);

            insertpic($picpath,$title,$description,$content,$country,$city);

        }
    }
    else
    {
        echo "The picture should be no more than 10MB" ;
    }
}
else
{
    echo "Invalid file, just pictures are allowed";
}




?>