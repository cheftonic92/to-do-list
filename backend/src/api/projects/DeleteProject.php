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

if (!$project->deleteProject($id)) {
    http_response_code(500);
    echo json_encode(
        array(
            'message' => 'Error deleting Project.'
        )
    );
    return;
}

echo json_encode(
    array(
        'message' => 'Project deleted successfully.'
    )
);
