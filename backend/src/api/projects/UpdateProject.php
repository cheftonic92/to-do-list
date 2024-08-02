<?php

include("../../config/Database.php");
include_once("../../models/Projects.php");
include("../../config/Headers.php");

$conn = new Database();
$db = $conn->getConnection();

// Verifica si se proporcionó un ID válido
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(array('message' => 'ID not provided.'));
    exit();
}

$project = new Projects($db);

$id = $_GET['id'];

$data = json_decode(file_get_contents('php://input'));

if ($data) {
    $project->title = $data->title;
    $project->description = $data->description;
    $project->status = $data->status;
    $project->start_date = $data->start_date;
    $project->deadline = $data->deadline;
    $project->created = $data->created;

    if (!$project->updateProject($id)) {
        http_response_code(500);
        echo json_encode(
            array(
                'message' => 'Error al añadir usuario.'
            )
        );
        return;
    }

    echo json_encode(
        array(
            'project' => array(
                'id' => $id,
                'title' => $title,
                'description' => $description,
                'status' => $status,
                'start_date' => $start_date,
                'deadline' => $deadline,
                'created' => $created
            )
        )
    );
} else {
    echo json_encode(array('message' => 'No data provided.'));
}
