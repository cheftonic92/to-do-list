<?php
require 'config.php';
require 'Task.php';

// Configurar cabeceras CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$method = $_SERVER['REQUEST_METHOD'];
$task = new Task($pdo);

if ($method === 'OPTIONS') {
    // Responder a las solicitudes preflight (OPTIONS)
    http_response_code(200);
    exit();
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $response = $task->getTask($_GET['id']);
        } else {
            $response = $task->getAllTasks();
        }
        echo json_encode($response);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $task->createTask($data['title'], $data['description']);
        echo json_encode(['id' => $id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $response = $task->updateTask($data['id'], $data['title'], $data['description'], $data['status']);
        echo json_encode(['success' => $response]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $response = $task->deleteTask($data['id']);
        echo json_encode(['success' => $response]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
