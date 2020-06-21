<?php

$attr = $_POST['ATTR'] ;
$value = $_POST['VALUE'] ;

define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');


if($attr == "ALL"):
    try{
        $resultarray = array() ;

        $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
        $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE PATH IS NOT NULL AND UID != 0") ;
        $query->execute() ;

        while($row = $query -> fetch()):
            array_push($resultarray,$row['PATH']) ;
        endwhile;

        $num = 0 ;
        foreach ($resultarray as $number):
            if($num == 0)
                echo $number ;
            else
                echo "&" . $number ;
            $num = $num + 1 ;
        endforeach;

//    echo  sizeof($resultarray) ;
        $pdo = null ;

    }catch (PDOException $e){
        die( $e -> getMessage() );
    }
else:
    try{
        $resultarray = array() ;


        $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
        $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if($attr == "Content"):

            $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE Content = :value AND PATH IS NOT NULL AND UID != 0") ;
            $query->bindValue(":value",$value) ;
            $query->execute() ;

            while($row = $query -> fetch()):
                array_push($resultarray,$row['PATH']) ;
            endwhile;


        elseif($attr == "City"):

            $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE CityCode IN (SELECT GeoNameID FROM geocities WHERE AsciiName = :value) AND PATH IS NOT NULL AND UID != 0") ;
            $query->bindValue(":value",$value) ;
            $query->execute() ;

            while($row = $query -> fetch()):
                array_push($resultarray,$row['PATH']) ;
            endwhile;



        elseif($attr == "Country"):

            $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :value) AND PATH IS NOT NULL AND UID != 0") ;
            $query->bindValue(":value",$value) ;
            $query->execute() ;

            while($row = $query -> fetch()):
                array_push($resultarray,$row['PATH']) ;
            endwhile;


        elseif($attr == "Title"):
            $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE Title LIKE :value AND UID != 0") ;
            $title = "%" . $value . "%" ;
            $query->bindValue(":value",$title) ;
            $query->execute() ;

            while($row = $query -> fetch()):
                array_push($resultarray,$row['PATH']) ;
            endwhile;

        endif ;

        $num = 0 ;
        foreach ($resultarray as $number):
            if($num == 0)
                echo $number ;
            else
                echo "&" . $number ;
            $num = $num + 1 ;
        endforeach;

//    echo  sizeof($resultarray) ;
        $pdo = null ;

    }catch (PDOException $e){
        die( $e -> getMessage() );
    }
endif;


// SELECT PATH FROM travelimage WHERE CityCode IN (SELECT GeoNameID FROM geocities WHERE AsciiName = :value)
// SELECT PATH FROM travelimage WHERE CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :value)

// SELECT PATH FROM travelimage WHERE Title LIKE '%children%' ;
