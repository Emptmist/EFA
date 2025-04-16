<?php
$servername = "localhost";
$username = "root";  // Default XAMPP user
$password = "";      // Default is empty
$dbname = "efa_settings"; // Change this to your actual DB name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>