//package com.praktikosEgzaminas.examTask.user;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.praktikosEgzaminas.examTask.dto.UserDTO;
//
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/api/v1/users")
//public class UserController {
//
//	@GetMapping
//	public ResponseEntity<UserDTO> login(@RequestParam String username, @RequestParam String password) {
//
//		if (username.equals("admin") && password.equals("admin")) {
//
//			return ResponseEntity.ok().build();
//
//		} else if (username.equals("customer") && password.equals("customer")) {
//
//			return ResponseEntity.ok().build();
//
//		} else {
//
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//		}
//	}
//}