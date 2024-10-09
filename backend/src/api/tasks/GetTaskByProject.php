<?php

// Incluir configuraciones necesarias
include("../../config/Headers.php");
include("../../config/Database.php");
include_once("../../models/Tasks.php");

// Obtener la conexión a la base de datos
$conn = new Database();
$db = $conn->getConnection();

// Verificar que el parámetro project_id se ha pasado
if (isset($_GET['project_id'])) {
    // Limpiar y asignar el project_id recibido
    $project_id = htmlspecialchars(strip_tags($_GET['project_id']));

    // Crear una instancia del modelo de Tareas
    $task = new Tasks($db);
    $task->project_id = $project_id;

    // Obtener las tareas por project_id
    $stmt = $task->getTasksByProject();
    $num = $stmt->rowCount();

    // Verificar si hay tareas
    if ($num > 0) {
        $tasks_arr = [];

        // Obtener el contenido de las filas
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $task_item = [
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "status" => $status,
                "created" => $created,
                "deadline" => $deadline,
                "project_id" => $project_id
            ];

            $tasks_arr[] = $task_item; // Añadir la tarea al array de tareas
        }

        // Establecer el código de respuesta - 200 OK
        http_response_code(200);
        echo json_encode($tasks_arr);
    } else {
        // No hay tareas encontradas para el project_id proporcionado
        http_response_code(404);
        echo json_encode(["message" => "No tasks found for this project."]);
    }
} else {
    // Parámetro project_id no proporcionado
    http_response_code(400);
    echo json_encode(["message" => "Invalid request. Project ID is required."]);
}
