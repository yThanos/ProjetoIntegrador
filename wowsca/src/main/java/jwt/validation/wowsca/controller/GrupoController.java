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
import jwt.validation.wowsca.db.GrupoDao;
import jwt.validation.wowsca.db.UsuarioGrupoDao;
import jwt.validation.wowsca.model.Grupo;
import jwt.validation.wowsca.model.Partes;
import jwt.validation.wowsca.model.Usuario;
import jwt.validation.wowsca.model.UsuarioGrupoDespesa;
import jwt.validation.wowsca.model.ViewDG;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/grupo")
public class GrupoController {

    @CrossOrigin
    @PostMapping("/{id}")
    public void cadastrarGrupo(@RequestBody Grupo grupo, @PathVariable int id){
        new GrupoDao().addGrupo(grupo, id);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Grupo getGrupoById(@PathVariable int id){
        return new GrupoDao().getGrupoById(id);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public void updateGrupo(@RequestBody Grupo grupo, @PathVariable int id){
        new GrupoDao().updateGrupo(grupo, id);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteGrupo(@PathVariable int id){
        new GrupoDao().deleteGrupo(id);
    }

    @CrossOrigin
    @GetMapping("/all")
    public ArrayList<Grupo> getAllGrupos(){
        return new GrupoDao().getGrupos();
    }

    @CrossOrigin
    @GetMapping("/byUser/{id}")
    public ArrayList<Grupo> getGruposByUser(@PathVariable int id){
        return new UsuarioGrupoDao().getUserGrupos(id);
    }

    @CrossOrigin
    @GetMapping("/usersByGrupo/{id}")
    public ArrayList<Usuario> getUsersByGrupo(@PathVariable int id){
        return new UsuarioGrupoDao().getUsersGrupo(id);
    }

    @CrossOrigin
    @GetMapping("/{grupo}/{user}/{despesa}")
    public double getValorDespesa(@PathVariable int grupo, @PathVariable int user, @PathVariable int despesa){
        return new DespesaDao().valorPorDespesadDoGrupo(user, grupo, despesa);
    }

    @CrossOrigin
    @GetMapping("/partes/{grupo}/{user}")
    public ArrayList<UsuarioGrupoDespesa> getPartes(@PathVariable int grupo, @PathVariable int user) {
        return new DespesaDao().getPartes(grupo, user);
    }

    @CrossOrigin
    @PostMapping("/partes")
    public void addParte(@RequestBody Partes parte) {
        new DespesaDao().addPartes(parte);
    }

    @CrossOrigin
    @GetMapping("/despesaView/{id}")
    public ViewDG getViewDG(@PathVariable int id) {
        System.out.println("viewDG para despesa id: "+id);
        return new DespesaDao().getView(id);
    }

    @CrossOrigin
    @GetMapping("/grupoPartes/{grupo}/{user}")
    public double getPartesGrupo(@PathVariable int grupo, @PathVariable int user) {
        return new DespesaDao().getPartesGrupoUser(grupo, user);
    }

    @CrossOrigin
    @PostMapping("/quitar")
    public void quitarPartes(@RequestBody UsuarioGrupoDespesa ugd) {
        System.out.println("teste edpnt");
        new DespesaDao().quitarPartes(ugd);
    }
}
