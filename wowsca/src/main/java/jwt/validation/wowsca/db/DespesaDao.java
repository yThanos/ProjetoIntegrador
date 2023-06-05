package jwt.validation.wowsca.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
                Despesa desp = new DespesaDao().getById(this.resultSet.getInt("CODIGO_DESPESA"));
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
                desp.setDtCriacao(this.resultSet.getString("DT_CRIACAO"));
                desp.setDtQuitada(this.resultSet.getString("DT_QUITADA"));

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
                desp.setDtCriacao(this.resultSet.getString("DT_CRIACAO"));
                desp.setDtQuitada(this.resultSet.getString("DT_QUITADA"));
                desp.setAtivo(this.resultSet.getBoolean("ATIVO"));
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return desp;
    }

    public void addDespesa(Despesa despesa){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO DESPESAS (NOME, DESCRICAO, VALOR, DT_CRIACAO, ATIVO) VALUES (?, ?, ?, ?, true) RETURNING CODIGO";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setString(1, despesa.getNome());
            this.preparedStatement.setString(2, despesa.getDescricao());
            this.preparedStatement.setDouble(3, despesa.getValor());
            this.preparedStatement.setString(4, despesa.getDtCriacao());
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
            this.sql = "UPDATE DESPESAS SET ATIVO = false, DT_QUITADA = ? WHERE CODIGO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            LocalDate dataAtual = LocalDate.now();
            DateTimeFormatter formato = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            this.preparedStatement.setString(1, dataAtual.format(formato));
            this.preparedStatement.setInt(2, id);

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
            this.sql = "SELECT * FROM USUARIO_GRUPO_DESPESA WHERE CODIGO_USUARIO = ? and ATIVO = true";

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

    public ArrayList<UsuarioGrupoDespesa> getUsuarioGrupoDespesa(int id){
        ArrayList<UsuarioGrupoDespesa> grupoDespesas = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM USUARIO_GRUPO_DESPESA WHERE CODIGO_USUARIO = ? and ATIVO = true";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, id);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                UsuarioGrupoDespesa grupoDespesa = new UsuarioGrupoDespesa();
                grupoDespesa.setCodigoDespesaGrupo(this.resultSet.getInt("CODIGO_GRUPO_DESPESA"));
                grupoDespesa.setCodigoUsuario(this.resultSet.getInt("CODIGO_USUARIO"));
                grupoDespesa.setValor(this.resultSet.getDouble("VALOR"));
                grupoDespesa.setAtivo(this.resultSet.getBoolean("ATIVO"));
                grupoDespesas.add(grupoDespesa);
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return grupoDespesas;
    }

    public double valorPorDespesadDoGrupo(int user, int grup, int despesa){
        System.out.println(user + " " + grup + " " + despesa);
        double valor = 0.00;
        int usergp = 0;
        try(Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM GRUPO_DESPESA WHERE CODIGO_GRUPO = ? and CODIGO_DESPESA = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, grup);
            this.preparedStatement.setInt(2, despesa);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                usergp = this.resultSet.getInt("codigo");
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
        System.out.println(usergp);
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM USUARIO_GRUPO_DESPESA WHERE CODIGO_USUARIO = ? and CODIGO_GRUPO_DESPESA = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, user);
            this.preparedStatement.setInt(2, usergp);
            this.resultSet = this.preparedStatement.executeQuery();

            while(this.resultSet.next()){
                valor = this.resultSet.getDouble("VALOR");
            }
            System.out.println(valor);
        }catch(SQLException e){
            e.printStackTrace();
        }
        return valor;
    }
}
