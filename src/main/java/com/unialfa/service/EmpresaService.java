package com.unialfa.service;

import com.unialfa.dao.EmpresaDAO;
import com.unialfa.model.Empresa;

import java.util.List;

public class EmpresaService {

    private final EmpresaDAO dao = new EmpresaDAO();

    public List<Empresa> listar() {
        return dao.listar();
    }

    public void aprovar(int id) {
        dao.aprovar(id);
    }

    public void bloquear(int id) {
        dao.bloquear(id);
    }
}