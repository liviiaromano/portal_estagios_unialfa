package com.unialfa.model;

public class Aluno extends Pessoa {

    private String curso;
    private boolean apto;
    private String telefone;

    public Aluno() {
    }

    public Aluno(int id,
                 String nome,
                 String email,
                 String telefone,
                 String curso,
                 boolean apto) {

        super(id, nome, email);

        this.telefone = telefone;
        this.curso = curso;
        this.apto = apto;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public boolean isApto() {
        return apto;
    }

    public void setApto(boolean apto) {
        this.apto = apto;
    }
}