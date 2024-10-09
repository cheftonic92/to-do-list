<?php

include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Tasks.php");

$conn = new Database();
$db = $conn->getConnection();

$task = new Tasks($db);

if ($task->deleteAllTasks()) {
    echo json_encode(
        array(
            'message' => 'All Tasks deleted successfully.'
        )
    );
} else {
    http_response_code(500);
    echo json_encode(
        array(
            'message' => 'Error deleting all Tasks.'
        )
    );
}
