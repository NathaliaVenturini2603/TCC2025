<?php
session_start();
include "conexao.php";

$msg = "";

if (isset($_POST['cadastrar'])) {
    $nome = $conn->real_escape_string($_POST['nome']);
    $email = $conn->real_escape_string($_POST['email']);
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $verifica = $conn->query("SELECT id FROM usuarios WHERE email='$email'");
    if ($verifica->num_rows > 0) {
        $msg = "Email já cadastrado!";
    } else {
        $sql = "INSERT INTO usuarios (nome,email,senha) VALUES ('$nome','$email','$senha')";
        if ($conn->query($sql)) {
            $msg = "Cadastro realizado com sucesso! Agora faça login.";
        } else {
            $msg = "Erro ao cadastrar: ".$conn->error;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastro - AgroLov</title>
    <style>
        body { font-family: Arial; background:#f2f2f2; padding:50px; }
        form { background:#fff; padding:20px; max-width:400px; margin:auto; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.2);}
        input { width:100%; padding:10px; margin:8px 0; border-radius:5px; border:1px solid #ccc;}
        button { width:100%; padding:10px; background:#2e7d32; color:white; border:none; border-radius:5px; cursor:pointer;}
        button:hover { background:#388e3c; }
        p { color:red; text-align:center; }
    </style>
</head>
<body>

<h2>Cadastro</h2>
<form method="post" action="">
    <input type="text" name="nome" placeholder="Nome" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="senha" placeholder="Senha" required>
    <button type="submit" name="cadastrar">Cadastrar</button>
</form>
<p><?php echo $msg; ?></p>
<p>Já tem conta? <a href="login.php">Login</a></p>

</body>
</html>
