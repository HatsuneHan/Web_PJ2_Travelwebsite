
<?php

$attr = $_POST['ATTR'] ;
if(isset($_POST['NOW']))
    $nowcountry = $_POST['NOW'] ;

define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');


try{
    $resultarray = array() ;

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($attr == "Content"):
        $query = $pdo->prepare("SELECT DISTINCT Content FROM travelimage ORDER BY Content ;") ;
        $query->execute() ;

        while($row = $query -> fetch()):
            array_push($resultarray,$row['Content']) ;
        endwhile;
    elseif($attr == "Country"):
        $query = $pdo->prepare("SELECT DISTINCT CountryName FROM geocountries ORDER BY CountryName;") ;
        $query->execute() ;

        while($row = $query -> fetch()):
            array_push($resultarray,$row['CountryName']) ;
        endwhile;
    elseif($attr == "City"):
        $query = $pdo->prepare("SELECT DISTINCT AsciiName FROM geocities WHERE CountryCodeISO IN (SELECT a.ISO FROM(SELECT ISO FROM geocountries WHERE CountryName = :nowcountry AND ISO IS NOT NULL) As a) ORDER BY AsciiName;") ;
        $query->bindValue(":nowcountry",$nowcountry);
        $query->execute() ;

        while($row = $query -> fetch()):
            array_push($resultarray,$row['AsciiName']) ;
        endwhile;
    endif;

    $pdo = null ;


    $num = 0 ;
    foreach ($resultarray as $number):
        if($num == 0)
            echo $number ;
        else
            echo "&" . $number ;
        $num = $num + 1 ;
    endforeach;

//    echo  sizeof($resultarray) ;


}catch (PDOException $e){
    die( $e -> getMessage() );
}


//
