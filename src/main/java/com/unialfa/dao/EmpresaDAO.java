package com.unialfa.dao;

import com.unialfa.model.Empresa;
import com.unialfa.util.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmpresaDAO {

    public List<Empresa> listar() {

        List<Empresa> empresas =
                new ArrayList<>();

        String sql =
                "SELECT * FROM empresas";

        try (
                Connection conn =
                        Conexao.conectar();

                PreparedStatement stmt =
                        conn.prepareStatement(sql);

                ResultSet rs =
                        stmt.executeQuery()
        ) {

            while (rs.next()) {

                Empresa empresa =
                        new Empresa();

                empresa.setId(
                        rs.getInt("id")
                );

                empresa.setNome(
                        rs.getString("nome")
                );

                empresa.setCnpj(
                        rs.getString("cnpj")
                );

                empresa.setEmail(
                        rs.getString("email")
                );

                empresa.setTelefone(
                        rs.getString("telefone")
                );

                empresa.setStatus(
                        rs.getString("status")
                );

                empresas.add(empresa);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return empresas;
    }

    public Empresa buscarPorId(int id) {

        String sql =
                "SELECT * FROM empresas WHERE id = ?";

        try (
                Connection conn =
                        Conexao.conectar();

                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setInt(1, id);

            ResultSet rs =
                    stmt.executeQuery();

            if (rs.next()) {

                Empresa empresa =
                        new Empresa();

                empresa.setId(
                        rs.getInt("id")
                );

                empresa.setNome(
                        rs.getString("nome")
                );

                empresa.setCnpj(
                        rs.getString("cnpj")
                );

                empresa.setEmail(
                        rs.getString("email")
                );

                empresa.setTelefone(
                        rs.getString("telefone")
                );

                empresa.setStatus(
                        rs.getString("status")
                );

                return empresa;
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return null;
    }

    public void aprovar(int id) {

        alterarStatus(
                id,
                "APROVADA"
        );
    }

    public void bloquear(int id) {

        alterarStatus(
                id,
                "BLOQUEADA"
        );
    }

    private void alterarStatus(
            int id,
            String status
    ) {

        String sql =
                "UPDATE empresas " +
                        "SET status = ? " +
                        "WHERE id = ?";

        try (
                Connection conn =
                        Conexao.conectar();

                PreparedStatement stmt =
                        conn.prepareStatement(sql)
        ) {

            stmt.setString(
                    1,
                    status
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
}