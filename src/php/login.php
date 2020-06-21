<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$loginname = $_POST['account'] ;
$loginpass = $_POST['password'] ;


try {

    session_start();
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $pdo->prepare("SELECT Pass FROM traveluser WHERE UserName = :loginname OR Email = :loginname");
    $query->bindValue(':loginname',$loginname) ;
    $query->execute() ;

    $realpassword = $query->fetchColumn() ;
    if($realpassword == $loginpass && $loginpass != null):
        $_SESSION['Username'] = $loginname ;
        $pdo = null;
        echo "good" ;
    else:
        $pdo = null;
        echo "bad" ;
    endif;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}

