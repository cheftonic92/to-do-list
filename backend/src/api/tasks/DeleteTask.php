<?php

include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Tasks.php");

$conn = new Database();
$db = $conn->getConnection();

// Verificar si el parámetro 'project_id' está presente en la solicitud
$task_id = isset($_GET['task_id']) ? $_GET['task_id'] : null;

if ($task_id) {
    $task = new Tasks($db);
    $task->id = $task_id;

    if ($task->deletetask()) {
        echo json_encode(["message" => "task was deleted."]);
    } else {
        echo json_encode(["message" => "Unable to delete task."]);
    }
} else {
    // Error si el parámetro 'task_id' no está definido
    http_response_code(400);  // Código de error 400 Bad Request
    echo json_encode(["message" => "task ID is missing or invalid."]);
}
