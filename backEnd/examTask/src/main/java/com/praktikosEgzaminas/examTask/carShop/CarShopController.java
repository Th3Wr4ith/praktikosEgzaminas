package com.praktikosEgzaminas.examTask.category;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.praktikosEgzaminas.examTask.dto.CategoryDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/categories")
public class CategoryController {

	@Autowired
	public ModelMapper modelMapper;

	@Autowired
	private CategoryService categoryService;

	public CategoryController() {
		;
	}

	@GetMapping
	public List<CategoryDTO> getCategories() {

		return categoryService.getCategories().stream().map(category -> modelMapper.map(category, CategoryDTO.class))
				.collect(Collectors.toList());
	}

	@GetMapping("{id}")
	public ResponseEntity<CategoryDTO> getCategoriesById(@PathVariable Long id) {

		Category category = categoryService.getCategoriesById(id);

		CategoryDTO categoryResponse = modelMapper.map(category, CategoryDTO.class);

		return ResponseEntity.ok().body(categoryResponse);
	}

	@PostMapping
	public ResponseEntity<CategoryDTO> createCategories(@RequestBody Category categoryDTO) {

		Category categoryRequest = modelMapper.map(categoryDTO, Category.class);

		Category category = categoryService.createCategories(categoryRequest);

		CategoryDTO categoryResponse = modelMapper.map(category, CategoryDTO.class);

		return new ResponseEntity<CategoryDTO>(categoryResponse, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CategoryDTO> updateCategories(@PathVariable Long id,
			@RequestBody Category updatedCategoryDTO) {

		Category categoryRequest = modelMapper.map(updatedCategoryDTO, Category.class);

		ResponseEntity<Category> updatedCategory = categoryService.updateCategories(id, categoryRequest);

		CategoryDTO categoryResponse = modelMapper.map(updatedCategory, CategoryDTO.class);

		return ResponseEntity.ok().body(categoryResponse);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCategories(@PathVariable Long id) {

		categoryService.deleteCategories(id);

		return new ResponseEntity<>("Expense category successfully deleted!", HttpStatus.OK);
	}

}
