package com.praktikosEgzaminas.examTask.mechanic;

import com.praktikosEgzaminas.examTask.carShop.CarShop;

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
@Table(name = "mechanics")
public class Mechanic {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	@NotNull(message = "This field is required")
	@Min(2)
	@Column(name = "name")
	private String name;

	@NotNull(message = "This field is required")
	@Min(2)
	@Column(name = "surname")
	private String surname;

	@NotNull(message = "This field is required")
	@Column(name = "specialty")
	private String specialty;

	@NotNull(message = "This field is required")
	@Column(name = "city")
	private String city;

	@ManyToOne
	@JoinColumn(name = "carshop_id", referencedColumnName = "id")
	@Getter
	private CarShop carShop;

	public void assignCarShop(CarShop carShop) {
		this.carShop = carShop;

	}

}
