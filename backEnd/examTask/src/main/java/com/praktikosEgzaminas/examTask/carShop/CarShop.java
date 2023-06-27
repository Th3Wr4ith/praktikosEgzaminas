package com.praktikosEgzaminas.examTask.category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")

public class Category {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	@Column(name = "category")
	private String name;
}