<?php

session_start();

include "../includes/header.php";

?>

<div class="perfil-container">

    <div class="perfil-card">

        <div class="perfil-topo">

            <h1>Meu Perfil</h1>

            <a href="../login-aluno-empresa.php" class="btn-sair">
                Sair da Conta
            </a>

        </div>

        <div class="perfil-grid">

            <div class="dados">

                <label>Nome Completo</label>
                <input type="text" value="João Silva">

                <label>RA</label>
                <input type="text" value="250447">

                <label>Curso</label>
                <input type="text" value="Tecnologia em Sistemas para Internet">

                <label>E-mail</label>
                <input type="email" value="joao@email.com">

                <label>Telefone</label>
                <input type="text" value="(44) 99999-9999">

                <button class="btn-principal">
                    Salvar Dados
                </button>

            </div>

            <div class="curriculo">

                <h2>Documentos</h2>

                <div class="upload-box">

                    <div class="icone-upload">
                        📄
                    </div>

                    <p>Currículo Atual</p>

                    <small>curriculo.pdf</small>

                </div>

                <input
                    type="file"
                    class="input-arquivo"
                >

            </div>

        </div>

    </div>

</div>

<?php include "../includes/footer.php"; ?>