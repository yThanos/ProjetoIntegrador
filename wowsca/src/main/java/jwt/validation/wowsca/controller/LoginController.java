package jwt.validation.wowsca.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jwt.validation.wowsca.db.UsuarioDao;
import jwt.validation.wowsca.model.Usuario;
import jwt.validation.wowsca.security.EmailSender;
import jwt.validation.wowsca.security.JWTUtil;

@CrossOrigin(origins = "*")
@RequestMapping
@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Object> logar(@RequestBody Usuario usuario){
        final Authentication authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword()));
        if(authentication.isAuthenticated()){
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Usuario user = new UsuarioDao().getUserByEmail(usuario.getUsername());
            user.setToken(new JWTUtil().geraToken(usuario.getUsername()));
            
            return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
        }

        return new ResponseEntity<>("Usuario ou senha invalidos!", HttpStatusCode.valueOf(401));
    }

    @CrossOrigin
    @PostMapping("/criarConta")
    public void postUsuario(@RequestBody Usuario usuario) {
        new UsuarioDao().addUser(usuario);
    }

    @CrossOrigin
    @GetMapping("/esqueceuSenha/{email}")
    public void esqueceuSenha(@PathVariable String email) {
        try {
            if(new UsuarioDao().emailExiste(email)){
                EmailSender.getInstance().esqueceuSenha(email);                
            }else{
                throw new RuntimeException("Email não cadastrado!");
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @CrossOrigin
    @GetMapping("/verificarCodigo/{email}/{codigo}")
    public void verificarCodigo(@PathVariable int codigo, @PathVariable String email) {
        if(!EmailSender.getInstance().verificarCodigo(codigo, email)){
            throw new RuntimeException("Codigo invalido!");
        }else{
        }
    }

    @CrossOrigin
    @PutMapping("/alterarSenha/{codigo}")
    public void alterarSenha(@RequestBody Usuario usuario, @PathVariable int codigo) {
        if(EmailSender.getInstance().verificarCodigo(codigo, usuario.getUsername())){
            new UsuarioDao().updateSenha(usuario, usuario.getUsername());
        }
    }
}
