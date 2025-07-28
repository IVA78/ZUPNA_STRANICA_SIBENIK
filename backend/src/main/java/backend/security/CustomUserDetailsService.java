package backend.security;

import backend.entity.User;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userInfo = Optional.ofNullable(userRepository.findUserByUsername(username));

        return userInfo.map(user -> {
                    System.out.println("User found: " + username);
                    UserInfoUserDetails returnUser = new UserInfoUserDetails(user);
                    System.out.println("UserInfoUserDetails " + returnUser.getUsername() + " " + returnUser.getAuthorities());
                    return returnUser;
                })
                .orElseThrow(() -> {
                    System.out.println("User not found: " + username);
                    return new UsernameNotFoundException("User not found: " + username);
                });

    }


}
