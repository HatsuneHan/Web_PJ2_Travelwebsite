<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$picpath = $_POST['PATH'] ;

try {
    session_start() ;
    if(isset($_SESSION['Username'])):
        $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
        $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = $pdo->prepare("UPDATE travelimage SET UID = NULL WHERE PATH = :picpath ;");
        $query->bindValue(':picpath',$picpath) ;
        $query->execute() ;

        $query = $pdo->prepare("DELETE FROM travelimagefavor WHERE ImageID IN (SELECT ImageID FROM travelimage WHERE PATH = :picpath)");
        $query->bindValue(':picpath',$picpath) ;
        $query->execute() ;

        echo "success" ;

        $pdo = null ;
    else:
        echo "notlogin" ;

    endif;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}


