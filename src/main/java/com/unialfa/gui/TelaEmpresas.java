package com.unialfa.gui;

import com.unialfa.model.Empresa;
import com.unialfa.service.EmpresaService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class TelaEmpresas extends JFrame {

    private JTable tabela;
    private DefaultTableModel modelo;

    private final EmpresaService service = new EmpresaService();

    public TelaEmpresas() {

        setTitle("Gestão de Empresas");
        setSize(800, 450);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        String[] colunas = {
                "ID", "Nome", "CNPJ", "Email", "Status"
        };

        modelo = new DefaultTableModel(colunas, 0);
        tabela = new JTable(modelo);

        carregarEmpresas();

        JScrollPane scroll = new JScrollPane(tabela);

        JButton btnAtualizar = new JButton("Atualizar");
        JButton btnAprovar = new JButton("Aprovar Empresa");
        JButton btnBloquear = new JButton("Bloquear Empresa");

        JPanel painel = new JPanel();

        painel.add(btnAtualizar);
        painel.add(btnAprovar);
        painel.add(btnBloquear);

        btnAtualizar.addActionListener(e -> carregarEmpresas());

        btnAprovar.addActionListener(e -> {
            int linha = tabela.getSelectedRow();

            if (linha >= 0) {
                int id = (int) tabela.getValueAt(linha, 0);

                service.aprovar(id);

                carregarEmpresas();

                JOptionPane.showMessageDialog(this,
                        "Empresa aprovada com sucesso!");
            } else {
                JOptionPane.showMessageDialog(this,
                        "Selecione uma empresa.");
            }
        });

        btnBloquear.addActionListener(e -> {
            int linha = tabela.getSelectedRow();

            if (linha >= 0) {
                int id = (int) tabela.getValueAt(linha, 0);

                service.bloquear(id);

                carregarEmpresas();

                JOptionPane.showMessageDialog(this,
                        "Empresa bloqueada com sucesso!");
            } else {
                JOptionPane.showMessageDialog(this,
                        "Selecione uma empresa.");
            }
        });

        add(scroll, BorderLayout.CENTER);
        add(painel, BorderLayout.SOUTH);

        setVisible(true);
    }

    private void carregarEmpresas() {

        modelo.setRowCount(0);

        List<Empresa> empresas = service.listar();

        for (Empresa empresa : empresas) {
            modelo.addRow(new Object[]{
                    empresa.getId(),
                    empresa.getNome(),
                    empresa.getCnpj(),
                    empresa.getEmail(),
                    empresa.getStatus()
            });
        }
    }
}