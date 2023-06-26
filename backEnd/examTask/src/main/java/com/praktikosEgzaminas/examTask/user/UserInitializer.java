package com.praktikosEgzaminas.examTask.user;

import org.springframework.stereotype.Service;

import com.praktikosEgzaminas.examTask.dto.UserDTO;

@Service
public class UserInitializer {

	private UserService userService;

	public UserInitializer(UserService userService) {

		this.userService = userService;

		createAdminUser();
		createCustomerUser();
	}

	private void createAdminUser() {

		if (userService.existsByUsername("admin")) {

			return;

		} else {

			UserDTO adminUser = new UserDTO();

			adminUser.setUsername("admin");
			adminUser.setEmail("admin@admin.com");
			adminUser.setPassword("admin");
			adminUser.setRole("ROLE_ADMIN");

			userService.createUser(adminUser);
		}
	}

	private void createCustomerUser() {

		if (userService.existsByUsername("customer")) {

			return;
		} else {

			UserDTO customerUser = new UserDTO();

			customerUser.setUsername("customer");
			customerUser.setEmail("customer@customer.com");
			customerUser.setPassword("customer");
			customerUser.setRole("ROLE_CUSTOMER");

			userService.createUser(customerUser);
		}
	}
}
