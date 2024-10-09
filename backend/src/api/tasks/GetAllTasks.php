<?php

include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Tasks.php");

$conn = new Database();
$db = $conn->getConnection();

$task = new Tasks($db);

$result = $task->getAll();
$num = $result->rowCount();

if ($num > 0) {
    $tasks = array();
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

        array_push($tasks, $task_item);
    }

    echo json_encode($tasks);
} else {
    echo json_encode(array('message' => 'No tasks found.'));
}
