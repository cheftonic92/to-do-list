<?php


include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Projects.php");

// Instanciar la base de datos y el objeto de usuario
$conn = new Database();
$db = $conn->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->title) || empty($data->title)) {
    http_response_code(400);
    echo json_encode(array("message" => "title is required"));
    exit();
}

$project = new Projects($db);

// Obtener usuario por nombre
$result = $projects->getProjectByTitle($data->title);

$num = $result->rowCount();

if ($num > 0) {
    $projects_arr = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $project_item = array(
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'start_date' => $start_date,
            'deadline' => $deadline,
            'client' => $client
        );
        array_push($projects_arr, $project_item);
    }
    http_response_code(200);
    echo json_encode($projects_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No users found."));
}
