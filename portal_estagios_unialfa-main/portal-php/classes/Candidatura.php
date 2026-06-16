<?php

class Candidatura
{
    private $id;
    private $vagaId;
    private $alunoId;
    private $status;

    public function __construct($id, $vagaId, $alunoId, $status)
    {
        $this->id = $id;
        $this->vagaId = $vagaId;
        $this->alunoId = $alunoId;
        $this->status = $status;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getVagaId()
    {
        return $this->vagaId;
    }

    public function getAlunoId()
    {
        return $this->alunoId;
    }

    public function getStatus()
    {
        return $this->status;
    }
}