<?php

session_start();

if(!isset($_SESSION['usuario']) || $_SESSION['tipo'] !== 'ALUNO') {
    header("Location: ../login-aluno-empresa.php");
    exit;
}

$usuarioId = $_SESSION['usuario']['id'];

function callAPI($url) {

    $token = $_SESSION['token'] ?? null;

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $headers = [
        "Content-Type: application/json"
    ];

    if($token) {
        $headers[] = "Authorization: Bearer " . $token;
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);

    curl_close($ch);

    return $response;
}

$candidaturasResponse = callAPI("http://localhost:3000/candidaturas");

$candidaturas = json_decode($candidaturasResponse, true);

if(!is_array($candidaturas)) {
    $candidaturas = [];
}

$candidaturas = array_filter($candidaturas, function($c) use ($usuarioId) {
    return isset($c['aluno']['id']) && $c['aluno']['id'] == $usuarioId;
});

$lista = [];

foreach($candidaturas as $c) {

    $lista[] = [
        'vaga' => $c['vaga']['titulo'] ?? 'N/A',
        'empresa' => $c['vaga']['empresa']['nome'] ?? 'N/A',
        'data' => $c['created_at'] ?? date('d/m/Y'),
        'status' => $c['status'] ?? 'PENDENTE'
    ];
}


include "../includes/header.php";

?>

<div class="candidaturas-container">

    <h1>Minhas Candidaturas</h1>

    <p>
        Acompanhe abaixo o status dos processos seletivos
        em que você se inscreveu.
    </p>

    <table class="tabela-candidaturas">

        <thead>
            <tr>
                <th>VAGA</th>
                <th>EMPRESA</th>
                <th>DATA DE ENVIO</th>
                <th>STATUS</th>
            </tr>
        </thead>

        <tbody>
<?php foreach($lista as $c): ?>
    <tr>
        <td><?= htmlspecialchars($c['vaga']) ?></td>
        <td><?= htmlspecialchars($c['empresa']) ?></td>
        <td><?= htmlspecialchars($c['data']) ?></td>
        <td class="status-<?= strtolower($c['status']) ?>">
            <?= htmlspecialchars($c['status']) ?>
        </td>
    </tr>
<?php endforeach; ?>
</tbody>

    </table>

</div>

<?php include "../includes/footer.php"; ?>