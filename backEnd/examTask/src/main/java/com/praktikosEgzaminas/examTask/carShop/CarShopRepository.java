package com.praktikosEgzaminas.examTask.category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	Optional<Category> findCategoryByName(String name);
}
