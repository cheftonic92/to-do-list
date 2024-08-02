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
    public $created;

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
        $query = "SELECT id, title, description, status, start_date, deadline, created 
        FROM " . $this->table_name . " WHERE title = :title";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":title", $title);
        $stmt->execute();
        return $stmt;
    }

    public function createProject()
    {
        $query = "INSERT INTO " . $this->table_name . " SET title=:title, description=:description, 
        status=:status, start_date=:start_date, deadline=:deadline, created=:created";
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->deadline = htmlspecialchars(strip_tags($this->deadline));
        $this->created = htmlspecialchars(strip_tags($this->created));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":created", $this->created);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function updateProject($id)
    {
        $query = "INSERT INTO " . $this->table_name . " SET title=:title, description=:description, 
        status=:status, start_date=:start_date, deadline=:deadline, created=:created WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->deadline = htmlspecialchars(strip_tags($this->deadline));
        $this->created = htmlspecialchars(strip_tags($this->created));
        $this->id = htmlspecialchars(strip_tags($id));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":created", $this->created);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function deleteProject($id)
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


    public function deleteAllProjects()
    {
        $query = "DELETE FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
