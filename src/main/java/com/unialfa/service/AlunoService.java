package com.unialfa.service;

import com.unialfa.dao.AlunoDAO;
import com.unialfa.model.Aluno;

import java.util.List;

public class AlunoService {

    private final AlunoDAO dao = new AlunoDAO();

    public List<Aluno> listar() {
        return dao.listar();
    }

    public void cadastrar(Aluno aluno) {

        if (aluno.getNome() == null || aluno.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome obrigatório");
        }

        if (aluno.getEmail() == null || aluno.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email obrigatório");
        }

        dao.inserir(aluno);
    }

    public void atualizar(Aluno aluno) {

        if (aluno.getId() <= 0) {
            throw new IllegalArgumentException("ID inválido");
        }

        dao.atualizar(aluno);
    }

    public void alterarAptidao(int id, boolean apto) {
        dao.alterarAptidao(id, apto);
    }
}