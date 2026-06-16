<?php

session_start();

if (!isset($_SESSION['usuario']) || !isset($_GET['vaga_id'])) {
    header("Location: home.php");
    exit;
}

$vagaId = (int) $_GET['vaga_id'];

function callAPI($url, $data) {
    $token = $_SESSION['token'] ?? null;

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);

    $headers = [
        "Content-Type: application/json"
    ];

    if ($token) {
        $headers[] = "Authorization: Bearer " . $token;
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    // debug opcional (remove depois)
    if ($httpCode >= 400) {
        echo "<pre>";
        echo "Erro na API\n";
        echo "HTTP: $httpCode\n";
        echo "Response: $response\n";
        exit;
    }

    return $response;
}

$data = [
    "vaga" => [
        "id" => $vagaId
    ]
];

$response = callAPI("http://localhost:3000/candidaturas", $data);


header("Location: candidatura-enviada.php?vaga_id=$vagaId");
exit;
?>