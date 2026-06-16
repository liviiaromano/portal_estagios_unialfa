package com.unialfa;

import com.unialfa.dao.VagaDAO;
import com.unialfa.model.Vaga;

public class TesteBanco {

    public static void main(String[] args) {

        Vaga vaga = new Vaga(
                0,
                "Estágio Java",
                "Desenvolvimento de sistemas",
                "Umuarama",
                1200.00,
                1
        );

        new VagaDAO().inserir(vaga);

        System.out.println("Vaga cadastrada!");
    }
}