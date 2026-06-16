package com.unialfa.gui;

import javax.swing.*;
import java.awt.*;

public class TelaPrincipal extends JFrame {

    public TelaPrincipal() {

        setTitle("Portal de Estágios UniALFA");
        setSize(500, 400);

        setLocationRelativeTo(null);

        setDefaultCloseOperation(EXIT_ON_CLOSE);

        JPanel painel = new JPanel();
        painel.setLayout(new GridLayout(5, 1, 10, 10));

        JButton btnEmpresas =
                new JButton("Empresas");

        btnEmpresas.addActionListener(e -> {
            new TelaEmpresas();
        });

        painel.add(btnEmpresas);

        JButton btnAlunos =
                new JButton("Alunos");

        btnAlunos.addActionListener(e -> {
            new TelaAlunos();
        });

        painel.add(btnAlunos);

        JButton btnVagas =
                new JButton("Vagas");

        btnVagas.addActionListener(e -> {
            new TelaVagas();
        });

        painel.add(btnVagas);

        JButton btnCandidaturas =
                new JButton("Candidaturas");

        btnCandidaturas.addActionListener(e -> {
            new TelaCandidaturas();
        });

        painel.add(btnCandidaturas);

        JButton btnRelatorios =
                new JButton("Relatórios");

        btnRelatorios.addActionListener(e -> {
            new TelaRelatorios();
        });

        painel.add(btnRelatorios);

        add(painel);

        setVisible(true);
    }
}