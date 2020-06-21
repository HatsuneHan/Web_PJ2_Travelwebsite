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

        $query = $pdo->prepare("SELECT FavorID FROM travelimagefavor WHERE UID IN(SELECT a.UID FROM(SELECT UID FROM traveluser WHERE UserName = :username OR Email = :username)as a) AND ImageID IN(SELECT b.ImageID FROM(SELECT ImageID FROM travelimage WHERE PATH = :picpath)as b)");
        $query->bindValue(':picpath',$picpath) ;
        $query->bindValue(':username',$_SESSION['Username']) ;
        $query->execute() ;

        $result = $query->fetchColumn() ;

        if($result):
            $q = $pdo ->prepare("DELETE FROM travelimagefavor WHERE FavorID = :fid") ;
            $q ->bindValue(":fid",$result) ;
            $q->execute() ;
            echo "success"  ;
        else:
            echo "fail" ;
        endif ;


        $pdo = null ;
    else:
        echo "notlogin" ;

    endif;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}


