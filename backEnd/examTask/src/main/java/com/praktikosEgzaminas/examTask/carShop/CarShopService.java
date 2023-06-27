package com.praktikosEgzaminas.examTask.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.praktikosEgzaminas.examTask.exeption.ResourceAlreadyExistExeption;
import com.praktikosEgzaminas.examTask.exeption.ResourceNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	public List<Category> getCategories() {

		return categoryRepository.findAll();
	}

	public Category getCategoriesById(Long id) throws ResourceNotFoundException {

		Category categoryById = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category does not exist"));

		return categoryById;
	}

	public Category createCategories(Category category) {

		if (categoryRepository.findCategoryByName(category.getName()).isPresent()) {
			throw new ResourceAlreadyExistExeption("Category already exist");

		} else {

			return categoryRepository.save(category);
		}
	}

	public ResponseEntity<Category> updateCategories(Long id, Category categoryDetails) {

		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category does not exist"));

		if (categoryRepository.findCategoryByName(categoryDetails.getName()).isPresent()) {
			throw new ResourceAlreadyExistExeption("Category already exist");

		} else {

			category.setName(categoryDetails.getName());

			Category updatedCategory = categoryRepository.save(category);

			return ResponseEntity.ok(updatedCategory);
		}
	}

	public void deleteCategories(Long id) {

		categoryRepository.deleteById(id);

	}

}
