<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$path = $_POST['PATH'] ;
$content = $_POST['CONTENT'] ;
$country = $_POST['COUNTRY'] ;
$city = $_POST['CITY'] ;
$title = $_POST['TITLE'] ;
$description = $_POST['DESCRIPTION'] ;

try{
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

    //

    $query = $pdo->prepare("UPDATE travelimage SET Title = :title, Description = :description, CountryCodeISO = :countrycode, CityCode = :citycode, Content = :content WHERE PATH = :path");
    $query->bindValue(':title',$title) ;
    $query->bindValue(':description',$description) ;
    $query->bindValue(':countrycode',$countryiso) ;
    $query->bindValue(':citycode',$cityiso) ;
    $query->bindValue(':content',$content) ;
    $query->bindValue(':path',$path) ;
    $query->execute() ;

    $pdo = null ;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}