<?php

class Vaga
{
    private $titulo;
    private $empresa;

    public function __construct($titulo, $empresa)
    {
        $this->titulo = $titulo;
        $this->empresa = $empresa;
    }

    public function getTitulo()
    {
        return $this->titulo;
    }

    public function getEmpresa()
    {
        return $this->empresa;
    }
}