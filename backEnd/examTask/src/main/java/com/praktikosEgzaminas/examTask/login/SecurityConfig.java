//package com.praktikosEgzaminas.examTask.login;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//	@Autowired
//	public void configure(AuthenticationManagerBuilder auth) throws Exception {
//
//		auth.inMemoryAuthentication().withUser("admin").password(passwordEncoder().encode("admin")).roles("ADMIN").and()
//				.withUser("customer").password(passwordEncoder().encode("customer")).roles("CUSTOMER");
//	}
//
//	protected void configure(HttpSecurity http) throws Exception {
//
//		http.authorizeRequests().requestMatchers("/api/v1/admin/**").hasRole("ADMIN").anyRequest().authenticated().and()
//				.formLogin().loginPage("/api/v1/admin/login").defaultSuccessUrl("/api/v1/admin/home").permitAll().and()
//				.logout().logoutUrl("/api/v1/logout").logoutSuccessUrl("/");
//
//		http.authorizeRequests().requestMatchers("/api/v1/customer/**").hasRole("CUSTOMER").anyRequest().authenticated()
//				.and().formLogin().loginPage("/api/v1/customer/login").defaultSuccessUrl("/api/v1/customer/home")
//				.permitAll().and().logout().logoutUrl("/api/v1/customer/logout").logoutSuccessUrl("/");
//
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//
//		return new BCryptPasswordEncoder();
//	}
//}