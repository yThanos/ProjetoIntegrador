package jwt.validation.wowsca.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jwt.validation.wowsca.db.UsuarioGrupoDao;
import jwt.validation.wowsca.model.Grupo;
import jwt.validation.wowsca.model.Usuario;
import jwt.validation.wowsca.model.UsuariuoGrupo;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/userGrup")
public class UsuarioGrupoController {

    @CrossOrigin
    @PostMapping("/add")
    public void cadastrarUsuarioGrupo(@RequestBody UsuariuoGrupo userGrup){
        new UsuarioGrupoDao().addUserGrupo(userGrup);
    }

    @CrossOrigin
    @PostMapping("/remove")
    public void removerUsuarioGrupo(@RequestBody UsuariuoGrupo userGrup){
        new UsuarioGrupoDao().removeUserGrupo(userGrup.getUsuario().getCodigo(), userGrup.getGrupo().getCodigo());
    }
    
    @CrossOrigin
    @GetMapping("/grupos/{id}")
    public ArrayList<Grupo> getUserGrupos(@PathVariable int id) {
        return new UsuarioGrupoDao().getUserGrupos(id);
    }

    @CrossOrigin
    @GetMapping("/usuarios/{id}")
    public ArrayList<Usuario> getGrupoUsuarios(@PathVariable int id) {
        return new UsuarioGrupoDao().getUsersGrupo(id);
    }
}
