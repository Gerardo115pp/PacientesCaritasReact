<?php
    function getJson($json_string)
    {
        $json_string = str_replace('&#34;','"',$json_string);
        $json_data = json_decode($json_string, true);
        return $json_data;
    }

    function addDateValue($json_string)
    {
        $json_data = getJson($json_string);
        $json_data['created_on'] = date("Y-m-d H:i:s");
        return json_encode($json_data);
    }
?>