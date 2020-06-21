<?php
try {
    session_start();
    if(isset($_SESSION['Username']))
        echo "success" ;
    else
        echo "fail" ;
}
catch (PDOException $e) {
    die( $e -> getMessage() );
}