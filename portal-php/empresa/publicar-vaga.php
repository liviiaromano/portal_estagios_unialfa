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

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $dados = [
        'titulo' => $_POST['titulo'],
        'descricao' => $_POST['descricao'],
        'local' => $_POST['local'],
        'salario' => (float) $_POST['salario']
    ];

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => 'http://localhost:3000/vagas',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $_SESSION['token']
        ],
        CURLOPT_POSTFIELDS => json_encode($dados)
    ]);

    $resposta = curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);

    if($status === 201)
    {
        header('Location: vagas.php');
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

<div class="form-card">

    <h1 class="titulo-pagina">
        Publicar Nova Vaga
    </h1>

    <form method="POST">

        <label>Título da Vaga</label>
        <input
        type="text"
        name="titulo"
        class="form-control"
        placeholder="Ex: Estágio Front-End"
        required
        >

        <label>Descrição da Vaga</label>
        <textarea
        name="descricao"
        rows="5"
        placeholder="Descreva as atividades da vaga..."
        required
        ></textarea>

        <label>Requisitos</label>
        <textarea
            rows="4"
            placeholder="Ex: HTML, CSS, JavaScript..."
            required
        ></textarea>

        <label>Cidade</label>
        <input
        type="text"
        name="local"
        class="form-control"
        placeholder="Ex: Umuarama - PR"
        required
        >

        <label>Modalidade</label>

        <select required>
            <option value="">Selecione</option>
            <option>Presencial</option>
            <option>Híbrido</option>
            <option>Remoto</option>
        </select>

        <label>Quantidade de Vagas</label>
        <input
            type="number"
            class="form-control"
            min="1"
            required
        >

        <label>Data Limite para Candidaturas</label>
        <input
            type="date"
            class="form-control"
            required
        >

        <label>Salário</label>
        <input
        type="number"
        name="salario"
        class="form-control"
        min="0"
        step="0.01"
        required
        >

        <a href="vagas.php" class="btn-secundario"> Cancelar</a>

        <button type="submit" class="btn-primary"> Publicar Vaga </button>

    </form>

</div>
