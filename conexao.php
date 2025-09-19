<?php
$host = "localhost:3307";
$user = "root";  
$pass = "";      
$dbname = "agrolov";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}
?>
