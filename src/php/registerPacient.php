<?php
    include 'nameSound.php';
    include 'Tools.php';
    include "connect.php";
    $json_string = filter_var($_POST["json"],FILTER_SANITIZE_STRING);
    $json_data = getJson($json_string);
    $pacient_uuid = sha1($json_data["name"].date("d/m/y--H:U")); 
    $data_path = "../pacients/$pacient_uuid/".date("Y-m-d (H_i_s)").".json";
    if(is_dir("../pacients") === false)
    {
        mkdir("../pacients");
    }
    mkdir("../pacients/$pacient_uuid");
    file_put_contents($data_path,addDateValue($json_string));

    echo addDateValue($json_string);

    $conn = GetConnection();
    createPatient($json_data,$pacient_uuid,$conn);
    createFirstMedicalReview($json_data,$pacient_uuid,$conn,$data_path);
    $conn->close();

    function createPatient($json_data, $uuid, $conn)
    {
        $stmt = $conn->stmt_init();
        $sql = "INSERT INTO pacientes(uuid, name, address, age, phone, gender, f_sound, s_sound, t_sound) VALUES (?,?,?,?,?,?,?,?,?)";
        if(mysqli_stmt_prepare($stmt,$sql))
        {
            $name = isset($json_data["name"]) ? $json_data["name"] : "";
            $address = isset($json_data["address"]) ? $json_data["address"] : "no se especifico";
            $age = isset($json_data["age"]) ? $json_data["age"] : 0;
            $phone = isset($json_data["phone"]) ? $json_data["phone"] : "no se especifico";
            $gender = $json_data["gender"];
            $sound = getNameSound($name);
            mysqli_stmt_bind_param($stmt,"sssisssss",$uuid,$name,$address,$age,$phone,$gender,$sound[0], $sound[1], $sound[2]);
            mysqli_stmt_execute($stmt);
        }
    }

    function createFirstMedicalReview($json_data, $uuid, $conn, $path)
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
        }
    }
?>