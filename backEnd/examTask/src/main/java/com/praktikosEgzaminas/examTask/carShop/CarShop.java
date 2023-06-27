package com.praktikosEgzaminas.examTask.carShop;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "carServices")

public class CarShop {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	@NotNull(message = "This field is required")
	@Column(name = "name")
	private String name;

	@NotNull(message = "This field is required")
	@Column(name = "address")
	private String address;

	@NotNull(message = "This field is required")
	@Column(name = "manager")
	private String manager;
}