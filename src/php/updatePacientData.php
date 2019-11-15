<?php
    $attrib = filter_var($_POST["value_name"],FILTER_SANITIZE_STRING);
    $new_value = filter_var($_POST["new_value"],FILTER_SANITIZE_STRING);
    $uuid = filter_var($_POST["uuid"],FILTER_SANITIZE_STRING);
    include "connect.php";

    $sql = "UPDATE pacientes SET $attrib=? WHERE uuid=?";
    
    $conn = GetConnection();
    $stmt = $conn->stmt_init();
    if(mysqli_stmt_prepare($stmt, $sql))
    {
        $value_types =  ($_POST["value_type"]==="string" ? "s" : "d")."s";
        mysqli_stmt_bind_param($stmt,$value_types,$new_value,$uuid);
        mysqli_stmt_execute($stmt);
    }
    $conn->close();
    updateOnJson($uuid,$attrib,$new_value);


    function updateOnJson($uuid,$attrib,$new_value)
    {
        $path = "../pacients/$uuid";
        if(file_exists($path))
        {
            foreach (scandir($path) as $item)
            {
                if ($item == '.' || $item == '..') {
                    continue;
                }
                $json = json_decode(file_get_contents($path.DIRECTORY_SEPARATOR.$item),true);
                $json[$attrib] = $new_value;
                file_put_contents($path.DIRECTORY_SEPARATOR.$item,json_encode($json));
            }
        }
    }
?>