<?php

session_start();

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

            <tr>
                <td>Auxiliar de TI</td>
                <td>Umuprev</td>
                <td>10/06/2026</td>
                <td class="status-analise">Em Análise</td>
            </tr>

            <tr>
                <td>Estágio Frontend</td>
                <td>E-Code</td>
                <td>08/06/2026</td>
                <td class="status-aprovado">Aprovado</td>
            </tr>

            <tr>
                <td>Analista de Dados</td>
                <td>Gazin</td>
                <td>02/06/2026</td>
                <td class="status-reprovado">Reprovado</td>
            </tr>

        </tbody>

    </table>

</div>

<?php include "../includes/footer.php"; ?>