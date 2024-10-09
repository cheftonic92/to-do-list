<?php

include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Projects.php");

$conn = new Database();
$db = $conn->getConnection();

$project = new Projects($db);

if ($user->deleteAllProjects()) {
    echo json_encode(
        array(
            'message' => 'All projects deleted successfully.'
        )
    );
} else {
    http_response_code(500);
    echo json_encode(
        array(
            'message' => 'Error deleting all projects.'
        )
    );
}
