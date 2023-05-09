package jwt.validation.wowsca.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrupoDespesa {
    private int codigo;
    private int codigoGrupo;
    private int codigoDespesa;
}
