<?php

    
    include 'connect.php';
    include 'nameSound.php';
    
    $name_array = filter_var($_POST["name_array"],FILTER_SANITIZE_STRING);
    $name_array = str_replace('&#34;','',$name_array);
    
    $conn = GetConnection();
    $stmt = $conn->stmt_init();
    
    $accepted = false;
    $results_array = array();

    if(strlen($name_array) === 1)
    {   
        $sql = "SELECT * FROM pacientes WHERE name LIKE ?";
        
        if(mysqli_stmt_prepare($stmt,$sql))
        {
            $name_array .= "%";
            mysqli_stmt_bind_param($stmt,'s',$name_array);
            $accepted = true;
        }
    }
    elseif(strtolower($name_array) === "todos")
    {
        $sql = "SELECT * FROM pacientes ORDER BY name";
        $accepted = true;
        mysqli_stmt_prepare($stmt,$sql);
    }
    else
    {         
        $sql = "SELECT * FROM `pacientes` WHERE (f_sound=? AND f_sound!='') OR (s_sound=? AND s_sound!='') OR (t_sound=? AND t_sound!='') ";

        if(mysqli_stmt_prepare($stmt,$sql))
        {
            $name_array = getNameSound($name_array);
            mysqli_stmt_bind_param($stmt,'sss',$name_array[0],$name_array[1],$name_array[2]);
            $accepted = true;
        }
    }

    if($accepted)
    {
        mysqli_stmt_execute($stmt);
        $results = mysqli_stmt_get_result($stmt);
        while($row = $results->fetch_assoc())
        {
            $row["appointments"] = getAppointments($row["uuid"]);
            array_push($results_array,$row);
        }
    }
    $conn->close();
    if(isset($_POST['is_advanced']))
    {
        $filters = filter_var($_POST["filters"],FILTER_SANITIZE_STRING);
        $filters = str_replace('&#34;','"',$filters);
        $filters = json_decode($filters,true);
        $results_array = filterResults($results_array,$filters);
    }
    echo json_encode($results_array);

    function filterResults($results,$filters)
    {
        $filtered_results = [];
        for ($h=0; $h < count($results); $h++) 
        {
            $accept = true;
            foreach ($filters as $key => $value) 
            {
                if($results[$h][$key] != $value)
                {
                    $accept = false;
                    break;
                }
            }
            if($accept)
            {
                array_push($filtered_results,$results[$h]);
            }
        }
        return $filtered_results;
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