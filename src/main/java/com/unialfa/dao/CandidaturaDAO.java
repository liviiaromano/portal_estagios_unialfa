package com.unialfa.dao;

import com.unialfa.model.Candidatura;
import com.unialfa.util.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CandidaturaDAO {

    public void inserir(Candidatura candidatura) {

        String sql = "INSERT INTO candidaturas(status, alunoId, vagaId) VALUES(?,?,?)";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt = conn.prepareStatement(sql)
        ) {

            stmt.setString(1, candidatura.getStatus());
            stmt.setInt(2, candidatura.getAlunoId());
            stmt.setInt(3, candidatura.getVagaId());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Candidatura> listar() {

        List<Candidatura> lista = new ArrayList<>();

        String sql =
                "SELECT c.id, c.status, " +
                        "a.nome AS aluno_nome, " +
                        "v.titulo AS vaga_titulo " +
                        "FROM candidaturas c " +
                        "JOIN alunos a ON a.id = c.alunoId " +
                        "JOIN vagas v ON v.id = c.vagaId";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()
        ) {

            while (rs.next()) {

                Candidatura c = new Candidatura();

                c.setId(rs.getInt("id"));
                c.setStatus(rs.getString("status"));

                c.setAlunoNome(rs.getString("aluno_nome"));
                c.setVagaTitulo(rs.getString("vaga_titulo"));

                lista.add(c);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    public void atualizarStatus(int id, String status) {

        String sql = "UPDATE candidaturas SET status=? WHERE id=?";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt = conn.prepareStatement(sql)
        ) {

            stmt.setString(1, status);
            stmt.setInt(2, id);

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}