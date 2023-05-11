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
    private String descricao;
    private double valor;
    private String dtCriacao;
    private String dtQuitada;
    private boolean ativo;
    private String origem;
    private int codigoOrigem;
    
}
