package com.unialfa.gui;

import com.unialfa.model.Aluno;
import com.unialfa.service.AlunoService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.List;

public class TelaAlunos extends JFrame {

    private JTable tabela;
    private DefaultTableModel modelo;

    private final AlunoService service = new AlunoService();

    public TelaAlunos() {

        setTitle("Gestão de Alunos");
        setSize(800, 450);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLayout(new BorderLayout());

        String[] colunas = {
                "ID", "Nome", "Email", "Curso", "Apto"
        };

        modelo = new DefaultTableModel(colunas, 0);
        tabela = new JTable(modelo);

        carregarAlunos();

        JScrollPane scroll = new JScrollPane(tabela);

        JButton btnAtualizar = new JButton("Atualizar");
        JButton btnNovoAluno = new JButton("Novo Aluno");
        JButton btnEditar = new JButton("Editar");
        JButton btnImportar = new JButton("Importar TXT");
        JButton btnAptidao = new JButton("Alterar Aptidão");

        JPanel painelBotoes = new JPanel();

        painelBotoes.add(btnAtualizar);
        painelBotoes.add(btnNovoAluno);
        painelBotoes.add(btnEditar);
        painelBotoes.add(btnImportar);
        painelBotoes.add(btnAptidao);

        // ======================
        // ATUALIZAR
        // ======================
        btnAtualizar.addActionListener(e -> carregarAlunos());

        // ======================
        // NOVO ALUNO
        // ======================
        btnNovoAluno.addActionListener(e -> {

            String nome = JOptionPane.showInputDialog(this, "Nome do aluno:");
            String email = JOptionPane.showInputDialog(this, "Email:");
            String telefone = JOptionPane.showInputDialog(this, "Telefone:");
            String curso = JOptionPane.showInputDialog(this, "Curso:");

            if (nome != null && email != null && curso != null && !nome.isBlank()) {

                Aluno aluno = new Aluno(0, nome, email, telefone, curso, true);

                service.cadastrar(aluno);

                carregarAlunos();
            }
        });

        // ======================
        // EDITAR
        // ======================
        btnEditar.addActionListener(e -> {

            int linha = tabela.getSelectedRow();

            if (linha >= 0) {

                int id = (int) tabela.getValueAt(linha, 0);

                String nome = JOptionPane.showInputDialog(this, "Nome:", tabela.getValueAt(linha, 1));
                String email = JOptionPane.showInputDialog(this, "Email:", tabela.getValueAt(linha, 2));
                String curso = JOptionPane.showInputDialog(this, "Curso:", tabela.getValueAt(linha, 3));

                if (nome != null && email != null && curso != null) {

                    Aluno aluno = new Aluno();
                    aluno.setId(id);
                    aluno.setNome(nome);
                    aluno.setEmail(email);
                    aluno.setCurso(curso);

                    service.atualizar(aluno);

                    carregarAlunos();
                }

            } else {
                JOptionPane.showMessageDialog(this, "Selecione um aluno.");
            }
        });

        // ======================
        // IMPORTAR TXT
        // ======================
        btnImportar.addActionListener(e -> {

            JFileChooser chooser = new JFileChooser();

            if (chooser.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) {

                File arquivo = chooser.getSelectedFile();

                try (BufferedReader reader = new BufferedReader(new FileReader(arquivo))) {

                    String linha;

                    while ((linha = reader.readLine()) != null) {

                        String[] dados = linha.split(";");

                        if (dados.length >= 3) {

                            Aluno aluno = new Aluno(
                                    0,
                                    dados[0],
                                    dados[1],
                                    "",
                                    dados[2],
                                    true
                            );

                            service.cadastrar(aluno);
                        }
                    }

                    carregarAlunos();

                    JOptionPane.showMessageDialog(this, "Importação realizada!");

                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        // ======================
        // APTIDÃO
        // ======================
        btnAptidao.addActionListener(e -> {

            int linha = tabela.getSelectedRow();

            if (linha >= 0) {

                int id = (int) tabela.getValueAt(linha, 0);
                boolean atual = tabela.getValueAt(linha, 4).equals("SIM");

                service.alterarAptidao(id, !atual);

                carregarAlunos();

            } else {
                JOptionPane.showMessageDialog(this, "Selecione um aluno.");
            }
        });

        add(scroll, BorderLayout.CENTER);
        add(painelBotoes, BorderLayout.SOUTH);

        setVisible(true);
    }

    private void carregarAlunos() {

        modelo.setRowCount(0);

        List<Aluno> alunos = service.listar();

        for (Aluno aluno : alunos) {

            modelo.addRow(new Object[]{
                    aluno.getId(),
                    aluno.getNome(),
                    aluno.getEmail(),
                    aluno.getCurso(),
                    aluno.isApto() ? "SIM" : "NÃO"
            });
        }
    }
}