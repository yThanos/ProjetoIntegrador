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
    public SecurityFilterChain filterChain(HttpSecurity htpp) throws Exception{
        htpp.cors().and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests((auth)-> auth
            //login e criar cotna
            .requestMatchers(HttpMethod.POST, "/login").permitAll()
            .requestMatchers(HttpMethod.POST, "/criarConta").permitAll()
            //usuarios
            .requestMatchers(HttpMethod.GET, "usuario/all").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.GET, "/usuario/byId/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/usuario/byEmail/{email}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/usuario/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/usuario/{id}").hasAnyAuthority("USER", "ADMIN")
            //categorias
            .requestMatchers(HttpMethod.POST, "/categoria").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/categoria/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/categoria/user/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/categoria/all").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/categoria/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/categoria/{id}").hasAnyAuthority("USER", "ADMIN")
            //grupos
            .requestMatchers(HttpMethod.GET, "/grupo/all").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.POST, "/grupo").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/grupo/user/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/grupo/{id}").hasAnyAuthority("USER", "ADMIN")
            /* despesas //ajeitar a relação despesa/user desesa/grupo
            .requestMatchers(HttpMethod.POST, "/despesa").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, "/despesa/user/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/despesa/{id}").hasAnyAuthority("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/despesa/{id}").hasAnyAuthority("USER", "ADMIN") */
            );
        
        htpp.addFilterBefore(this.filtroAutenticacao(), UsernamePasswordAuthenticationFilter.class);
        
        return htpp.build();
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
