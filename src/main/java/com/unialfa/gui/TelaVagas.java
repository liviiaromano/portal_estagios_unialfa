package com.unialfa.gui;

import com.unialfa.dao.VagaDAO;
import com.unialfa.model.Vaga;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class TelaVagas extends JFrame {

    private JTable tabela;
    private DefaultTableModel modelo;

    public TelaVagas() {

        setTitle("Gestão de Vagas");
        setSize(800, 450);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        String[] colunas = {
                "ID",
                "Título",
                "Descrição",
                "Local",
                "Salário",
                "Empresa ID"
        };

        modelo = new DefaultTableModel(colunas, 0);
        tabela = new JTable(modelo);

        carregarVagas();

        JScrollPane scroll = new JScrollPane(tabela);

        JButton btnAtualizar = new JButton("Atualizar");
        JButton btnNovaVaga = new JButton("Nova Vaga");
        JButton btnExcluir = new JButton("Excluir");

        JPanel painelBotoes = new JPanel();

        painelBotoes.add(btnAtualizar);
        painelBotoes.add(btnNovaVaga);
        painelBotoes.add(btnExcluir);

        btnAtualizar.addActionListener(e -> carregarVagas());

        btnNovaVaga.addActionListener(e -> {

            String titulo =
                    JOptionPane.showInputDialog(
                            this,
                            "Título:"
                    );

            String descricao =
                    JOptionPane.showInputDialog(
                            this,
                            "Descrição:"
                    );

            String local =
                    JOptionPane.showInputDialog(
                            this,
                            "Local:"
                    );

            String salarioTexto =
                    JOptionPane.showInputDialog(
                            this,
                            "Salário:"
                    );

            String empresaTexto =
                    JOptionPane.showInputDialog(
                            this,
                            "ID da Empresa:"
                    );

            try {

                double salario =
                        Double.parseDouble(salarioTexto);

                Integer empresaId =
                        Integer.parseInt(empresaTexto);

                Vaga vaga = new Vaga(
                        0,
                        titulo,
                        descricao,
                        local,
                        salario,
                        empresaId
                );

                new VagaDAO().inserir(vaga);

                carregarVagas();

                JOptionPane.showMessageDialog(
                        this,
                        "Vaga cadastrada!"
                );

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Dados inválidos!"
                );
            }
        });

        btnExcluir.addActionListener(e -> {

            int linha =
                    tabela.getSelectedRow();

            if (linha >= 0) {

                int id =
                        Integer.parseInt(
                                tabela.getValueAt(
                                        linha,
                                        0
                                ).toString()
                        );

                new VagaDAO().excluir(id);

                carregarVagas();

            } else {

                JOptionPane.showMessageDialog(
                        this,
                        "Selecione uma vaga."
                );
            }
        });

        add(scroll, BorderLayout.CENTER);
        add(painelBotoes, BorderLayout.SOUTH);

        setVisible(true);
    }

    private void carregarVagas() {

        modelo.setRowCount(0);

        List<Vaga> vagas =
                new VagaDAO().listar();

        for (Vaga vaga : vagas) {

            modelo.addRow(new Object[]{
                    vaga.getId(),
                    vaga.getTitulo(),
                    vaga.getDescricao(),
                    vaga.getLocal(),
                    vaga.getSalario(),
                    vaga.getEmpresaId()
            });
        }
    }
}