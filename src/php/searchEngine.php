<?php

    //TODO: debo agregar la opcion de que si el name array contiene en su primer parametro 'todos', se regresen todos los registros
    //TODO: el programa tiene un bug cuando el resultado no es ecnontrado, esto se debe corregir.

    $name_array = filter_var($_POST["name_array"],FILTER_SANITIZE_STRING);
    
    include 'connect.php';
    include 'nameSound.php';

    $sql = "SELECT * FROM `pacientes` WHERE (f_sound=? AND f_sound!='') OR (s_sound=? AND s_sound!='') OR (t_sound=? AND t_sound!='') ";

    $conn = GetConnection();
    $stmt = $conn->stmt_init();
    if(mysqli_stmt_prepare($stmt,$sql))
    {
        $name_array = getNameSound($name_array);
        mysqli_stmt_bind_param($stmt,'sss',$name_array[0],$name_array[1],$name_array[2]);
        mysqli_stmt_execute($stmt);
        $results = mysqli_stmt_get_result($stmt);
        $results_array = array();
        while($row = $results->fetch_assoc())
        {
            $row["appointments"] = getAppointments($row["uuid"]);
            array_push($results_array,$row);
        }
        echo json_encode($results_array);
    }

    function getAppointments($uuid)
    {
        $dir = "../pacients/$uuid/";
        $files = scandir($dir);
        $consultas_array = array();
        for($h=0;$h<count($files);$h++)
        {
            if(!preg_match("/^\.{1,2}$/",$files[$h]))
            {
                $json_data = file_get_contents($dir.$files[$h]);
                $json_data = json_decode($json_data,true);
                $consultas_array[$json_data["created_on"]] = $json_data; 
            }
        }
        return $consultas_array;
    }

?>