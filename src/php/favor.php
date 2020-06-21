<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$picpath = $_POST['PATH'] ;
$func = $_POST['FUNC'] ;

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

        $su = $pdo->prepare("SELECT UID FROM traveluser WHERE UserName = :user OR Email = :user ;");
        $su->bindValue(':user',$_SESSION['Username']) ;
        $su->execute() ;

        $username = $su ->fetchColumn() ;


        $sp = $pdo->prepare("SELECT ImageID FROM travelimage WHERE PATH = :picpath ;");
        $sp->bindValue(':picpath',$picpath) ;
        $sp->execute() ;

        $picid = $sp ->fetchColumn() ;



        if($result):
            $q = $pdo ->prepare("DELETE FROM travelimagefavor WHERE FavorID = :fid") ;
            $q ->bindValue(":fid",$result) ;
            if($func != "check")
                $q->execute() ;
            echo "success"  ;
        else:
            $q = $pdo ->prepare("INSERT INTO travelimagefavor VALUES(NULL,:uid,:imageid)") ;
            $q ->bindValue(":imageid",$picid) ;
            $q ->bindValue(":uid", $username) ;
            if($func != "check")
                $q->execute() ;
            echo "fail" ;
        endif;


        $pdo = null ;
    else:
        echo "notlogin" ;

    endif;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}

