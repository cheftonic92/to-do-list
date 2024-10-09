<?php
include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Projects.php");

$conn = new Database();
$db = $conn->getConnection();

// Asegúrate de que el parámetro 'client' se reciba correctamente
$client = isset($_GET['client']) ? $_GET['client'] : null;

if ($client) {
    $project = new Projects($db);
    $project->client = $client;

    $stmt = $project->getProjectsByClient();  // Método que busca proyectos por cliente

    $num = $stmt->rowCount();

    if ($num > 0) {
        $projects_arr = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $project_item = [
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "status" => $status,
                "start_date" => $start_date,
                "deadline" => $deadline,
                "client" => $client,
            ];
            $projects_arr[] = $project_item;
        }

        echo json_encode($projects_arr);
    } else {
        echo json_encode(["message" => "No projects found for this client."]);
    }
} else {
    // Respuesta de error si el parámetro 'client' no está definido
    http_response_code(400);  // Código de respuesta 400 Bad Request
    echo json_encode(["message" => "Client parameter is missing or invalid."]);
}
