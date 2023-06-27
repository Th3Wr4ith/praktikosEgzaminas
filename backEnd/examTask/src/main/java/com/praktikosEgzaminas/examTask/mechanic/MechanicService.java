package com.praktikosEgzaminas.examTask.expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.praktikosEgzaminas.examTask.category.Category;
import com.praktikosEgzaminas.examTask.category.CategoryRepository;
import com.praktikosEgzaminas.examTask.dto.ExpenseDTO;
import com.praktikosEgzaminas.examTask.exeption.ResourceNotFoundException;

@Service
public class ExpenseService {

	@Autowired
	private ExpenseRepository expenseRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	public List<Expense> getExpenses() {

		return expenseRepository.findAll();
	}

	public Expense getExpensesById(Long id) throws ResourceNotFoundException {

		Expense expenseById = expenseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Expense does not exist with id:" + id));

		return expenseById;
	}

	public Expense createExpenses(ExpenseDTO expenseDTO) {

		Expense expense = new Expense();

		expense.setAmount(expenseDTO.getAmount());
		expense.setName(expenseDTO.getName());
		expense.setDate(expenseDTO.getDate());

		Category category = categoryRepository.findCategoryByName(expenseDTO.getCategoryName())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Category does not exist with name: " + expenseDTO.getCategoryName()));

		expense.setCategory(category);
		return expenseRepository.save(expense);
	}

	public ResponseEntity<Expense> updateExpenses(Long id, ExpenseDTO expenseDetails) {

		Expense expense = expenseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Expense not exist with id: " + id));

		expense.setAmount(expenseDetails.getAmount());
		expense.setName(expenseDetails.getName());
		expense.setDate(expenseDetails.getDate());

		Category category = categoryRepository.findCategoryByName(expenseDetails.getCategoryName())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Category does not exist with name: " + expenseDetails.getCategoryName()));

		expense.setCategory(category);

		Expense updatedExpense = expenseRepository.save(expense);

		return ResponseEntity.ok(updatedExpense);

	}

	public void deleteExpenses(Long id) {

		expenseRepository.deleteById(id);

	}
}