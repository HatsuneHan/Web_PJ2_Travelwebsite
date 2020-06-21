<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$loginname = $_POST['USERNAME'] ;


try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $pdo->prepare("SELECT Salt FROM traveluser WHERE UserName = :loginname OR Email = :loginname");
    $query->bindValue(':loginname',$loginname) ;
    $query->execute() ;

    $salt = $query->fetchColumn() ;

    echo $salt ;

    $pdo = null ;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}