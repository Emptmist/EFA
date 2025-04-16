<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db_connection.php';

// ✅ Check if session exists
if (!isset($_SESSION['email'])) {
    echo json_encode(["status" => "unauthorized", "message" => "User not logged in"]);
    exit;
}

$email = $_SESSION['email'];

// ✅ First: get user_id using session email
$stmt = $conn->prepare("SELECT user_id FROM user_account WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "unauthorized", "message" => "User not found in user_account"]);
    exit;
}

$user = $result->fetch_assoc();
$user_id = $user['user_id'];
$stmt->close();

// ✅ Second: query user_home using foreign key user_id
$stmt2 = $conn->prepare("SELECT * FROM user_home WHERE user_id = ?");
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$result2 = $stmt2->get_result();

if ($result2->num_rows > 0) {
    $homeData = $result2->fetch_all(MYSQLI_ASSOC);
    echo json_encode([
        "status" => "success",
        "session_email" => $email,
        "user_id" => $user_id,
        "data" => $homeData
    ]);
} else {
    echo json_encode([
        "status" => "empty",
        "session_email" => $email,
        "user_id" => $user_id,
        "message" => "No data found in user_home"
    ]);
}

$stmt2->close();
$conn->close();
?>
