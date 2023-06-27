package com.praktikosEgzaminas.examTask.expense;

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

import com.praktikosEgzaminas.examTask.dto.ExpenseDTO;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/expenses")

public class ExpenseController {

	@Autowired
	public ModelMapper modelMapper;

	@Autowired
	private ExpenseService expenseService;

	public ExpenseController(ExpenseService expenseService) {

		this.expenseService = expenseService;
	}

	@GetMapping
	public List<ExpenseDTO> getExpenses() {
		System.out.println(expenseService.getExpenses());
		return expenseService.getExpenses().stream().map(expense -> modelMapper.map(expense, ExpenseDTO.class))
				.collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ExpenseDTO> getExpensesById(@PathVariable Long id) {

		Expense expense = expenseService.getExpensesById(id);

		ExpenseDTO expenseResponse = modelMapper.map(expense, ExpenseDTO.class);

		return ResponseEntity.ok().body(expenseResponse);
	}

	@PostMapping
	public ResponseEntity<ExpenseDTO> createExpenses(@Valid @RequestBody ExpenseDTO expenseDTO) {

		Expense expense = expenseService.createExpenses(expenseDTO);

		ExpenseDTO expenseResponse = modelMapper.map(expense, ExpenseDTO.class);

		expenseResponse.setCategoryName(expense.getCategory().getName());

		return new ResponseEntity<ExpenseDTO>(expenseResponse, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Expense> updateExpenses(@PathVariable Long id, @RequestBody ExpenseDTO updatedExpenseDTO) {

		return expenseService.updateExpenses(id, updatedExpenseDTO);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteExpenses(@PathVariable Long id) {

		expenseService.deleteExpenses(id);

		return new ResponseEntity<>("Expense successfully deleted!", HttpStatus.OK);

	}
}
