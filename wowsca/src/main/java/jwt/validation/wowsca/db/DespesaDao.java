package jwt.validation.wowsca.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import jwt.validation.wowsca.model.Despesa;

public class DespesaDao {
    private String sql;
    private PreparedStatement preparedStatement;
    private ResultSet resultSet;

    public ArrayList<Despesa> getUserDespesa(int codUser){
        ArrayList<Despesa> despesas = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM USUARIO_DESPESA where CODIGO_USUARIO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, codUser);
            this.resultSet = this.preparedStatement.executeQuery();


            while(this.resultSet.next()){
                Despesa desp = getById(this.resultSet.getInt("CODIGO_DESPESA"));
                despesas.add(desp);
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return despesas;
    }

    public ArrayList<Despesa> getGrupDespesa(int codGrup){
        ArrayList<Despesa> despesas = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM GRUPO_DESPESA where CODIGO_GRUPO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, codGrup);
            this.resultSet = this.preparedStatement.executeQuery();


            while(this.resultSet.next()){
                Despesa desp = getById(this.resultSet.getInt("CODIGO_DESPESA"));
                despesas.add(desp);
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return despesas;
    }

    public ArrayList<Despesa> getAllDespesas(){
        ArrayList<Despesa> despesas = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM DESPESAS";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                Despesa desp = new Despesa();
                desp.setCodigo(this.resultSet.getInt("CODIGO"));
                desp.setNome(this.resultSet.getString("NOME"));
                desp.setDescricao(this.resultSet.getString("DESCRICAO"));
                desp.setValor(this.resultSet.getDouble("VALOR"));

                despesas.add(desp);
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return despesas;
    }

    public Despesa getById(int ind){
        Despesa desp = new Despesa();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM DESPESAS where CODIGO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, ind);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                desp.setCodigo(this.resultSet.getInt("CODIGO"));
                desp.setNome(this.resultSet.getString("NOME"));
                desp.setDescricao(this.resultSet.getString("DESCRICAO"));
                desp.setValor(this.resultSet.getDouble("VALOR"));
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return desp;
    }

    public void addDespesa(Despesa despesa){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO DESPESAS (NOME, DESCRICAO, VALOR, ATIVO) VALUES (?, ?, ?, true)";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setString(1, despesa.getNome());
            this.preparedStatement.setString(2, despesa.getDescricao());
            this.preparedStatement.setDouble(3, despesa.getValor());
            if(despesa.getOrigem() == "U"){
                insereUserDespesa(despesa);
            }else if(despesa.getOrigem() == "G"){
                insereGrupDespesa(despesa);
            }
            this.preparedStatement.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    private void insereUserDespesa(Despesa despesa){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO USUARIO_DESPESA (CODIGO_USUARIO, CODIGO_DESPESA) VALUES (?, ?)";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, despesa.getCodigoOrigem());
            this.preparedStatement.setInt(2, despesa.getCodigo());

            this.preparedStatement.execute();

        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    private void insereGrupDespesa(Despesa despesa){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO USUARIO_DESPESA (CODIGO_GRUPO, CODIGO_DESPESA) VALUES (?, ?)";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, despesa.getCodigoOrigem());
            this.preparedStatement.setInt(2, despesa.getCodigo());

            this.preparedStatement.execute();
            int codigo = this.preparedStatement.getGeneratedKeys().getInt(1);

        }catch(SQLException e){
            e.printStackTrace();
        }
    }

    public void updateDespesa(Despesa despesa, int id){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "UPDATE DESPESAS SET NOME = ?, DESCRICAO = ?, VALOR = ? WHERE CODIGO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setString(1, despesa.getNome());
            this.preparedStatement.setString(2, despesa.getDescricao());
            this.preparedStatement.setDouble(3, despesa.getValor());
            this.preparedStatement.setInt(6, id);

            this.preparedStatement.execute();

        }catch(SQLException e){
            e.printStackTrace();
        }
    }

    public void deleteDespesa(int id){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "UPDATE DESPESAS SET ATIVO = false WHERE CODIGO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, id);

            this.preparedStatement.execute();

        }catch(SQLException e){
            e.printStackTrace();
        }
    }
}
