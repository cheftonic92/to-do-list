<?php

include_once '../../config/Headers.php';
include_once '../../config/Database.php';
include_once '../../models/Tasks.php';

$conn = new Database();
$db = $conn->getConnection();

$data = json_decode(file_get_contents('php://input'));

if ($data) {
    $task = new Tasks($db);
    $task->project_id = $data->project_id;
    $task->title = $data->title;
    $task->description = $data->description;
    $task->status = $data->status;
    $task->deadline = $data->deadline;
    $task->created = $data->created;

    if (!$task->createTask()) {
        http_response_code(500);
        echo json_encode(['message' => 'Error al añadir la tarea.']);
        return;
    }

    echo json_encode(['task' => [
        'id' => $task->id,
        'project_id' => $task->project_id,
        'title' => $task->title,
        'description' => $task->description,
        'deadline' => $task->deadline,
        'status' => $task->status,
        'created' => $task->created,
    ]]);
} else {
    echo json_encode(['message' => 'No data provided.']);
}
