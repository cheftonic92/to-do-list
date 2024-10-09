<?php

include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Projects.php");

$conn = new Database();
$db = $conn->getConnection();

// Verificar si el parámetro 'project_id' está presente en la solicitud
$project_id = isset($_GET['project_id']) ? $_GET['project_id'] : null;

if ($project_id) {
    $project = new Projects($db);
    $project->id = $project_id;

    if ($project->deleteProject()) {
        echo json_encode(["message" => "Project was deleted."]);
    } else {
        echo json_encode(["message" => "Unable to delete project."]);
    }
} else {
    // Error si el parámetro 'project_id' no está definido
    http_response_code(400);  // Código de error 400 Bad Request
    echo json_encode(["message" => "Project ID is missing or invalid."]);
}
