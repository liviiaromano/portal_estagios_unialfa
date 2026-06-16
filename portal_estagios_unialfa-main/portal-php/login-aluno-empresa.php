<?php
session_start();

$erro = "";

function fazerLogin($email, $senha)
{
    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "http://localhost:3000/sessions",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json"
        ],
        CURLOPT_POSTFIELDS => json_encode([
            "email" => $email,
            "senha" => $senha
        ])
    ]);

    $response = curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);

    if($status !== 200)
    {
        return false;
    }

    return json_decode($response, true);
}

if(isset($_POST['entrar_aluno']))
{
    $dados = fazerLogin(
        $_POST['email'],
        $_POST['senha']
    );

    if($dados)
    {
        $_SESSION['usuario'] = $dados['usuario'];
        $_SESSION['token'] = $dados['token'];
        $_SESSION['tipo'] = 'ALUNO';

        header("Location: aluno/home.php");
        exit;
    }

    $erro = "Email ou senha inválidos";
}

if(isset($_POST['entrar_empresa']))
{
    $dados = fazerLogin(
        $_POST['email_empresa'],
        $_POST['senha_empresa']
    );

    if($dados)
    {
        $_SESSION['usuario'] = $dados['usuario'];
        $_SESSION['token'] = $dados['token'];
        $_SESSION['tipo'] = 'EMPRESA';

        header("Location: empresa/vagas.php");
        exit;
    }

    $erro = "Email ou senha inválidos";
}
?>



<!DOCTYPE html>
<html lang="pt-BR">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Login Aluno</title>

<link rel="stylesheet" href="assets/css/style.css">

</head>

<body>

<?php if(!empty($erro)): ?>
    <div style="color:red; margin-bottom:15px;">
        <?= $erro ?>
    </div>
<?php endif; ?>

<div class="login-container">

    <div class="login-card">

        <img src="assets/img/logo-unialfa.png" alt="UniALFA">

        <div class="tipo-login">

    <button
        type="button"
        id="btnAluno"
        class="aba ativa"
        onclick="mostrarAluno()">
        Aluno
    </button>

    <button
        type="button"
        id="btnEmpresa"
        class="aba"
        onclick="mostrarEmpresa()">
        Empresa
    </button>

        </div>

        <div id="formAluno">

    <h2>Portal do Aluno</h2>

    <form method="POST">

        <div class="form-group">
            <label>Email</label>

            <input
                type="email"
                name="email"
                class="form-control"
                required>
        </div>

        <div class="form-group">
            <label>Senha</label>

            <input
                type="password"
                name="senha"
                class="form-control"
                required>
        </div>

        <button
            type="submit"
            name="entrar_aluno"
            class="btn-primary">
            Entrar
        </button>

    </form>

</div>


<div id="formEmpresa" style="display:none;">

    <h2>Painel da Empresa</h2>

    <form method="POST">

        <div class="form-group">
            <label>Email Corporativo</label>

            <input
                type="email"
                name="email_empresa"
                class="form-control"
                required>
        </div>

        <div class="form-group">
            <label>Senha</label>

            <input
                type="password"
                name="senha_empresa"
                class="form-control"
                required>
        </div>

        <button
            type="submit"
            name="entrar_empresa"
            class="btn-primary">
            Entrar
        </button>

    </form>

</div>

        <br>

        <a href="#">
            Esqueci minha senha
        </a>

    </div>

</div>
<script>

function mostrarAluno()
{
    document.getElementById("formAluno").style.display = "block";
    document.getElementById("formEmpresa").style.display = "none";

    document.getElementById("btnAluno").classList.add("ativa");
    document.getElementById("btnEmpresa").classList.remove("ativa");
}

function mostrarEmpresa()
{
    document.getElementById("formAluno").style.display = "none";
    document.getElementById("formEmpresa").style.display = "block";

    document.getElementById("btnEmpresa").classList.add("ativa");
    document.getElementById("btnAluno").classList.remove("ativa");
}

</script>
</body>
</html>