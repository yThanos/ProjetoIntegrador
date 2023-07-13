package jwt.validation.wowsca.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import jwt.validation.wowsca.model.Estrategy;

public class GrupoEstrategy implements Estrategy{
    private PreparedStatement preparedStatement;

    @Override
    public void insere(int desp, int codigo) {
        try (Connection connection = new ConectaDB().getConexao()){
            this.preparedStatement = connection.prepareStatement("INSERT INTO GRUPO_DESPESA (CODIGO_GRUPO, CODIGO_DESPESA) VALUES (?, ?)");
            this.preparedStatement.setInt(1, desp);
            this.preparedStatement.setInt(2, codigo);

            this.preparedStatement.execute();

        }catch(SQLException e){
            e.printStackTrace();
        }
    }   
}
