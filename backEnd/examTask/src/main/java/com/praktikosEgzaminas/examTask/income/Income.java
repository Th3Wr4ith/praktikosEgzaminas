package com.praktikosEgzaminas.examTask.income;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "incomes")
public class Income {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	@Column(name = "amount")
	private BigDecimal amount;

	@Column(name = "name")
	private String name;

	@Column(name = "date")
	private LocalDate date;
}
