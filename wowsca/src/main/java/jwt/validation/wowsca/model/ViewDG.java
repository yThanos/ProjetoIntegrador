package jwt.validation.wowsca.model;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewDG {
    private int codigo;
    private String nome;
    private String descricao;
    private String data;
    private double valor;
    private ArrayList<Parte> partes;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    private class Parte{
        private double valor;
        private String nome;
        private boolean pago;
    }
}
