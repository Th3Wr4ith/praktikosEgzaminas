package com.praktikosEgzaminas.examTask.dto;

import lombok.Data;

@Data
public class MechanicDTO {

	private Long id;
	private String name;
	private String surname;
	private String specialty;
	private String city;

	private String carShopName;

}
