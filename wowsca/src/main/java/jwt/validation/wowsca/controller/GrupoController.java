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

import jwt.validation.wowsca.db.GrupoDao;
import jwt.validation.wowsca.db.UsuarioGrupoDao;
import jwt.validation.wowsca.model.Grupo;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/grupo")
public class GrupoController {

    @CrossOrigin
    @PostMapping
    public void cadastrarGrupo(@RequestBody Grupo grupo){
        new GrupoDao().addGrupo(grupo);
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

}
