<?php
include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Tasks.php");

$conn = new Database();
$db = $conn->getConnection();

$data = json_decode(file_get_contents('php://input'));  // Obtener datos JSON de la solicitud

if ($data && isset($data->id)) {  // Verifica que se reciban los datos y el ID del proyecto
    $task = new Tasks($db);
    $task->id = $data->id;
    $task->title = $data->title;
    $task->description = $data->description;
    $task->status = $data->status;  // Aquí se maneja el status
    $task->created = $data->created;
    $task->project_id = $data->project_id;
    $task->deadline = $data->deadline;

    if ($task->updateTask()) {
        echo json_encode(["message" => "Project was updated."]);
    } else {
        echo json_encode(["message" => "Unable to update project."]);
    }
} else {
    // Error si el parámetro 'id' o los datos están incompletos
    http_response_code(400);  // Código de error 400 Bad Request
    echo json_encode(["message" => "Incomplete or invalid data."]);
}
