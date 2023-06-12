package jwt.validation.wowsca.model;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Partes {
    private ArrayList<UsuarioGrupoDespesa> partes;
    private int idDespesa;
}
