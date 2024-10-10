<?php

class Projects
{
    private $conn;
    private $table_name = 'projects';

    public $id;
    public $title;
    public $description;
    public $status;
    public $start_date;
    public $deadline;
    public $client;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function getProjectByTitle($title)
    {
        $query = "SELECT id, title, description, status, start_date, deadline, client 
        FROM " . $this->table_name . " WHERE title = :title";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":title", $title);
        $stmt->execute();
        return $stmt;
    }

    public function createProject()
    {
        $query = "INSERT INTO " . $this->table_name . " SET title=:title, description=:description, 
        status=:status, start_date=:start_date, deadline=:deadline, client=:client";
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->start_date = date('Y-m-d H:i:s');  // Genera la fecha y hora actuales
        $this->deadline = htmlspecialchars(strip_tags($this->deadline));
        $this->client = htmlspecialchars(strip_tags($this->client));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":client", $this->client);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Método para actualizar un proyecto existente
    public function updateProject()
    {
        // Consulta SQL para actualizar un proyecto
        $query = "UPDATE " . $this->table_name . "
                  SET title = :title,
                      description = :description,
                      status = :status,
                      start_date = :start_date,
                      deadline = :deadline,
                      client = :client
                  WHERE id = :id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Limpiar los datos para evitar inyecciones SQL
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->deadline = htmlspecialchars(strip_tags($this->deadline));
        $this->client = htmlspecialchars(strip_tags($this->client));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Vincular los parámetros
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':start_date', $this->start_date);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':client', $this->client);
        $stmt->bindParam(':id', $this->id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true;
        }

        // Imprimir error si algo sale mal (para depuración)
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function deleteProject()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    public function deleteAllProjects()
    {
        $query = "DELETE FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getProjectsByClient()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE client = :client";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':client', $this->client);

        $stmt->execute();

        return $stmt;
    }
}
