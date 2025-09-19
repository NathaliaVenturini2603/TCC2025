<?php
include "conexao.php";

if (isset($_GET['cidade_id'])) {
    $cidadeId = intval($_GET['cidade_id']);
    $sql = "SELECT nome, contato FROM produtores WHERE cidade_id = $cidadeId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<div class='produtor-card'>
                    <strong>{$row['nome']}</strong><br>
                    📞 {$row['contato']}
                  </div>";
        }
    } else {
        echo "<p>Nenhum produtor encontrado para esta cidade.</p>";
    }
}
?>