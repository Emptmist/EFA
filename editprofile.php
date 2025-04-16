<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db_connection.php'; // Include database connection

$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are provided
if (!isset($data['name'], $data['nickname'], $data['sex'], $data['birthdate'], $data['height'], $data['weight'])) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit();
}

// Sanitize and assign data
$name = trim($data['name']);
$nickname = trim($data['nickname']);
$sex = trim($data['sex']);
$birthdate = trim($data['birthdate']);
$height = floatval($data['height']);
$weight = floatval($data['weight']);

// Validate input
if (empty($name) || empty($nickname) || empty($sex) || empty($birthdate) || !$height || !$weight) {
    echo json_encode(["success" => false, "message" => "Invalid or missing input"]);
    exit();
}

// Insert into database
$sql = "INSERT INTO user_profile (name, nickname, sex, birthdate, height, weight) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssdd", $name, $nickname, $sex, $birthdate, $height, $weight);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User profile created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to create profile"]);
}

$stmt->close();
$conn->close();
?>
