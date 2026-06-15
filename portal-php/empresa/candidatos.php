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
include("../includes/header-empresas.php"); 

?>
<div class="container-candidatos">

    <a href="vagas.php" class="btn-voltar">
        ← Voltar para Vagas
    </a>

    <h1 class="titulo-candidatos">
        Candidatos - Vaga: Auxiliar de TI
    </h1>

    <p class="subtitulo">
        Total de candidatos: <strong>3</strong>
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

                <tr>
                    <td>Eduardo</td>
                    <td>Sistemas para Internet</td>

                    <td>
                        <a href="#" class="btn-curriculo">
                            📄 Baixar PDF
                        </a>
                        
                    </td>

                    <td>
                        <span class="status-analise">
                            Em Análise
                        </span>
                    </td>

                    <td>
                        <div class="acoes">

                            <button class="btn-aprovar">
                                Aprovar
                            </button>

                            <button class="btn-reprovar">
                                Reprovar
                            </button>

                        </div>
                    </td>

                </tr>

                <tr>
                    <td>Isa</td>
                    <td>Sistemas para Internet</td>

                    <td>
                        <a href="#" class="btn-curriculo">
                            📄 Baixar PDF
                        </a>
                    </td>

                    <td>
                        <span class="status-analise">
                            Em Análise
                        </span>
                    </td>

                    <td>
                        <div class="acoes">

                            <button class="btn-aprovar">
                                Aprovar
                            </button>

                            <button class="btn-reprovar">
                                Reprovar
                            </button>

                        </div>
                    </td>

                </tr>

                <tr>
                    <td>Livia</td>
                    <td>Sistemas para Internet</td>

                    <td>
                        <a href="#" class="btn-curriculo">
                            📄 Baixar PDF
                        </a>
                    </td>

                    <td>
                        <span class="status-analise">
                            Em Análise
                        </span>
                    </td>

                    <td>
                        <div class="acoes">

                            <button class="btn-aprovar">
                                Aprovar
                            </button>

                            <button class="btn-reprovar">
                                Reprovar
                            </button>

                        </div>
                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>
