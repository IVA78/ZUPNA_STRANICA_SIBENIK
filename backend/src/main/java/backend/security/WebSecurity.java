package backend.security;

import com.cloudinary.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableMethodSecurity(prePostEnabled = true) //this enables method-level security: use @Secured to secure individual methods
@Configuration
@EnableWebSecurity
public class WebSecurity  {

    private JwtAuthEntryPoint authEntryPoint;

    @Autowired
    private AppConfig appConfig; //appConfig.passwordEncoder()

    @Bean
    //authentication
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authenticationProvider(authenticationProvider());

        http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        /*
        * HttpMethod.GET, "/api/events" – točno mapira GET request na /api/events i dopušta pristup svima.
        * /api/events/** – pokriva sve ostale HTTP metode (POST, DELETE, PUT) i zahtijeva ROLE_USER.
        */

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login").permitAll()

                .requestMatchers(HttpMethod.GET, "/api/events").permitAll()
                .requestMatchers("/api/events/**").hasRole("USER")

                .requestMatchers(HttpMethod.GET, "/api/forms").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/forms/*/download").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/forms/*").hasRole("USER")
                .requestMatchers(HttpMethod.POST, "/api/forms").hasRole("USER")


                .requestMatchers(HttpMethod.GET, "/api/links").permitAll()
                .requestMatchers("/api/links/**").hasRole("USER")


                .requestMatchers(HttpMethod.GET, "/api/notifications/all").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/notifications/category/**").permitAll()
                .requestMatchers("/api/notifications/**").hasRole("USER")


                .requestMatchers(HttpMethod.GET, "/api/pages/dto/**").permitAll()
                .requestMatchers("/api/pages/**").hasRole("USER")


                .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()

                .anyRequest().authenticated()
        );

        http.csrf(csrf -> csrf.disable());

        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));


        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(appConfig.passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public  JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "https://zupna-stranica-f-production.up.railway.app", // frontend Render
                "http://localhost:5173"                       // lokalno Vite
        ));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}