package jwt.validation.wowsca.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    //define o filtro que é usado pra verificar autenticção da requisição
    @Bean
    public FiltroAutenticacao filtroAutenticacao() throws Exception{
        return new FiltroAutenticacao();
    }

    //injeta userdetailsservice para o authenticationmanager usar o loadbyusername ou algo assim a relação deles é confusa
    @Autowired
    private UserDetailsService userDetailsService;

    //authenticationManager recebe username password monta userdatails e verifica se ta certo usado pro filtro
    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
            .userDetailsService(userDetailsService)
            .passwordEncoder(new BCryptPasswordEncoder());
        return authenticationManagerBuilder.build();
    }

    //define as configuração do httpsecurity cors, sessioncreation, endpoints e o filtro
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests((auth)-> auth
            //login e criar cotna
            .requestMatchers(HttpMethod.POST, "/login").permitAll()
            .requestMatchers(HttpMethod.POST, "/criarConta").permitAll()
            .requestMatchers(HttpMethod.GET, "/esqueceuSenha/{email}").permitAll()
            .requestMatchers(HttpMethod.GET, "/verificarCodigo/{email}/{codigo}").permitAll()
            .requestMatchers(HttpMethod.PUT, "/alterarSenha/{codigo}").permitAll()
            //usuarios
            .requestMatchers(HttpMethod.GET, "usuario/all").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.GET, "/usuario/byId/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/usuario/byEmail/{email}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/usuario/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/usuario/{id}").hasAnyAuthority("USER", "ADMIN")
            //grupos
            .requestMatchers(HttpMethod.GET, "/grupo/all").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.POST, "/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/grupo/byUser/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/grupo/usersByGrupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "grupo/{grupo}/{user}/{despesa}").hasAnyAuthority("USER", "ADMIN")
            //despesas
            .requestMatchers(HttpMethod.GET, "/despesa/all").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.POST, "/despesa").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/usuario/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/byId/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/despesa/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/despesa/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/byUserGrup/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/valorDespesasByUserGrup/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/usuarioGrupoDespesa/{id}").hasAnyAuthority("USER", "ADMIN")
            //userGrups
            .requestMatchers(HttpMethod.GET, "/userGrup/all").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.GET, "/userGrup/usuarios/{id}").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.GET, "/userGrup/grupos/{id}").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.POST, "/userGrup/add").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.POST, "/userGrup/remove").hasAuthority("ADMIN")
            );

        http.addFilterBefore(this.filtroAutenticacao(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    //configura o cors permitindo qualquer origem e qualquer metodo
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("**")
                .allowedOrigins("**")
                .allowedMethods("**");
            }
        };
    }
}
