package com.praktikosEgzaminas.examTask.income;

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

import com.praktikosEgzaminas.examTask.dto.IncomeDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/incomes")

public class IncomeController {

	@Autowired
	public ModelMapper modelMapper;

	@Autowired
	private IncomeService incomeService;

	public IncomeController(IncomeService incomeService) {

		this.incomeService = incomeService;
	}

	@GetMapping
	public List<IncomeDTO> getIncomes() {

		return incomeService.getIncomes().stream().map(income -> modelMapper.map(income, IncomeDTO.class))
				.collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<IncomeDTO> getIncomesById(@PathVariable Long id) {

		Income income = incomeService.getIncomesById(id);

		IncomeDTO incomeResponse = modelMapper.map(income, IncomeDTO.class);

		return ResponseEntity.ok().body(incomeResponse);
	}

	@PostMapping
	public ResponseEntity<IncomeDTO> createIncomes(@RequestBody IncomeDTO incomeDTO) {

		Income incomeRequest = modelMapper.map(incomeDTO, Income.class);

		Income income = incomeService.createIncomes(incomeRequest);

		IncomeDTO incomeResponse = modelMapper.map(income, IncomeDTO.class);

		return new ResponseEntity<IncomeDTO>(incomeResponse, HttpStatus.CREATED);

	}

	@PutMapping("/{id}")
	public ResponseEntity<IncomeDTO> updateIncomes(@PathVariable Long id, @RequestBody IncomeDTO updatedIncomeDTO) {

		Income incomeRequest = modelMapper.map(updatedIncomeDTO, Income.class);

		ResponseEntity<Income> updatedIncome = incomeService.updateIncomes(id, incomeRequest);

		IncomeDTO incomeResponse = modelMapper.map(updatedIncome, IncomeDTO.class);

		return ResponseEntity.ok().body(incomeResponse);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteIncomes(@PathVariable Long id) {

		incomeService.deleteIncomes(id);

		return new ResponseEntity<>("Income successfully deleted!", HttpStatus.OK);
	}
}
