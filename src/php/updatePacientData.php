<?php
    $attrib = filter_var($_POST["value_name"],FILTER_SANITIZE_STRING);
    $new_value = filter_var($_POST["new_value"],FILTER_SANITIZE_STRING);
    $uudi = filter_var($_POST["uuid"],FILTER_SANITIZE_STRING);
    include "connect.php";

    $sql = "UPDATE pacientes SET $attrib=? WHERE uuid=?";
    
    $conn = GetConnection();
    $stmt = $conn->stmt_init();
    if(mysqli_stmt_prepare($stmt, $sql))
    {
        mysqli_stmt_bind_param($stmt,'ss',$new_value,$uudi);
        mysqli_stmt_execute($stmt);
    }
?>