package com.praktikosEgzaminas.examTask.income;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.praktikosEgzaminas.examTask.exeption.ResourceNotFoundException;

@Service
public class IncomeService {

	@Autowired
	private IncomeRepository incomeRepository;

	public List<Income> getIncomes() {

		return incomeRepository.findAll();
	}

	public Income getIncomesById(Long id) throws ResourceNotFoundException {

		Income incomeById = incomeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Income does not exist with id:" + id));

		return incomeById;
	}

	public Income createIncomes(Income income) {

		return incomeRepository.save(income);
	}

	public ResponseEntity<Income> updateIncomes(Long id, Income incomeDetails) {

		Income income = incomeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Income does not exist with id: " + id));

		income.setAmount(incomeDetails.getAmount());
		income.setName(incomeDetails.getName());
		income.setDate(incomeDetails.getDate());

		Income updatedIncome = incomeRepository.save(income);

		return ResponseEntity.ok(updatedIncome);
	}

	public void deleteIncomes(Long id) {

		incomeRepository.deleteById(id);

	}
}
