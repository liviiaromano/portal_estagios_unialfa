package com.unialfa.dao;

import com.unialfa.model.Aluno;
import com.unialfa.util.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AlunoDAO {

    public void inserir(Aluno aluno) {

        String sql =
                "INSERT INTO alunos(nome,email,senha,curso,aptoEstagio) " +
                        "VALUES(?,?,?,?,?)";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setString(1, aluno.getNome());
            stmt.setString(2, aluno.getEmail());
            stmt.setString(3, "123456");
            stmt.setString(4, aluno.getCurso());
            stmt.setBoolean(5, aluno.isApto());

            stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();
        }
    }

    public List<Aluno> listar() {

        List<Aluno> alunos =
                new ArrayList<>();

        String sql =
                "SELECT * FROM alunos";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql);
                ResultSet rs =
                        stmt.executeQuery()
        ) {

            while (rs.next()) {

                Aluno aluno =
                        new Aluno();

                aluno.setId(
                        rs.getInt("id")
                );

                aluno.setNome(
                        rs.getString("nome")
                );

                aluno.setEmail(
                        rs.getString("email")
                );

                aluno.setCurso(
                        rs.getString("curso")
                );

                aluno.setApto(
                        rs.getBoolean("aptoEstagio")
                );

                alunos.add(aluno);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return alunos;
    }

    public Aluno buscarPorId(int id) {

        String sql =
                "SELECT * FROM alunos WHERE id = ?";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setInt(1, id);

            ResultSet rs =
                    stmt.executeQuery();

            if (rs.next()) {

                Aluno aluno =
                        new Aluno();

                aluno.setId(
                        rs.getInt("id")
                );

                aluno.setNome(
                        rs.getString("nome")
                );

                aluno.setEmail(
                        rs.getString("email")
                );

                aluno.setCurso(
                        rs.getString("curso")
                );

                aluno.setApto(
                        rs.getBoolean("aptoEstagio")
                );

                return aluno;
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return null;
    }

    public void atualizar(Aluno aluno) {

        String sql =
                "UPDATE alunos " +
                        "SET nome = ?, email = ?, curso = ? " +
                        "WHERE id = ?";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setString(
                    1,
                    aluno.getNome()
            );

            stmt.setString(
                    2,
                    aluno.getEmail()
            );

            stmt.setString(
                    3,
                    aluno.getCurso()
            );

            stmt.setInt(
                    4,
                    aluno.getId()
            );

            stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();
        }
    }

    public void alterarAptidao(
            int id,
            boolean apto
    ) {

        String sql =
                "UPDATE alunos " +
                        "SET aptoEstagio = ? " +
                        "WHERE id = ?";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setBoolean(
                    1,
                    apto
            );

            stmt.setInt(
                    2,
                    id
            );

            stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();
        }
    }

    public void excluir(int id) {

        String sql =
                "DELETE FROM alunos WHERE id = ?";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setInt(1, id);

            stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();
        }
    }
}