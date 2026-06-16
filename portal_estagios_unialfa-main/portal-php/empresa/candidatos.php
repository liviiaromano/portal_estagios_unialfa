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

$vagaId = $_GET['vaga_id'] ?? null;




if(!$vagaId) {
    die("Vaga não informada");
}

include("../includes/header-empresas.php");

function callAPI($url, $token)
{
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $token,
        "Content-Type: application/json"
    ]);

    $response = curl_exec($ch);

    curl_close($ch);

    return $response;
}

$vagaResponse = callAPI(
    "http://localhost:3000/vagas/" . $vagaId,
    $_SESSION['token']
);


$vaga = json_decode($vagaResponse, true);
if(!is_array($vaga)) {
    die("Erro ao carregar vaga");
}


$candidatosResponse = callAPI(
    "http://localhost:3000/candidaturas/vaga/" . $vagaId,
    $_SESSION['token']
);

$candidatos = json_decode($candidatosResponse, true);

if(!is_array($candidatos)) {
    $candidatos = [];
}

?>

<div class="container-candidatos">

    <a href="vagas.php" class="btn-voltar">
        ← Voltar para Vagas
    </a>

<h1 class="titulo-candidatos">
    Candidatos - Vaga:
    <?= htmlspecialchars($vaga['titulo']) ?>
</h1>

    <p class="subtitulo">
    Total de candidatos: <strong><?= count($candidatos) ?></strong>
    </p>

    <div class="tabela-container">

        <table class="tabela-candidatos">

            <thead>
                <tr>
                    <th>NOME</th>
                    <th>CURSO</th>
                    <th>CURRÍCULO</th>
                    <th>STATUS</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>

            <tbody>

<?php foreach($candidatos as $c): ?>

<tr>

    <td>
        <?= htmlspecialchars($c['aluno']['nome']) ?>
    </td>

    <td>
        <?= htmlspecialchars($c['aluno']['curso']) ?>
    </td>

<td>

    <a
        href="../assets/curriculos/curriculo-modelo.pdf"
        class="btn-curriculo"
        target="_blank"
    >
        📄 Currículo
    </a>

</td>

    <td>

        <?php if($c['status'] === 'PENDENTE'): ?>

            <span class="status-pendente">
                PENDENTE
            </span>

        <?php elseif($c['status'] === 'APROVADA'): ?>

            <span class="status-aprovado">
                APROVADA
            </span>

        <?php else: ?>

            <span class="status-reprovado">
                REPROVADA
            </span>

        <?php endif; ?>

    </td>

    <td>

<a
    href="atualizar-status.php?id=<?= $c['id'] ?>&status=APROVADA&vaga_id=<?= $vagaId ?>"
    class="btn-aprovar"
    onclick="return confirm('Aprovar candidato?')"
>
    Aprovar
</a>

<a
    href="atualizar-status.php?id=<?= $c['id'] ?>&status=REPROVADA&vaga_id=<?= $vagaId ?>"
    class="btn-reprovar"
    onclick="return confirm('Reprovar candidato?')"
>
    Reprovar
</a>

    </td>

</tr>

<?php endforeach; ?>

</tbody>

        </table>

    </div>

</div>
