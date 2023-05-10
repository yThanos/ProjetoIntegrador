package jwt.validation.wowsca.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import jwt.validation.wowsca.model.Despesa;
import jwt.validation.wowsca.model.GrupoDespesa;
import jwt.validation.wowsca.model.UsuarioGrupoDespesa;

public class DespesaDao {
    private String sql;
    private PreparedStatement preparedStatement;
    private ResultSet resultSet;

    public ArrayList<Despesa> getUserDespesa(int codUser){
        ArrayList<Despesa> despesas = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            Statement statement = connection.createStatement();
            this.resultSet = statement.executeQuery("SELECT * FROM USUARIO_DESPESA where CODIGO_USUARIO ="+codUser);
            
            List<Integer> codDesp = new ArrayList<Integer>();
            while(this.resultSet.next()){
                codDesp.add(this.resultSet.getInt("CODIGO_DESPESA"));
            }
            for (Integer integer : codDesp) {
                Despesa desp = getById(integer);
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
            this.sql = "SELECT * FROM DESPESAS where CODIGO = ?;";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, ind);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                desp.setCodigo(this.resultSet.getInt("CODIGO"));
                desp.setNome(this.resultSet.getString("NOME"));
                desp.setDescricao(this.resultSet.getString("DESCRICAO"));
                desp.setValor(this.resultSet.getDouble("VALOR"));
                desp.setAtivo(this.resultSet.getBoolean("ATIVO"));
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return desp;
    }

    public void addDespesa(Despesa despesa){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO DESPESAS (NOME, DESCRICAO, VALOR, ATIVO) VALUES (?, ?, ?, true) RETURNING CODIGO";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setString(1, despesa.getNome());
            this.preparedStatement.setString(2, despesa.getDescricao());
            this.preparedStatement.setDouble(3, despesa.getValor());
            this.resultSet = this.preparedStatement.executeQuery();
            if(despesa.getOrigem().contains("U")){
                if(this.resultSet.next()){
                    insereUserDespesa(despesa.getCodigoOrigem(), this.resultSet.getInt("CODIGO"));
                }
            }else if(despesa.getOrigem() == "G"){
                insereGrupDespesa(despesa);
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    private void insereUserDespesa(int origem, int codigo){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO USUARIO_DESPESA (CODIGO_USUARIO, CODIGO_DESPESA) VALUES (?, ?)";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, origem);
            this.preparedStatement.setInt(2, codigo);
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
            this.preparedStatement.setInt(4, id);

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

    public ArrayList<Despesa> getDespesasByUserGrup(int id){
        ArrayList<Despesa> despesas = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM USUARIO_GRUPO_DESPESA WHERE CODIGO_USUARIO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, id);
            this.resultSet = this.preparedStatement.executeQuery();

            List<Integer> codigos = new ArrayList<>();
            while(this.resultSet.next()){
                codigos.add(this.resultSet.getInt("CODIGO_GRUPO_DESPESA"));
            }
            for(int i = 0; i < codigos.size(); i++){
                GrupoDespesa gd = getGrupoDespesaById(codigos.get(i));
                despesas.add(getById(gd.getCodigoDespesa()));
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return despesas;
    }
    public GrupoDespesa getGrupoDespesaById(int id){
        GrupoDespesa grupoDespesa = new GrupoDespesa();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM GRUPO_DESPESA WHERE CODIGO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, id);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                grupoDespesa.setCodigo(this.resultSet.getInt("CODIGO"));
                grupoDespesa.setCodigoDespesa(this.resultSet.getInt("CODIGO_DESPESA"));
                grupoDespesa.setCodigoGrupo(this.resultSet.getInt("CODIGO_GRUPO"));
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return grupoDespesa;
    }
    public double valorDespesasByUserGrup(int id){
        ArrayList<UsuarioGrupoDespesa> grupoDespesas = new ArrayList<>();
        double valor = 0.00;
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM USUARIO_GRUPO_DESPESA WHERE CODIGO_USUARIO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, id);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                UsuarioGrupoDespesa grupoDespesa = new UsuarioGrupoDespesa();
                grupoDespesa.setValor(this.resultSet.getDouble("VALOR"));
                grupoDespesas.add(grupoDespesa);
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        for(UsuarioGrupoDespesa gd: grupoDespesas){
            valor += gd.getValor();
        }
        return valor;
    }
}
