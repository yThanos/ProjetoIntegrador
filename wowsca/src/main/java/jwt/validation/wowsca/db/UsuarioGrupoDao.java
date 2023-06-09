package jwt.validation.wowsca.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import jwt.validation.wowsca.model.Grupo;
import jwt.validation.wowsca.model.Usuario;
import jwt.validation.wowsca.model.UsuariuoGrupo;

public class UsuarioGrupoDao {
    private String sql;
    private PreparedStatement preparedStatement;
    private ResultSet resultSet;

    public ArrayList<Usuario> getUsersGrupo(int codGrupo){
        ArrayList<Usuario> usuarios = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM USUARIO_GRUPO where CODIGO_GRUPO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, codGrupo);
            this.resultSet = this.preparedStatement.executeQuery();


            while(this.resultSet.next()){
                Usuario user = new UsuarioDao().getUserById(this.resultSet.getInt("CODIGO_USUARIO"));
                usuarios.add(user);
            }

        }catch(SQLException e){
            e.printStackTrace();
        }
        return usuarios;
    }

    public ArrayList<Grupo> getUserGrupos(int codUser){
        ArrayList<Grupo> grupos = new ArrayList<>();
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "SELECT * FROM USUARIO_GRUPO where CODIGO_USUARIO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, codUser);
            this.resultSet = this.preparedStatement.executeQuery();
            
            List<Integer> codGrupos = new ArrayList<>();
            while(this.resultSet.next()){
                codGrupos.add(this.resultSet.getInt("CODIGO_GRUPO"));
            }
            for (Integer codGrupo : codGrupos) {
                Grupo grupo = new GrupoDao().getGrupoById(codGrupo);
                grupos.add(grupo);
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
        return grupos;
    }

    public void addUserGrupo2(int grupo, int user){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO USUARIO_GRUPO (CODIGO_USUARIO, CODIGO_GRUPO) VALUES (?, ?)";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, user);
            this.preparedStatement.setInt(2, grupo);
            this.preparedStatement.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    
    public void addUserGrupo(UsuariuoGrupo userGrupo){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "INSERT INTO USUARIO_GRUPO (CODIGO_USUARIO, CODIGO_GRUPO) VALUES (?, ?)";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, userGrupo.getUsuario().getCodigo());
            this.preparedStatement.setInt(2, userGrupo.getGrupo().getCodigo());
            this.preparedStatement.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }

    public void removeUserGrupo(int user, int grupo){
        try (Connection connection = new ConectaDB().getConexao()){
            this.sql = "DELETE FROM USUARIO_GRUPO WHERE CODIGO_USUARIO = ? AND CODIGO_GRUPO = ?";

            this.preparedStatement = connection.prepareStatement(this.sql);
            this.preparedStatement.setInt(1, user);
            this.preparedStatement.setInt(2, grupo);
            this.preparedStatement.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
}
