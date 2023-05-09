package jwt.validation.wowsca.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGrupDesp {
    private int codigo;
    private int codigoUsuario;
    private int codigoDespesa;
    private double valor;
}
