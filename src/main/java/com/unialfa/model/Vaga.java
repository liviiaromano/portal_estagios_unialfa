package com.unialfa.model;

public class Vaga {

    private int id;
    private String titulo;
    private String descricao;
    private String local;
    private double salario;
    private Integer empresaId;

    public Vaga() {
    }

    public Vaga(
            int id,
            String titulo,
            String descricao,
            String local,
            double salario,
            Integer empresaId
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.local = local;
        this.salario = salario;
        this.empresaId = empresaId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public Integer getEmpresaId() {
        return empresaId;
    }

    public void setEmpresaId(Integer empresaId) {
        this.empresaId = empresaId;
    }
}