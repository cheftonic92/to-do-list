<?php

include("../../config/Database.php");
include("../../config/Headers.php");
include_once("../../models/Projects.php");

$conn = new Database();
$db = $conn->getConnection();

$data = json_decode(file_get_contents('php://input'));

if ($data) {
    $project = new Projects($db);
    $project->title = $data->title;
    $project->description = $data->description;
    $project->status = $data->status;
    $project->start_date = $data->start_date;
    $project->deadline = $data->deadline;
    $project->created = $data->created;

    if (!$project->createProject()) {
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
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'status' => $project->status,
                'start_date' => $project->start_date,
                'deadline' => $project->deadline,
                'created' => $project->created,
            )
        )
    );
} else {
    echo json_encode(array('message' => 'No data provided.'));
}