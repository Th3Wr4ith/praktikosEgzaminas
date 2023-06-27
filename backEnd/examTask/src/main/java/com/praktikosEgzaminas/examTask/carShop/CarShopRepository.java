package com.praktikosEgzaminas.examTask.carShop;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarShopRepository extends JpaRepository<CarShop, Long> {

	Optional<CarShop> findCarShopByName(String name);
}
