<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');
//
$name = $_POST['User'] ;
$pass = $_POST['Password'] ;
$email = $_POST['Email'] ;
$salt = $_POST['Salt'] ;

try {
    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $pdo->prepare("SELECT Email FROM traveluser WHERE Email = :email ;");
    $query->bindValue(':email',$email) ;
    $query->execute() ;
    $returnemail = $query ->fetchColumn() ;

    $query = $pdo->prepare("SELECT UserName FROM traveluser WHERE UserName = :uname ;");
    $query->bindValue(':uname',$name) ;
    $query->execute() ;
    $returnname = $query -> fetchColumn() ;

    if($returnname == $name):
        echo "failname" ;
    elseif($returnemail == $email):
        echo "failemail" ;
    else:
        $statement = $pdo ->prepare("INSERT INTO traveluser VALUES(NULL,:email,:namen,:pass,1,NOW(),NOW(),:salt) ") ;
        $statement -> bindValue(":email",$email) ;
        $statement -> bindValue(":pass",$pass) ;
        $statement -> bindValue(":namen",$name) ;
        $statement -> bindValue(":salt",$salt) ;
        $statement -> execute() ;
        echo "success" ;
    endif;
    $pdo = null;

}
catch (PDOException $e) {
    die( $e -> getMessage() );
}