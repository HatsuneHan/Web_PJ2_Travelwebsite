<?php
try {
    session_start();
    if(isset($_SESSION['Username'])):
        unset($_SESSION['Username']);
        echo "success" ;
    else:
        echo "fail" ;
    endif;
}
catch (PDOException $e) {
    die( $e -> getMessage() );
}
