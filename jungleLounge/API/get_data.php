<?php 

/*
table info
contact_messages

    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL


booking

    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL

*/




function getData($dbconn,$table){
$query = "SELECT * FROM ".$table;

    if($dbconn){
        $result = $dbconn->query($query);
        
        // Check if there are results
        if ($result->num_rows > 0) {
            $data = [];
            // Loop through the rows and fetch data
            while ($row = $result->fetch_assoc()) {
                array_push($data,$row);
            }
            return $data;
        } else {
            return false;
        }
    }
    else
      return false;
    
}




/*
add data 
//$col like (col1,col2,...)
//$val like (val1,val2,...)

*/
function insert($dbconn,$table,$col,$val){
$query = "INSERT INTO ".$table." ".$col."
VALUES ".$val;

if($dbconn){
        $result = $dbconn->query($query);
    
        // Check if there are results
        if ($result) {
            return $result;
        } else {
            return false;
        }
    }
    else
      return false;
}

//delete data
$del = "DELETE FROM dishes WHERE name = ?";

function deleteData($dbconn,$table,$cond){
    $query = "DELETE FROM ".$table." WHERE ".$cond;
    if($dbconn){
        $result = $dbconn->query($query);
    
        // Check if there are results
        if ($result) {
             return true;
        } else {
            return false;
        }
    }
    else
      return false;

}


//update data
$update = "UPDATE MyGuests SET lastname='Doe' WHERE id=2";

//this function take all perameter as string
//$set perameter use for which data file need to change and which value like name='spegetti',energy=12 ..
//condition like name = "name" this argument works where the data need to update

function update($dbconn,$table,$set,$cond){
    $query = "UPDATE ".$table."SET ".$set." WHERE ".$cond;
    if($dbconn){
        $result = $dbconn->query($query);

        // Check if there are results
        if ($result) {
            // Loop through the rows and fetch data
             echo "updated Successfully !";
        } else {
            echo "update failed";
        }
    }
    else
      echo "Connetion not found";

}
