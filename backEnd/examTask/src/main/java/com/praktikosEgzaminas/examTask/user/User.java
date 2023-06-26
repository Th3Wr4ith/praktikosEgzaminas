//package com.praktikosEgzaminas.examTask.user;
//
//import java.util.List;
//
//import com.praktikosEgzaminas.examTask.login.Role;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToMany;
//import jakarta.validation.constraints.Email;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class User {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "id")
//	private Long id;
//
//	@Column(name = "name", nullable = false)
//	private String username;
//
//	@Email
//	@Column(name = "email", nullable = false)
//	private String email;
//
//	@Column(name = "password", nullable = false)
//	private String password;
//
//	@Column(name = "address")
//	private String address;
//
//	@ManyToMany(fetch = FetchType.EAGER)
//	private List<Role> roles;

//}
