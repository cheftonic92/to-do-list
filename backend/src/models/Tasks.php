<?php

class Tasks
{
    private $conn;
    private $table_name = 'tasks';

    public $id;
    public $title;
    public $description;
    public $status;
    public $deadline;
    public $created;
    public $project_id;

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

    public function getTaskByTitle($title)
    {
        $query = "SELECT id, title, description, status, deadline, created, project_id 
        FROM " . $this->table_name . " WHERE title = :title";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":title", $title);
        $stmt->execute();
        return $stmt;
    }

    public function createTask()
    {
        $query = "INSERT INTO " . $this->table_name . " SET title=:title, description=:description, 
        status=:status, deadline=:deadline, created=:created, project_id=:project_id";
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->deadline = htmlspecialchars(strip_tags($this->deadline));
        $this->created = htmlspecialchars(strip_tags($this->created));
        $this->project_id = htmlspecialchars(strip_tags($this->project_id));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":created", $this->created);
        $stmt->bindParam(":project_id", $this->project_id);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function updateTask($id)
    {
        $query = "INSERT INTO " . $this->table_name . " SET title=:title, description=:description, 
        status=:status, deadline=:deadline, created=:created, project_id=:project_id WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($id));
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->deadline = htmlspecialchars(strip_tags($this->deadline));
        $this->created = htmlspecialchars(strip_tags($this->created));
        $this->project_id = htmlspecialchars(strip_tags($this->project_id));

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":created", $this->created);
        $stmt->bindParam(":project_id", $this->project_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function deleteTask($id)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }


    public function deleteAllTasks()
    {
        $query = "DELETE FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
