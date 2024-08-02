<?php

include("../../config/Database.php");
include_once("../../models/Projects.php");
include("../../config/Headers.php");

$conn = new Database();
$db = $conn->getConnection();

$project = new Projects($db);

$result = $project->getAll();
$num = $result->rowCount();

if ($num > 0) {
    $projects = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $project_item = array(
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'start_date' => $start_date,
            'deadline' => $deadline,
            'created' => $created,
        );

        array_push($projects, $project_item);
    }

    echo json_encode($projects);
} else {
    echo json_encode(array('message' => 'No projects found.'));
}
