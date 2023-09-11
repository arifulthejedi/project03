<?php


// //db credentials
// $servername = "localhost";
// $username = "ariful";
// $password = "raqib302";


// mysql connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// SQL query to create the database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS jungleLounge";

if ($conn->query($sql) === FALSE) {
  echo "Error creating database: " . $conn->error;
}

$conn->close();



//creating table is not exist

$conn = new mysqli($servername, $username, $password, "jungleLounge");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$tables = array(
  "table1" => "CREATE TABLE IF NOT EXISTS dishes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(155) NOT NULL,
      price  int   NOT NULL,
      description varchar(2000),
      energy int,
      ingredients varchar(500),
      file  varchar(120) NOT NULL
  )",
  "table2" => "CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message VARCHAR(2000) NOT NULL
  )",
   "table3" => "CREATE TABLE IF NOT EXISTS booking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date date NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) ,
    person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
)",
 "table4" => "CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL
)"
);


// Loop through the tables array and create each table if it doesn't exist
foreach ($tables as $tableName => $createTableSQL) {

  $conn->query($createTableSQL);
  // if ( === TRUE) {
  //     echo "Table '$tableName' created successfully.<br>";
  // } else {
  //     echo "Error creating table '$tableName': " . $conn->error . "<br>";
  // }
}

$res = $conn->query("INSERT INTO admins (name,pass)
SELECT '$admin','$pass'
WHERE NOT EXISTS (SELECT 1 FROM admins);");


// Close the database connection
$conn->close();



// //creating new admin user for the system
// $conn = new mysqli($servername, $username, $password, "jungleLounge");

// // Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// $conn->close();
