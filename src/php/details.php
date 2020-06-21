<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$picpath = $_POST['PATH'] ;

try {

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $pdo->prepare("SELECT COUNT(*) AS num FROM travelimagefavor WHERE ImageID in (SELECT a.ImageID FROM (SELECT ImageID FROM travelimage WHERE PATH = :picpath )as a) ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    $likenumber = $query->fetchColumn() ;
    echo $likenumber . "&" ;

    $query = $pdo->prepare("SELECT CountryName From geocountries WHERE ISO IN (SELECT a.CountryCodeISO FROM (SELECT CountryCodeISO FROM travelimage WHERE PATH = :picpath ) as a ) ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    $Country = $query->fetchColumn() ;
    echo $Country . "&" ;

    $query = $pdo->prepare("SELECT AsciiName FROM geocities WHERE GeoNameID IN (SELECT a.CityCode FROM (SELECT CityCode FROM travelimage WHERE PATH = :picpath) as a) ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    $City = $query->fetchColumn() ;
    echo $City . "&" ;

    $query = $pdo->prepare("SELECT Description FROM travelimage WHERE PATH = :picpath ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    $Des = $query->fetchColumn() ;
    echo $Des . "&" ;

    $query = $pdo->prepare("SELECT Content FROM travelimage WHERE PATH = :picpath ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    $con = $query->fetchColumn() ;
    echo $con . "&" ;

    $query = $pdo->prepare("SELECT Title FROM travelimage WHERE PATH = :picpath ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    $tt = $query->fetchColumn() ;
    echo $tt . "&";

    $query = $pdo->prepare("SELECT UserName FROM traveluser WHERE UID IN (SELECT UID FROM travelimage WHERE PATH = :picpath) ;");
    $query->bindValue(':picpath',$picpath) ;
    $query->execute() ;

    $username = $query->fetchColumn() ;
    echo $username ;




    $pdo = null ;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}

