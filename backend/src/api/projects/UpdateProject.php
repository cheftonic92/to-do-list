<?php
include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Projects.php");

$conn = new Database();
$db = $conn->getConnection();

$data = json_decode(file_get_contents('php://input'));  // Obtener datos JSON de la solicitud

if ($data && isset($data->id)) {  // Verifica que se reciban los datos y el ID del proyecto
    $project = new Projects($db);
    $project->id = $data->id;
    $project->title = $data->title;
    $project->description = $data->description;
    $project->client = $data->client;
    $project->start_date = $data->start_date;
    $project->deadline = $data->deadline;
    $project->status = $data->status;  // Aquí se maneja el status

    if ($project->updateProject()) {
        echo json_encode(["message" => "Project was updated."]);
    } else {
        echo json_encode(["message" => "Unable to update project."]);
    }
} else {
    // Error si el parámetro 'id' o los datos están incompletos
    http_response_code(400);  // Código de error 400 Bad Request
    echo json_encode(["message" => "Incomplete or invalid data."]);
}
