<?php
session_start(); // Start the session

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:8081"); 
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Missing email or password"]);
    exit;
}

$email = trim($data['email']);
$password = $data['password'];

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare("SELECT user_id, username, email, password FROM user_account WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['user_id']; // Fixed here
        $_SESSION['email'] = $row['email'];
        $_SESSION['username'] = $row['username']; // Store username in session
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user_id" => $row['user_id'],
            "email" => $row['email'],
            "username" => $row['username']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
