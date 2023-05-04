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

import jwt.validation.wowsca.db.CategoriaDao;
import jwt.validation.wowsca.model.Categoria;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    
    @PostMapping
    public void cadastrarCategoria(@RequestBody Categoria categoria){
        new CategoriaDao().addCategoria(categoria);   
    }

    @GetMapping("/user/{id}")
    public ArrayList<Categoria> getUserCategorias(@PathVariable int codUser){
        return new CategoriaDao().getUserCategorias(codUser);
    }

    @GetMapping("/grupo/{id}")
    public ArrayList<Categoria> getGrupoCategorias(@PathVariable int codGrupo){
        return new CategoriaDao().getGrupoCategorias(codGrupo);
    }

    @GetMapping("/{id}")
    public Categoria getCategoriaById(@PathVariable int id){
        return new CategoriaDao().getCategoriaById(id);
    }
    
    @PutMapping("/{id}")
    public void updateCategoria(@RequestBody Categoria categoria, @PathVariable int id){
        new CategoriaDao().updateCategoria(categoria, id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategoria(@PathVariable int id){
        new CategoriaDao().deleteCategoria(id);
    }
    @GetMapping("/all")
    public ArrayList<Categoria> getAllCategorias(){
        return new CategoriaDao().getAllCategorias();
    }
}
