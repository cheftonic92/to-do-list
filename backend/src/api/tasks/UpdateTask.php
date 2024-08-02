<?php

include("../../config/Database.php");
include_once("../../models/Tasks.php");
include("../../config/Headers.php");

$conn = new Database();
$db = $conn->getConnection();

// Verifica si se proporcionó un ID válido
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(array('message' => 'ID not provided.'));
    exit();
}

$task = new Tasks($db);

$id = $_GET['id'];

$data = json_decode(file_get_contents('php://input'));

if ($data) {
    $task->title = $data->title;
    $task->description = $data->description;
    $task->status = $data->status;
    $task->deadline = $data->deadline;
    $task->created = $data->created;
    $task->project_id = $data->project_id;

    if (!$task->updatetask($id)) {
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
            'task' => array(
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
