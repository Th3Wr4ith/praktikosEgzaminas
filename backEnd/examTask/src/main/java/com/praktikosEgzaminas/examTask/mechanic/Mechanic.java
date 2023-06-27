package com.praktikosEgzaminas.examTask.expense;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.praktikosEgzaminas.examTask.category.Category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "expenses")
public class Expense {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	@NotNull(message = "This field is required")
	@Min(1)
	@Column(name = "amount")
	private BigDecimal amount;

	@NotNull(message = "This field is required")
	@Column(name = "name")
	private String name;

	@NotNull(message = "This field is required")
	@Column(name = "date")
	private LocalDate date;

	@ManyToOne
	@JoinColumn(name = "category_id", referencedColumnName = "id")
	@Getter
	private Category category;

	public void assignCategory(Category category) {
		this.category = category;

	}

}
