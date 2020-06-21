<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

session_start() ;

if(isset($_SESSION['Username'])):
    try {

        $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
        $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = $pdo->prepare("SELECT Title FROM travelimage WHERE ImageID IN (SELECT ImageID FROM travelimagefavor WHERE UID IN (SELECT a.UID FROM (SELECT UID FROM traveluser WHERE UserName = :username OR Email = :username) as a))");
        $query->bindValue(':username',$_SESSION['Username']) ;
        $query->execute() ;
        $num = 0 ;
        while($tt = $query->fetchColumn())
            if($num == 0):
                echo $tt ;
                $num = $num + 1 ;
            else:
                echo "&" . $tt ;
            endif ;

        echo "|||" ;

        $num = 0 ;
        $query = $pdo->prepare("SELECT Description FROM travelimage WHERE ImageID IN (SELECT ImageID FROM travelimagefavor WHERE UID IN (SELECT a.UID FROM (SELECT UID FROM traveluser WHERE UserName = :username OR Email = :username) as a))");
        $query->bindValue(':username',$_SESSION['Username']) ;
        $query->execute() ;

        while($Des = $query->fetch()):
            if($Des['Description'] == null)
                $Des['Description'] = "No description" ;
            if($num == 0):
                echo $Des['Description'] ;
                $num = $num + 1 ;
            else:
                echo "&" . $Des['Description'] ;
            endif ;
        endwhile ;

        echo "|||" ;

        $num = 0 ;
        $query = $pdo->prepare("SELECT PATH FROM travelimage WHERE ImageID IN (SELECT ImageID FROM travelimagefavor WHERE UID IN (SELECT a.UID FROM (SELECT UID FROM traveluser WHERE UserName = :username OR Email = :username) as a))");
        $query->bindValue(':username',$_SESSION['Username']) ;
        $query->execute() ;

        while($path = $query->fetchColumn())
            if($num == 0):
                echo $path ;
                $num = $num + 1 ;
            else:
                echo "&" . $path ;
            endif ;

        $pdo = null ;

    }
    catch (PDOException $e) {
        die( $e -> getMessage() );
    }
else:
    echo "notlogin" ;
endif;


