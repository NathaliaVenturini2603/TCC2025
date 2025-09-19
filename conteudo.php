<?php include "conexao.php"; ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgroLov</title>
    <link rel="stylesheet" href="stylehome.css">
    <script>
        function carregarProdutores(cidadeId) {
            if (cidadeId === "") {
                document.getElementById("lista-produtores").innerHTML = "<p>Selecione uma cidade na barra de navegação para ver os produtores locais.</p>";
                return;
            }

            // Faz uma requisição AJAX para buscar produtores
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "produtores.php?cidade_id=" + cidadeId, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    document.getElementById("lista-produtores").innerHTML = xhr.responseText;
                }
            };
            xhr.send();
        }
    </script>
</head>

<body>
    <header>
        <div class="navbar">
            <h1 class="logo">🌱 AgroLov</h1>
            <button class="menu-toggle" aria-label="Abrir Menu">&#9776;</button>
            <nav class="nav-links">
                <a href="#inicio">Início</a>
                <a href="#produtores">Produtores</a>
                <a href="#produtos">Produtos</a>
                <a href="#contato">Contato</a>
                <a href="login.html">Login</a>

                <!-- SELECT DE CIDADES VINDO DO BANCO -->
                <select id="select-cidade" onchange="carregarProdutores(this.value)">
                    <option value="">sua cidade</option>
                    <?php
                    $sql = "SELECT * FROM cidades ORDER BY nome";
                    $result = $conn->query($sql);
                    while ($row = $result->fetch_assoc()) {
                        echo "<option value='{$row['id']}'>{$row['nome']}</option>";
                    }
                    ?>
                </select>
            </nav>
        </div>
    </header>

    <section id="inicio" class="hero">
        <h1>Conectando pequenos produtores a consumidores locais no interior de São Paulo</h1>
    </section>

    <section id="produtores" class="container">
        <h2 class="section-title">Produtores</h2>
        <div id="lista-produtores">
            <p>Selecione uma cidade na barra de navegação para ver os produtores locais.</p>
        </div>
    </section>

    <section id="produtos" class="container">
        <h2 class="section-title">Benefícios</h2>
        <div class="grid">
            <div class="card">
                <img src="img/produtores.png.jfif" alt="Produtores">
                <h3>Apoio ao Produtor</h3>
                <p>Ajude pequenos produtores a venderem mais e a terem um preço justo.</p>
            </div>
            <div class="card">
                <img src="img/comidafresca.png.jfif" alt="Produtos">
                <h3>Produtos Frescos</h3>
                <p>Tenha acesso a alimentos frescos, saudáveis e de qualidade direto da fonte.</p>
            </div>
            <div class="card">
                <img src="img/fortalecimentodacomunidade.png" alt="Comunidade">
                <h3>Fortalecimento da Comunidade</h3>
                <p>Incentive a economia local e ajude a reduzir o impacto ambiental.</p>
            </div>
        </div>
    </section>

    <section id="contato" class="container">
        <h2 class="section-title">Contato</h2>
        <p>📧 Email: contato@agrolov.com</p>
        <p>📞 Telefone: (17) 91234-5678</p>
    </section>

    <footer>
        &copy; 2025 AgroLov - Conectando você ao campo 🌾
    </footer>
</body>

</html>