<?php

class ApiClient
{
    public function listarVagas()
    {
        return [
            [
                "id" => 1,
                "titulo" => "Estágio em Desenvolvimento Web",
                "empresa" => "Tech Solutions",
                "cidade" => "Umuarama",
                "modalidade" => "Presencial"
            ],

            [
                "id" => 2,
                "titulo" => "Estágio em Suporte TI",
                "empresa" => "InfoTech",
                "cidade" => "Umuarama",
                "modalidade" => "Híbrido"
            ],

            [
                "id" => 3,
                "titulo" => "Estágio Front-end",
                "empresa" => "WebMaster",
                "cidade" => "Maringá",
                "modalidade" => "Remoto"
            ]
        ];
    }
}