package jwt.validation.wowsca.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Despesa {
    private int codigo;
    private String nome;
    private Categoria categoria;
    private String descricao;
    private double valor;
    private int frequencia;
    private Usuario usuario;
    private Grupo grupo;
    private boolean ativo;
    
}
