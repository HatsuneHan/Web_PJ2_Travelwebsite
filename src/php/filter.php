
<?php

$content = $_POST['Content'] ;
$country = $_POST['Country'] ;
$city = $_POST['City'] ;

define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');


try{
    $resultarray = array() ;

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($content == "Content"):
        if($country == "Country"):
            $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE PATH IS NOT NULL;") ;
            $query->execute() ;

            while($row = $query -> fetch()):
                array_push($resultarray,$row['PATH']) ;
            endwhile;
        else:
            if($city == "City"):
                $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :countryname) AND PATH IS NOT NULL") ;
                $query->bindValue(":countryname",$country) ;
                $query->execute() ;

                while($row = $query -> fetch()):
                    array_push($resultarray,$row['PATH']) ;
                endwhile;
            else:
                $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :countryname) AND CityCode IN (SELECT GeoNameID FROM geocities WHERE AsciiName = :cityname) AND PATH IS NOT NULL;") ;
                $query->bindValue(":countryname",$country) ;
                $query->bindValue(":cityname",$city) ;
                $query->execute() ;

                while($row = $query -> fetch()):
                    array_push($resultarray,$row['PATH']) ;
                endwhile;
            endif;
        endif ;

    else:
        if($country == "Country"):
            $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE Content = :content AND PATH IS NOT NULL") ;
            $query->bindValue(":content",$content) ;
            $query->execute() ;

            while($row = $query -> fetch()):
                array_push($resultarray,$row['PATH']) ;
            endwhile;
        else:
            if($city == "City"):
                $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE Content = :content AND CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :countryname) AND PATH IS NOT NULL ;") ;
                $query->bindValue(":content",$content) ;
                $query->bindValue(":countryname",$country) ;
                $query->execute() ;

                while($row = $query -> fetch()):
                    array_push($resultarray,$row['PATH']) ;
                endwhile;
            else:
                $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE Content = :content AND CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :countryname) AND CityCode IN (SELECT GeoNameID FROM geocities WHERE AsciiName = :cityname) AND PATH IS NOT NULL ;") ;
                $query->bindValue(":content",$content) ;
                $query->bindValue(":countryname",$country) ;
                $query->bindValue(":cityname",$city) ;
                $query->execute() ;

                while($row = $query -> fetch()):
                    array_push($resultarray,$row['PATH']) ;
                endwhile;
            endif;
        endif;

    endif;


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


// SELECT PATH FROM travelimage WHERE Content = :content ;
// SELECT PATH FROM travelimage WHERE CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :countryname) ;
// SELECT PATH FROM travelimage WHERE CityCode IN (SELECT GeoNameID FROM geocities WHERE AsciiName = :cityname) ;

//SELECT PATH FROM travelimage WHERE CountryCodeISO IN (SELECT ISO FROM geocountries WHERE CountryName = :countryname) AND CityCode IN (SELECT GeoNameID FROM geocities WHERE AsciiName = :cityname) ;