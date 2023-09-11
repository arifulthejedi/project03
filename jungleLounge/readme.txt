
Jungle lounge is a simple resturent management system
#you can add dish manu
#admin login system
#user can leave message and make reservation
#admin can perform crud operation on dish menu
#admin has control of user data(reservation and contact message)



//integration process
1.set database credentials on user-cred.php file and new admin name and pass('admin','admin') is default
2.run index.php so that the databse and table get installed
3.browse the site url(doamin/project03) 
4.the system is ready !!

N.B
#all image file will be on upload folder
#if you delete a menu you have to delete the image which is associated with the menu dish

if had any issues feel free contact with me

Thank You :)





//database info

+---------------------+
| Tables_in_resturent |
+---------------------+
| admins              |
| booking             |
| contact_messages    |
| dishes              |
----------------------


dishes
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| name        | varchar(50)  | YES  |     | NULL    |                |
| price       | int          | YES  |     | NULL    |                |
| description | varchar(600) | YES  |     | NULL    |                |
| energy      | int          | YES  |     | NULL    |                |
| ingredients | varchar(300) | YES  |     | NULL    |                |
| file        | varchar(100) | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+


contact_messages
+---------+---------------+------+-----+---------+----------------+
| Field   | Type          | Null | Key | Default | Extra          |
+---------+---------------+------+-----+---------+----------------+
| id      | int           | NO   | PRI | NULL    | auto_increment |
| name    | varchar(100)  | NO   |     | NULL    |                |
| email   | varchar(100)  | NO   |     | NULL    |                |
| message | varchar(1500) | YES  |     | NULL    |                |
+---------+---------------+------+-----+---------+----------------+


admins
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| username | varchar(30) | YES  |     | NULL    |       |
| pass     | varchar(30) | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+


booking
+--------+--------------+------+-----+---------+----------------+
| Field  | Type         | Null | Key | Default | Extra          |
+--------+--------------+------+-----+---------+----------------+
| id     | int          | NO   | PRI | NULL    | auto_increment |
| date   | date         | NO   |     | NULL    |                |
| name   | varchar(50)  | NO   |     | NULL    |                |
| phone  | varchar(15)  | YES  |     | NULL    |                |
| person | int          | NO   |     | NULL    |                |
| email  | varchar(100) | NO   |     | NULL    |                |
+--------+--------------+------+-----+---------+----------------+



