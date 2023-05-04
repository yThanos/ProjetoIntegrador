package jwt.validation.wowsca.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jwt.validation.wowsca.db.UsuarioGrupoDao;

@RestController
@RequestMapping("/userGrup")
public class UsuarioGrupoController {
    @PostMapping
    public void cadastrarUsuarioGrupo(){
        new UsuarioGrupoDao().addUserGrupo(null);
    }
}
