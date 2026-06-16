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

$apiUrl = "http://localhost:3000/vagas";

$resposta = file_get_contents($apiUrl);

$vagas = json_decode($resposta, true);

include "../includes/header.php";

?>

<h1 class="titulo-pagina">
    Vagas Disponíveis
</h1>

<div class="busca">

    <input
        type="text"
        placeholder="Buscar por vaga ou tecnologia..."
    >

   <a href="detalhes-vaga.php" class="btn-secundario">
    Ver Detalhes
</a>

</div>

<div class="grid-vagas">

<?php foreach($vagas as $vaga): ?>

    <div class="card-vaga">

        <div class="logo-empresa">
            LOGO
        </div>

        <div class="titulo-vaga">
            <?= htmlspecialchars($vaga['titulo']) ?>
        </div>

        <div class="nome-empresa">
            <?= htmlspecialchars($vaga['empresa']['nome']) ?>
        </div>

        <div class="tags">

            <div class="tag">
                <?= htmlspecialchars($vaga['local']) ?>
            </div>

            <div class="tag">
                R$ <?= number_format($vaga['salario'], 2, ',', '.') ?>
            </div>

        </div>

        <a
            href="detalhes-vaga.php?id=<?= $vaga['id'] ?>"
            class="btn-secundario"
        >
            Ver Detalhes
        </a>

    </div>

<?php endforeach; ?>

</div>

<?php include "../includes/footer.php"; ?>

