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

$id = $_GET['id'] ?? null;
$status = $_GET['status'] ?? null;
$vagaId = $_GET['vaga_id'] ?? null;

if(!$id || !$status)
{
    die("Dados inválidos");
}

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "http://localhost:3000/candidaturas/$id/status",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "PATCH",

    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . $_SESSION['token'],
        "Content-Type: application/json"
    ],

    CURLOPT_POSTFIELDS => json_encode([
        "status" => $status
    ])
]);

$resposta = curl_exec($curl);

$statusHttp = curl_getinfo(
    $curl,
    CURLINFO_HTTP_CODE
);

curl_close($curl);

if($statusHttp === 200)
{
    header(
        "Location: candidatos.php?vaga_id=$vagaId"
    );
    exit;
}

echo "<pre>";
echo $resposta;
echo "</pre>";