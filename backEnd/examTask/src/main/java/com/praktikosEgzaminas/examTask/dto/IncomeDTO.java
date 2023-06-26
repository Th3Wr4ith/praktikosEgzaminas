package com.praktikosEgzaminas.examTask.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class IncomeDTO {

	private Long id;
	private BigDecimal amount;
	private String name;
	private LocalDate date;
}
