package com.unialfa.service;

import com.unialfa.dao.CandidaturaDAO;
import com.unialfa.model.Candidatura;

import java.util.List;

public class CandidaturaService {

    private final CandidaturaDAO dao = new CandidaturaDAO();

    public List<Candidatura> listar() {
        return dao.listar();
    }

    public void candidatar(Candidatura c) {

        if (c.getAlunoId() == null || c.getVagaId() == null) {
            throw new IllegalArgumentException("Aluno e vaga são obrigatórios");
        }

        dao.inserir(c);
    }

    public void alterarStatus(int id, String status) {

        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Status inválido");
        }

        dao.atualizarStatus(id, status);
    }
}