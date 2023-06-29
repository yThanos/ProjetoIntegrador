package jwt.validation.wowsca.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioGrupoDespesa {
    private int codigoDespesa;
    private int codigoGrupo;
    private int codigoUsuario;
    private String nomeUser;
    private double valor;
    private boolean ativo;

}
