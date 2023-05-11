package jwt.validation.wowsca.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioGrupoDespesa {
    private int codigoDespesaGrupo;
    private int codigoUsuario;
    private double valor;
    private boolean ativo;

}
