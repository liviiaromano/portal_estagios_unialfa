package com.unialfa.gui;

import com.unialfa.dao.CandidaturaDAO;
import com.unialfa.model.Candidatura;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class TelaCandidaturas extends JFrame {

    private JTable tabela;
    private DefaultTableModel modelo;

    private CandidaturaDAO dao = new CandidaturaDAO();

    public TelaCandidaturas() {

        setTitle("Gestão de Candidaturas");
        setSize(800, 400);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        String[] colunas = {
                "ID",
                "Aluno",
                "Vaga",
                "Status"
        };

        modelo = new DefaultTableModel(colunas, 0);
        tabela = new JTable(modelo);

        JScrollPane scroll = new JScrollPane(tabela);

        JButton btnAtualizar = new JButton("Atualizar");
        JButton btnAlterarStatus = new JButton("Alterar Status");

        JPanel painelBotoes = new JPanel();
        painelBotoes.add(btnAtualizar);
        painelBotoes.add(btnAlterarStatus);

        // 🔥 CARREGAR DADOS DO BANCO
        carregarTabela();

        btnAtualizar.addActionListener(e -> carregarTabela());

        btnAlterarStatus.addActionListener(e -> {

            int linha = tabela.getSelectedRow();

            if (linha >= 0) {

                String[] opcoes = {
                        "PENDENTE",
                        "APROVADA",
                        "REPROVADA"
                };

                String novoStatus = (String) JOptionPane.showInputDialog(
                        this,
                        "Selecione o novo status:",
                        "Alterar Status",
                        JOptionPane.PLAIN_MESSAGE,
                        null,
                        opcoes,
                        opcoes[0]
                );

                if (novoStatus != null) {

                    int id = Integer.parseInt(modelo.getValueAt(linha, 0).toString());

                    dao.atualizarStatus(id, novoStatus);

                    carregarTabela();
                }

            } else {

                JOptionPane.showMessageDialog(
                        this,
                        "Selecione uma candidatura."
                );
            }
        });

        add(scroll, BorderLayout.CENTER);
        add(painelBotoes, BorderLayout.SOUTH);

        setVisible(true);
    }

    private void carregarTabela() {

        modelo.setRowCount(0);

        for (Candidatura c : dao.listar()) {

            modelo.addRow(new Object[]{
                    c.getId(),
                    c.getAlunoNome(),
                    c.getVagaTitulo(),
                    c.getStatus()
            });
        }
    }
}