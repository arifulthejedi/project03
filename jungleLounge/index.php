<?php

//header
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');


//including user credentials
include "user-cred.php";


//include the api functions
include "API/get_data.php";
include "API/user_auth.php";
include "API/database.php";


//making new db connection
$dbconn = new mysqli($servername, $username, $password, "jungleLounge");

// Check connection
if ($dbconn->connect_error) {
  die("Connection failed: " . $dbconn->connect_error);
}
/*

$_SERVER["REQUEST_METHOD"] && $_POST[]

*/

function RequestData()
{

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);

    return $data;
  } else
    return false;

}





/*
route for API

url: ip/dishes or ip/login etc...
*/
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);



if ($path == "/dishes") {

  $limit = $_GET["limit"];
  $offset = $_GET["offset"];
  $count = $dbconn->query("SELECT COUNT(*) AS count FROM dishes;");
  $count = $count->fetch_assoc();

if ($limit && $count) {
    $sql = "SELECT *
     FROM dishes
     ORDER BY id
     LIMIT " . $limit . " OFFSET " . $offset . "; ";

    $data = $dbconn->query($sql);

    if ($data->num_rows > 0) {
      $items = [];
      // Loop through the rows and fetch data
      while ($row = $data->fetch_assoc()) {
        array_push($items, $row);
      }
      echo json_encode(["item"=>$items,"count"=>$count['count']]);
    } else
       echo json_encode(["item" => [],"count" => 0]);;
  }
  else {
    $data = getData($dbconn, "dishes");
    if ($data) {
      echo json_encode($data);
    } else
       echo json_encode("Empty Table");
  }

}



//for delete dish
else if ($path == "/delete-dish") {
  $data = RequestData();
  if ($data['admin']) {
    if (UserAuth($dbconn, $data['admin']['name'], $data['admin']['pass'])) {
      if (deleteData($dbconn, "dishes", "id =" . $data['dish']["id"])) {
        echo json_encode(["delete" => true]);
      } else
        echo json_encode(["message" => $data['dish']]);
    }
  } else
    echo json_encode(["message" => "Authentication failed"]);
}


//update dishe
else if ($path == "/update-dish") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $desc = $_POST['desc'];
    $ingred = $_POST['ingred'];
    $energy = $_POST['energy'];
    $price = $_POST['price'];
    $authname = $_POST['authname'];
    $authpass = $_POST['authpass'];

    $auth = UserAuth($dbconn, $authname, $authpass);
    if($auth){
       $sql = "UPDATE dishes SET name = '$name' , price = '$price',
       description = '$desc', ingredients='$ingred' ,energy = '$energy'
       WHERE id = '$id'";
       $res = $dbconn->query($sql);
       if($res){
        echo json_encode(["update"=>true]);
       }else{
        echo json_encode(["message" => "Something went wrong please try again"]);
       }

    }else{
      echo json_encode(['message'=> "Authentication failed please enter valid credentionals"]);
    }
}


/*
json data structure
{
    "name":"Sticky Toffee Pudding",
    "price":23,
    "desc":"A rich, moist cake dipped in a sticky sauce. It is best served warm with a dollop of vanilla ice cream.",
    "ingred":"flour,dates,milk,baking powder,eggs,brown suger",
    "energy":135
}
*/

else if ($path == "/add-dish") {
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    //recieve data
    $name = $_POST['name'];
    $price = $_POST['price'];
    $desc = $_POST['desc'];
    $ingred = $_POST['ingred'];
    $energy = $_POST['energy'];
    $filename = $_FILES['image']['name'];

    if ($name && $price && $ingred && $filename) {

      if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $tempPath = $_FILES['image']['tmp_name'];
        $destination = 'uploads/' . $_FILES['image']['name'];

        if (filesize($_FILES['image']['tmp_name']) < (1000 * 1500)) { //mesure the fie size in right way
          if (move_uploaded_file($tempPath, $destination)) {

            $sql = "insert into dishes (name,price,description,energy,ingredients,file) values
        ('$name',$price,'$desc',$energy,'$ingred','$filename')";

            if ($dbconn->query($sql)) {
              echo json_encode(["insert" => true]);
            } else
              echo json_encode(["message" => "Failed to insert"]);
          } else {
            echo json_encode(["message" => "Image Upload failed"]);
          }
        } else {
          echo json_encode(["message" => "Image size exceeded the limit"]);
        }
      } else
        echo json_encode(["message" => "Image error"]);

    } else
      echo json_encode(["message" => "Please Insert data"]);
  } else
    echo json_encode(["message" => "Request Can't accept"]);

}

/*
{
  admin:{
    name:"",
    pass:""
  }
}

*/

//login
else if ($path == "/login") {
  $data = RequestData();
  $user = $data['admin'];
  if ($user) {
    $res = UserAuth($dbconn, $user['name'], $user['pass']);
    if ($res) {
      echo json_encode(['login' => true]);
    } else
      echo json_encode(['login' => false,"message"=>"failed to query"]);
  } else
    echo json_encode(['login' => false]);
}


//sign up
//insert($dbconn,"admins","(username,pass)","('raqib','123')");
else if ($path == "/sign-up") {
  $data = RequestData();
  $admin = $data['admin'];
  $newUserName = $data['user']['name'];
  $newUserPass = $data['user']['pass'];

  if ($admin && $newUserName && $newUserPass) {
    $res = UserAuth($dbconn, $admin['name'], $admin['pass']);
    if ($res) {
      //add user 
      $add = insert($dbconn, "admins", "(name,pass)", "('$newUserName','$newUserPass')");
      if ($add) {
        echo json_encode(["insert" => true]);
      } else
        echo json_encode(["message" => "Insert failed try again :("]);
    } else
      echo json_encode(['message' => "Authintication failed"]);
  } else
    echo json_encode(['message' => "User info not recieved"]);
} else if ($path == "/user-list") {
  $data = RequestData();
  $admin = $data['admin'];
  if ($admin) {
    $auth = UserAuth($dbconn, $admin['name'], $admin['pass']);
    if ($auth) {
      $list = getData($dbconn, "admins");
      echo json_encode($list);
    } else
      echo json_encode(["auth" => false]);
  } else
    echo json_encode(["auth" => false]);

}


//contact messages
//insert($dbconn,"contact_messages","(name,email,message)","('raqib','raqib@ulab.bd','message')");
/*
post req json structure

{
  name:"name",
  email:"email",
  message:"messages"
}

*/
else if ($path == "/message") {
  //$data  = RequestData();
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  if ($name && $email && $message) {
    $res = insert($dbconn, "contact_messages", "(name,email,message)", "('$name','$email','$message')");
    if ($res) {
      echo json_encode(["submit" => true]);
    } else
      echo json_encode(["submit" => false]);
  } else
    echo json_encode(["submit" => false]);
}



/*
post request json structure of
user credentials
{
  admin:{name:"name",pass:"pass"}
}

*/

else if ($path == "/messages") {
  $req = RequestData();
  $name = $req['admin']['name'];
  $pass = $req['admin']['pass'];

  if($name && $pass){
     $auth = UserAuth($dbconn,$name,$pass);
      if($auth){
          $da = [];
          $query = $dbconn->query("select * from contact_messages");
          while($row = $query->fetch_assoc()){
            array_push($da,$row);
          }
          echo json_encode($da);
      }
      else
        echo "Auth failed";
     
  }else
    echo "Send required data";
}


//for delete dish
else if ($path == "/delete-message") {
  $data = RequestData();
  if ($data['admin']) {
    if (UserAuth($dbconn, $data['admin']['name'], $data['admin']['pass'])) {
      if (deleteData($dbconn, "contact_messages", "id =" . $data["id"])) {
        echo json_encode(["delete" => true]);
      } else
        echo json_encode(["message" => "Somethings went wrong :("]);
    }
  } else
    echo json_encode(["message" => "Authentication failed"]);
}


/*
json structure
{
  name:"Ariful Islam",
  email:"jediMaster@jedi.com",
  date:"2023-07-27",
  phone:"",
  person:3
}

*/


else if($path == "/booking"){
  //$data  = RequestData();
  $name = $_POST['name'];
  $email = $_POST['email'];
  $date = $_POST['date'];
  $phone = $_POST['phone'];
  $person = $_POST['person'];


  if ($name && $email && $date && $person) {
    $res = $dbconn->query("insert into booking (date,name,phone,person,email) values('$date','$name','$phone','$person','$email')");
    if ($res) {
      echo json_encode(["submit" => true]);
    } else
      echo json_encode(["submit" => false]);
  } else
    echo json_encode(["submit" => false]);
  
}


else if($path == "/bookings"){
  $req = RequestData();
  $name = $req['admin']['name'];
  $pass = $req['admin']['pass'];

  if($name && $pass){
     $auth = UserAuth($dbconn,$name,$pass);
      if($auth){
          $da = [];
          $query = $dbconn->query("select * from booking");
          while($row = $query->fetch_assoc()){
            array_push($da,$row);
          }
          echo json_encode($da);
      }
      else
        echo "Auth failed";
     
  }else
    echo "Send required data";

}


//for delete booking
else if ($path == "/delete-booking") {
  $data = RequestData();
  if ($data['admin']) {
    if (UserAuth($dbconn, $data['admin']['name'], $data['admin']['pass'])) {
      if (deleteData($dbconn, "booking", "id =" . $data["id"])) {
        echo json_encode(["delete" => true]);
      } else
        echo json_encode(["message" => "Something wents wrong :("]);
    }
  } else
    echo json_encode(["message" => "Authentication failed"]);
}


else {
  echo "Invalid URL :(";
}

$dbconn->close();