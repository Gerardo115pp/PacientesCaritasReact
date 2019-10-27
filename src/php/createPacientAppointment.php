<?php
    include 'Tools.php';
    include 'connect.php';
    $user_data = filter_var($_POST['user_data'],FILTER_SANITIZE_STRING);
    $uuid = filter_var($_POST['uuid'],FILTER_SANITIZE_STRING);
    $user_data = getJson($user_data);
    $path = "../pacients/$uuid/".date("Y-m-d (H_i_s)").".json";
    $conn = GetConnection();
    $response = array();
    $errors = createAppointment($user_data,$uuid,$conn,$path);
    $conn->close();
    if(!$errors)
    {
        $response["response"] = 'ok';
    }
    else{
        $response["response"] = 'failed';
    }
    file_put_contents($path,addDateValue(json_encode($user_data)));
    echo json_encode($response);


    function createAppointment($json_data, $uuid, $conn, $path)
    {
        $stmt = $conn->stmt_init();
        $sql = "INSERT INTO consultas(id,pacient,pulse,temperature,ta,fc,fr,smoking,addiction,alcoholism,path_to_notes) VALUES (NULL,?,?,?,?,?,?,?,?,?,?)";
        if(mysqli_stmt_prepare($stmt,$sql))
        {
            $pulse = isset($json_data["pulse"]) ? $json_data["pulse"] : "?";
            $temp = isset($json_data["temp"]) ? $json_data["temp"] : "?";
            $ta = isset($json_data["t.a"]) ? $json_data["t.a"] : "?";
            $fr = isset($json_data["f.r"]) ? $json_data["f.r"] : "?";
            $fc = isset($json_data["f.c"]) ? $json_data["f.c"] : "?";
            $addic = (isset($json_data["addic"]) && $json_data["addic"]===true) ? 1 : 0;
            $taba = (isset($json_data["taba"]) && $json_data["taba"]===true) ? 1 : 0;
            $alch = (isset($json_data["alch"]) && $json_data["alch"]===true) ? 1 : 0;
            mysqli_stmt_bind_param($stmt,"ssssssddds",$uuid,$pulse,$temp,$ta,$fc,$fr,$taba,$addic,$alch,$path);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            return 0;

        }
        return 1;
    }

?>