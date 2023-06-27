//package com.praktikosEgzaminas.examTask.user;
//
//import java.util.HashSet;
//import java.util.Set;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.praktikosEgzaminas.examTask.dto.UserDTO;
//import com.praktikosEgzaminas.examTask.login.Role;
//
//@Service
//public class UserService implements UserDetailsService {
//
//	private UserRepository userRepository;
//	private ModelMapper modelMapper;
//
//	@Autowired
//	public UserService(UserRepository userRepository, ModelMapper modelMapper) {
//
//		this.userRepository = userRepository;
//		this.modelMapper = modelMapper;
//
//	}
//
//	public boolean existsByUsername(String username) {
//
//		return userRepository.existsByUsername(username);
//	}
//
//	public UserDTO createUser(UserDTO userDTO) {
//
//		User user = modelMapper.map(userDTO, User.class);
//
//		User savedUser = userRepository.save(user);
//
//		return modelMapper.map(savedUser, UserDTO.class);
//	}
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//		User user = userRepository.findByUsername(username);
//
//		if (user == null) {
//
//			throw new UsernameNotFoundException("Invalid user name or password");
//		}
//
//		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
//
//		for (Role role : user.getRoles()) {
//
//			authorities.add(new SimpleGrantedAuthority(role.getRole()));
//		}
//
//		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
//				authorities);
//	}
//
//}
