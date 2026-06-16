<?php

class ApiClient
{
    private $baseUrl = 'http://localhost:3000';

    private function request($endpoint)
    {
        $url = $this->baseUrl . $endpoint;

        $response = file_get_contents($url);

        if ($response === false) {
            return [];
        }

        return json_decode($response, true);
    }

    public function listarVagas()
    {
        return $this->request('/vagas');
    }

    public function listarEmpresas()
    {
        return $this->request('/empresas');
    }

    public function listarAlunos()
    {
        return $this->request('/alunos');
    }

    public function listarCandidaturas()
    {
        return $this->request('/candidaturas');
    }

    public function dashboard()
    {
        return $this->request('/dashboard');
    }
}