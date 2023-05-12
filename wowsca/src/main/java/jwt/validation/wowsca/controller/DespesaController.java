package jwt.validation.wowsca.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jwt.validation.wowsca.db.DespesaDao;
import jwt.validation.wowsca.model.Despesa;
import jwt.validation.wowsca.model.UsuarioGrupoDespesa;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/despesa")
public class DespesaController {

    @CrossOrigin
    @GetMapping("/usuario/{id}")
    public ArrayList<Despesa> getUserDespesas(@PathVariable int id) {
        return new DespesaDao().getUserDespesa(id);
    }

    @CrossOrigin
    @GetMapping("/grupo/{id}")
    public ArrayList<Despesa> getGroupDespesas(@PathVariable int id) {
        return new DespesaDao().getGrupDespesa(id);
    }

    @CrossOrigin
    @GetMapping("/all")
    public ArrayList<Despesa> getAllDespesas() {
        return new DespesaDao().getAllDespesas();
    }

    @CrossOrigin
    @GetMapping("/byId/{id}")
    public Despesa getDespesaById(@PathVariable int id) {
        return new DespesaDao().getById(id);
    }
    
    @CrossOrigin
    @PostMapping
    public void insertDespesa(@RequestBody Despesa despesa) {
        new DespesaDao().addDespesa(despesa);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public void updateDespesa(@PathVariable int id, @RequestBody Despesa despesa) {
        new DespesaDao().updateDespesa(despesa, id);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteDespesa(@PathVariable int id) {
        new DespesaDao().deleteDespesa(id);
    }

    @CrossOrigin
    @GetMapping("/byUserGrup/{id}")
    public ArrayList<Despesa> getDespesasByUserGrup(@PathVariable int id) {
        return new DespesaDao().getDespesasByUserGrup(id);
    }

    @CrossOrigin
    @GetMapping("/valorDespesasByUserGrup/{id}")
    public double getValorDespesasByUserGrup(@PathVariable int id) {
        return new DespesaDao().valorDespesasByUserGrup(id);
    }

    @CrossOrigin
    @GetMapping("/usuarioGrupoDespesa/{id}")
    public ArrayList<UsuarioGrupoDespesa> getUsuarioGrupoDespesa(@PathVariable int id) {
        return new DespesaDao().getUsuarioGrupoDespesa(id);
    }
}
