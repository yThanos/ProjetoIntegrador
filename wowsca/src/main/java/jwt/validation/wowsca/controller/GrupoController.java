package jwt.validation.wowsca.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jwt.validation.wowsca.db.GrupoDao;
import jwt.validation.wowsca.model.Grupo;

@RestController
@RequestMapping("/grupo")
public class GrupoController {
    @PostMapping
    public void cadastrarGrupo(@RequestBody Grupo grupo){
        new GrupoDao().addGrupo(grupo);
    }

    @GetMapping("/user/{id}")
    public ArrayList<Grupo> getGrupoUser(@PathVariable int id){
        return new GrupoDao().getUserGrupos(id);
    }

    @GetMapping("/{id}")
    public Grupo getGrupoById(@PathVariable int id){
        return new GrupoDao().getGrupoById(id);
    }

    @PutMapping("/{id}")
    public void updateGrupo(@RequestBody Grupo grupo, @PathVariable int id){
        new GrupoDao().updateGrupo(grupo, id);
    }

    @DeleteMapping("/{id}")
    public void deleteGrupo(@PathVariable int id){
        new GrupoDao().deleteGrupo(id);
    }

    @GetMapping("/all")
    public ArrayList<Grupo> getAllGrupos(){
        return new GrupoDao().getGrupos();
    }
}
