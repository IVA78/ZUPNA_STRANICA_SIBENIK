package backend.security;

import backend.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;


public class UserInfoUserDetails implements UserDetails {

    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserInfoUserDetails(User user) {
        username=user.getUsername();
        password=user.getPassword();

        /*
        authorities = Arrays.stream(user.getTypeOfUser().toUpperCase().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

         */

        authorities = commaSeparatedStringToAuthorityList("ROLE_USER" );

        System.out.println("UserInfoUserDetails\n: USERNAME: " + username + " \n" + "PASSWORD: "+ password + "\n" + "AUTHORITIES: " + authorities.get(0));
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
