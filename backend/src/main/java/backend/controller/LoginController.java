package backend.controller;

import backend.DTO.LoginForm;
import backend.entity.User;
import backend.security.JWTGenerator;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping()
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginForm loginform) throws IOException {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "lozinka";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println(encodedPassword);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginform.getUsername(), loginform.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        String username = jwtGenerator.getUsernameFromJWT(token);

        User user = userService.login(username);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(AuthenticationException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}