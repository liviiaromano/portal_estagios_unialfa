package com.unialfa.service;

import com.unialfa.dao.VagaDAO;
import com.unialfa.model.Vaga;

import java.util.List;

public class VagaService {

    private final VagaDAO dao = new VagaDAO();

    public List<Vaga> listar() {
        return dao.listar();
    }

    public void cadastrar(Vaga vaga) {
        dao.inserir(vaga);
    }
}