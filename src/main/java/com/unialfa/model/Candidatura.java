package com.unialfa.model;

public class Candidatura {

    private int id;
    private String status;

    private Integer alunoId;
    private Integer vagaId;

    // 🔥 CAMPOS PARA EXIBIÇÃO (JOIN)
    private String alunoNome;
    private String vagaTitulo;

    public Candidatura() {
    }

    public Candidatura(int id, String status, Integer alunoId, Integer vagaId, String alunoNome, String vagaTitulo) {
        this.id = id;
        this.status = status;
        this.alunoId = alunoId;
        this.vagaId = vagaId;
        this.alunoNome = alunoNome;
        this.vagaTitulo = vagaTitulo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Integer alunoId) {
        this.alunoId = alunoId;
    }

    public Integer getVagaId() {
        return vagaId;
    }

    public void setVagaId(Integer vagaId) {
        this.vagaId = vagaId;
    }

    public String getAlunoNome() {
        return alunoNome;
    }

    public void setAlunoNome(String alunoNome) {
        this.alunoNome = alunoNome;
    }

    public String getVagaTitulo() {
        return vagaTitulo;
    }

    public void setVagaTitulo(String vagaTitulo) {
        this.vagaTitulo = vagaTitulo;
    }
}