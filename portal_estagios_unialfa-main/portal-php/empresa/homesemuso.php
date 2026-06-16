<?php

session_start();

if(
    !isset($_SESSION['usuario']) ||
    $_SESSION['tipo'] !== 'EMPRESA'
)
{
    header("Location: ../login-aluno-empresa.php");
    exit;
}

$resposta = file_get_contents(
    "http://localhost:3000/vagas"
);

$vagas = json_decode(
    $resposta,
    true
);

$totalVagas = count($vagas);

?>

<div class="boas-vindas">
    <h1>
    Olá,
    <?= htmlspecialchars($_SESSION['usuario']['nome']) ?>
    👋
    </h1>
    <p>Gerencie suas vagas e acompanhe seus candidatos.</p>
</div>

<div class="container">

    <h1 class="titulo-pagina">Painel da Empresa</h1>

    <div class="cards-dashboard">

        <div class="card-dashboard">
            <h2>12</h2>
            <p>Candidaturas Recebidas</p>
        </div>

        <div class="card-dashboard">
            <h2><?= $totalVagas ?></h2>
            <p>Vagas Ativas</p>
        </div>

        <div class="card-dashboard">
            <h2>1</h2>
            <p>Vagas Encerradas</p>
        </div>

    </div>

    <a href="publicar-vaga.php" class="btn-primary">
        Publicar Nova Vaga
    </a>

</div>


<?php include("../includes/footer.php"); ?>