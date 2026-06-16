<?php

session_start();

if(
    !isset($_SESSION['usuario']) ||
    $_SESSION['tipo'] !== 'ALUNO'
)
{
    header("Location: ../login-aluno-empresa.php");
    exit;
}

$id = $_GET['id'] ?? null;

if(!$id)
{
    header("Location: home.php");
    exit;
}

$resposta = file_get_contents(
    "http://localhost:3000/vagas/" . $id
);

$vaga = json_decode($resposta, true);

include "../includes/header.php";

?>

<div class="vaga-container">

    <a href="home.php" class="btn-outline">
        ← Voltar para Listagem
    </a>

<h1>
    <?= htmlspecialchars($vaga['titulo']) ?>
</h1>

<h2>
    <?= htmlspecialchars($vaga['empresa']['nome']) ?>
</h2>

<p class="info-vaga">
    <?= htmlspecialchars($vaga['local']) ?>
    |
    R$ <?= number_format($vaga['salario'], 2, ',', '.') ?>
</p>

    <div class="descricao-vaga">

        <h3>Descrição da Vaga</h3>

<p>
    <?= nl2br(htmlspecialchars($vaga['descricao'])) ?>
</p>

        <br>

        <h3>Requisitos</h3>

        <ul>
            <li>Conhecimento em POO</li>
            <li>Noções de MySQL</li>
            <li>Lógica de Programação</li>
            <li>Git e Github</li>
        </ul>

    </div>

<a href="candidatar.php?vaga_id=<?= $vaga['id'] ?>"
   class="btn-candidatar">
   Candidatar-se
</a>

</div>

<?php include "../includes/footer.php"; ?>