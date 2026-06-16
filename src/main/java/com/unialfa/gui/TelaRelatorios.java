package com.unialfa.gui;

import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class TelaRelatorios extends JFrame {

    public TelaRelatorios() {

        setTitle("Relatórios");
        setSize(400, 250);
        setLocationRelativeTo(null);
        setLayout(new GridLayout(4, 1, 10, 10));

        JButton btnEmpresas =
                new JButton("Relatório Empresas");

        JButton btnAlunos =
                new JButton("Relatório Alunos");

        JButton btnVagas =
                new JButton("Relatório Vagas");

        JButton btnCandidaturas =
                new JButton("Relatório Candidaturas");

        btnEmpresas.addActionListener(e ->
                gerarArquivo("empresas.txt"));

        btnAlunos.addActionListener(e ->
                gerarArquivo("alunos.txt"));

        btnVagas.addActionListener(e ->
                gerarArquivo("vagas.txt"));

        btnCandidaturas.addActionListener(e ->
                gerarArquivo("candidaturas.txt"));

        add(btnEmpresas);
        add(btnAlunos);
        add(btnVagas);
        add(btnCandidaturas);

        setVisible(true);
    }

    private void gerarArquivo(String nomeArquivo) {

        try {

            File pastaRelatorios = new File("relatorios");

            if (!pastaRelatorios.exists()) {
                pastaRelatorios.mkdir();
            }

            FileWriter writer = new FileWriter("relatorios/" + nomeArquivo);

            if (nomeArquivo.equals("alunos.txt")) {

                com.unialfa.dao.AlunoDAO dao = new com.unialfa.dao.AlunoDAO();

                writer.write("RELATÓRIO DE ALUNOS\n\n");

                for (var a : dao.listar()) {
                    writer.write(
                            a.getId() + " - " +
                                    a.getNome() + " - " +
                                    a.getEmail() + "\n"
                    );
                }

            } else if (nomeArquivo.equals("empresas.txt")) {

                com.unialfa.dao.EmpresaDAO dao = new com.unialfa.dao.EmpresaDAO();

                writer.write("RELATÓRIO DE EMPRESAS\n\n");

                for (var e : dao.listar()) {
                    writer.write(
                            e.getId() + " - " +
                                    e.getNome() + " - " +
                                    e.getStatus() + "\n"
                    );
                }

            } else if (nomeArquivo.equals("vagas.txt")) {

                com.unialfa.dao.VagaDAO dao = new com.unialfa.dao.VagaDAO();

                writer.write("RELATÓRIO DE VAGAS\n\n");

                for (var v : dao.listar()) {
                    writer.write(
                            v.getId() + " - " +
                                    v.getTitulo() + " - " +
                                    v.getLocal() + "\n"
                    );
                }

            } else if (nomeArquivo.equals("candidaturas.txt")) {

                com.unialfa.dao.CandidaturaDAO dao = new com.unialfa.dao.CandidaturaDAO();

                writer.write("RELATÓRIO DE CANDIDATURAS\n\n");

                for (var c : dao.listar()) {
                    writer.write(
                            c.getId() + " - " +
                                    c.getAlunoNome() + " - " +
                                    c.getVagaTitulo() + " - " +
                                    c.getStatus() + "\n"
                    );
                }
            }

            writer.close();

            JOptionPane.showMessageDialog(
                    this,
                    "Arquivo gerado em: relatorios/" + nomeArquivo
            );

        } catch (Exception e) {

            JOptionPane.showMessageDialog(
                    this,
                    "Erro ao gerar relatório"
            );

            e.printStackTrace();
        }
    }
}