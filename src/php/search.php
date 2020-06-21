<?php
define('DBHOST', 'localhost');
define('DBNAME', 'travelwebsite');
define('DBUSER', 'hatsune');
define('DBPASS', 'xbgd1993');
define('DBCONNSTRING','mysql:host=localhost;dbname=travelwebsite');

$attr = $_POST['ATTR'] ;
$value = $_POST['VALUE'] ;

try{
    $patharray = array() ;
    $titlearray = array() ;
    $desarray = array() ;

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($attr == "title"):
        $query = $pdo->prepare("SELECT PATH,Title,Description FROM travelimage WHERE Title LIKE :value LIMIT 20;") ;  ;
        $svalue = "%" . $value . "%" ;
        $query->bindValue(":value",$svalue) ;
        $query->execute() ;
        while($row = $query -> fetch()):
            array_push($patharray,$row['PATH']) ;
            array_push($titlearray,$row['Title']) ;
            array_push($desarray,$row['Description']) ;
        endwhile;

    elseif($attr == "description"):
        $query = $pdo->prepare("SELECT PATH,Title,Description FROM travelimage WHERE Description LIKE :value LIMIT 20;") ;  ;
        $svalue = "%" . $value . "%" ;
        $query->bindValue(":value",$svalue) ;
        $query->execute() ;
        while($row = $query -> fetch()):
            array_push($patharray,$row['PATH']) ;
            array_push($titlearray,$row['Title']) ;
            array_push($desarray,$row['Description']) ;
        endwhile;
    endif;

//    if(sizeof($patharray) == 0)
//        echo "none" ;

    $num = 0 ;
    foreach ($patharray as $number):
        if($num == 0)
            echo $number ;
        else
            echo "&" . $number ;
        $num = $num + 1 ;
    endforeach;

    echo "|||" ;
    $num = 0 ;
    foreach ($titlearray as $number):
        if($num == 0)
            echo $number ;
        else
            echo "&" . $number ;
        $num = $num + 1 ;
    endforeach;

    echo "|||" ;
    $num = 0 ;
    foreach ($desarray as $number):
        if($num == 0)
            echo $number ;
        else
            echo "&" . $number ;
        $num = $num + 1 ;
    endforeach;


    $pdo = null ;

}catch (PDOException $e){
    die( $e -> getMessage() );
}