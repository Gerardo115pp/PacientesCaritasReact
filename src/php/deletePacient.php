<?php
    include 'connect.php';
    $uuid = filter_var($_POST["uuid"],FILTER_SANITIZE_STRING);
    $conn = GetConnection();
    
    deleteConsultas($uuid,$conn);
    deletePacient($uuid,$conn);
    deleteFolder($uuid);

    function deleteConsultas($uuid,$conn)
    {
        $stmt = $conn->stmt_init();
        $sql = 'DELETE FROM consultas WHERE pacient=?';
        if(mysqli_stmt_prepare($stmt,$sql))
        {
            mysqli_stmt_bind_param($stmt,'s',$uuid);
            mysqli_stmt_execute($stmt);
        }
    }

    function deletePacient($uuid,$conn)
    {
        $stmt = $conn->stmt_init();
        $sql = 'DELETE FROM pacientes WHERE uuid=? LIMIT 1';
        if(mysqli_stmt_prepare($stmt,$sql))
        {
            mysqli_stmt_bind_param($stmt,'s',$uuid);
            mysqli_stmt_execute($stmt);
        }
    }

    function deleteFolder($uuid)
    {
        $folder = "../pacients/$uuid";
        if(file_exists($folder))
        {
            foreach (scandir($folder) as $item) {
                if ($item == '.' || $item == '..') {
                    continue;
                }
        
                if (!unlink($folder.DIRECTORY_SEPARATOR.$item)) {
                    return false;
                }
        
            }
            rmdir($folder);
        }
    }
    $conn->close();
?>