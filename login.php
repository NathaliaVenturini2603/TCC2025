<?php
session_start();
include "conexao.php";

$msg = "";

if (isset($_POST['login'])) {
    $email = $conn->real_escape_string($_POST['email']);
    $senha = $_POST['senha'];

    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($senha, $user['senha'])) {
            $_SESSION['id'] = $user['id'];
            $_SESSION['nome'] = $user['nome'];
            header("Location: conteudo.php");
            exit;
        } else {
            $msg = "Senha incorreta!";
        }
    } else {
        $msg = "Email não cadastrado!";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Login - AgroLov</title>
    <style>
        body {
            font-family: Arial;
            background: #f2f2f2;
            padding: 50px;
        }

        form {
            background: #fff;
            padding: 20px;
            max-width: 400px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        button {
            width: 100%;
            padding: 10px;
            background: #2e7d32;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background: #388e3c;
        }

        p {
            color: red;
            text-align: center;
        }
    </style>
</head>

<body>

    <h2>Login</h2>
    <form method="post" action="">
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="senha" placeholder="Senha" required>
        <button type="submit" name="login">Entrar</button>
    </form>
    <p><?php echo $msg; ?></p>
    <p>Não tem conta? <a href="cadastro.php">Cadastre-se</a></p>

</body>

</html>