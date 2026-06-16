<?php
session_start();

$vagaId = $_GET['vaga_id'] ?? null;

include "../includes/header.php";

function callAPI($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

$vaga = null;

if($vagaId) {
    $vagaResponse = callAPI("http://localhost:3000/vagas/" . $vagaId);
    $vaga = json_decode($vagaResponse, true);
}

?>

<div class="sucesso-container">

    <div class="sucesso-card">

        <div class="icone-sucesso">
            ✓
        </div>

        <h1>Candidatura Enviada!</h1>

<?php if($vaga): ?>
    Seu perfil foi encaminhado para a vaga: <strong><?= htmlspecialchars($vaga['titulo']) ?></strong>.
<?php else: ?>
    Seu perfil foi encaminhado para a empresa.
<?php endif; ?>

    <a href="minhas-candidaturas.php">
    ← Ver minhas candidaturas
    </a>


</div>

<?php include "../includes/footer.php"; ?>