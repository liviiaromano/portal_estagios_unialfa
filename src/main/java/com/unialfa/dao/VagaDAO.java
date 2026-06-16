package com.unialfa.dao;

import com.unialfa.model.Vaga;
import com.unialfa.util.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class VagaDAO {

    public void inserir(Vaga vaga) {

        String sql =
                "INSERT INTO vagas(titulo,descricao,local,salario,empresa_id) " +
                        "VALUES(?,?,?,?,?)";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setString(1, vaga.getTitulo());
            stmt.setString(2, vaga.getDescricao());
            stmt.setString(3, vaga.getLocal());
            stmt.setDouble(4, vaga.getSalario());
            stmt.setObject(5, vaga.getEmpresaId());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Vaga> listar() {

        List<Vaga> vagas =
                new ArrayList<>();

        String sql =
                "SELECT * FROM vagas";

        try (
                Connection conn = Conexao.conectar();
                PreparedStatement stmt =
                        conn.prepareStatement(sql);
                ResultSet rs =
                        stmt.executeQuery()
        ) {

            while (rs.next()) {

                Vaga vaga =
                        new Vaga();

                vaga.setId(
                        rs.getInt("id")
                );

                vaga.setTitulo(
                        rs.getString("titulo")
                );

                vaga.setDescricao(
                        rs.getString("descricao")
                );

                vaga.setLocal(
                        rs.getString("local")
                );

                vaga.setSalario(
                        rs.getDouble("salario")
                );

                vaga.setEmpresaId(
                        rs.getInt("empresa_id")
                );

                vagas.add(vaga);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return vagas;
    }

    public void excluir(int id) {

        String sql =
                "DELETE FROM vagas WHERE id=?";

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