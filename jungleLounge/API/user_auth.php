<?php 

/*
user authintication functions are resposible for give userauth
*/


function UserAuth($conn,$name,$pass){
  $sql = "SELECT * FROM admins WHERE name='$name' AND pass='$pass'";

  // // Execute the query
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
      return true;
  } else {
      return false;
  }

}





