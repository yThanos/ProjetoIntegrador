package jwt.validation.wowsca.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuariuoGrupo {
    private int codigo;
    private Usuario usuario;
    private Grupo grupo;
    
}
