<?php
    function  getNameSound($name)
    {
        $name_array = explode(" ",$name);
        for($h=0;$h<3;$h++)
        {
            $name_array[$h] = isset($name_array[$h]) ? metaphone($name_array[$h]) : "";
        }
        return $name_array;
    }

?>