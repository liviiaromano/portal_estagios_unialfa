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

$vagas = json_decode($resposta, true);

if(isset($_GET['deletar']))
{
    $id = (int) $_GET['deletar'];

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "http://localhost:3000/vagas/" . $id,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer " . $_SESSION['token']
        ]
    ]);

    $resposta = curl_exec($curl);

    $status = curl_getinfo(
        $curl,
        CURLINFO_HTTP_CODE
    );

    curl_close($curl);

    if($status === 200)
    {
        header("Location: vagas.php");
        exit;
    }

    echo "<pre>";
    echo "STATUS: $status\n";
    echo $resposta;
    echo "</pre>";
    exit;
}

include("../includes/header-empresas.php"); 

?>

<div class="painel-vagas">

    <h1 class="titulo-pagina">
        Tabela de Gestão,
        <span>Umuprev</span>
    </h1>

    <table class="tabela-vagas">

<thead>
    <tr>
        <th>VAGA</th>
        <th>DATA DE PUBLICAÇÃO</th>
        <th>STATUS</th>
        <th>AÇÕES</th>
    </tr>
</thead>

        <tbody>

<?php foreach($vagas as $vaga): ?>

<tr>

    <td>
        <?= htmlspecialchars($vaga['titulo']) ?>
    </td>

    <td>
        <?= date(
            'd/m/Y',
            strtotime($vaga['created_at'])
        ) ?>
    </td>

    <td>
        <span class="status ativo">
            ATIVO
        </span>
    </td>

    <td style="white-space: nowrap;">

        <a
            href="candidatos.php?vaga_id=<?= $vaga['id'] ?>"
            class="btn-candidatos"
        >
            Candidatos
        </a>

        <a
            href="editar-vaga.php?id=<?= $vaga['id'] ?>"
            class="btn-editar"
        >
            Editar
        </a>

        <a
            href="?deletar=<?= $vaga['id'] ?>"
            class="btn-encerrar"
            onclick="return confirm('Deseja realmente encerrar esta vaga?')"
        >
            Encerrar
        </a>

    </td>

</tr>

<?php endforeach; ?>

</tbody>

    </table>

    <div class="acoes">
        <a href="publicar-vaga.php" class="btn-primary">
            + Criar Nova Vaga
        </a>
    </div>

</div>