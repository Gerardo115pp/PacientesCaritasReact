<?php
    function GetConnection()
    {
        $conn = new mysqli("localhost","id11208167_caritasmanager","krakratua,.gopnik","id11208167_caritas");
        if($conn->connect_error)
        {
            echo $error -> $conn->connect_error;
            return null;
        }
        else
        {
            return $conn;
        }
    }
?>