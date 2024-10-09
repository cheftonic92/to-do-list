<?php


include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Tasks.php");

// Instanciar la base de datos y el objeto de usuario
$conn = new Database();
$db = $conn->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->title) || empty($data->title)) {
    http_response_code(400);
    echo json_encode(array("message" => "title is required"));
    exit();
}

$task = new Tasks($db);

// Obtener usuario por nombre
$result = $tasks->getTaskByTitle($data->title);

$num = $result->rowCount();

if ($num > 0) {
    $tasks_arr = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $task_item = array(
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'deadline' => $deadline,
            'created' => $created,
            'project_id' => $project_id
        );
        array_push($tasks_arr, $task_item);
    }
    http_response_code(200);
    echo json_encode($tasks_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No users found."));
}
