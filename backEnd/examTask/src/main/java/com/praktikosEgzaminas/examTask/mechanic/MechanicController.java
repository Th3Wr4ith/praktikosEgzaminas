package com.praktikosEgzaminas.examTask.mechanic;

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

import com.praktikosEgzaminas.examTask.dto.MechanicDTO;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/mechanics")

public class MechanicController {

	@Autowired
	public ModelMapper modelMapper;

	@Autowired
	private MechanicService mechanicService;

	public MechanicController(MechanicService mechanicService) {

		this.mechanicService = mechanicService;
	}

	@GetMapping
	public List<MechanicDTO> getMechanics() {
		System.out.println(mechanicService.getMechanics());
		return mechanicService.getMechanics().stream().map(mechanic -> modelMapper.map(mechanic, MechanicDTO.class))
				.collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<MechanicDTO> getMechanicById(@PathVariable Long id) {

		Mechanic mechanic = mechanicService.getMechanicById(id);

		MechanicDTO mechanicResponse = modelMapper.map(mechanic, MechanicDTO.class);

		return ResponseEntity.ok().body(mechanicResponse);
	}

	@PostMapping
	public ResponseEntity<MechanicDTO> createMechanic(@Valid @RequestBody MechanicDTO mechanicDTO) {

		Mechanic mechanic = mechanicService.createMechanic(mechanicDTO);

		MechanicDTO mechanicResponse = modelMapper.map(mechanic, MechanicDTO.class);

		mechanicResponse.setCarShopName(mechanic.getCarShop().getName());

		return new ResponseEntity<MechanicDTO>(mechanicResponse, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Mechanic> updateMechanic(@PathVariable Long id, @RequestBody MechanicDTO updatedMechanicDTO) {

		return mechanicService.updateMechanic(id, updatedMechanicDTO);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteMechanic(@PathVariable Long id) {

		mechanicService.deleteMechanic(id);

		return new ResponseEntity<>("Mechanic successfully deleted!", HttpStatus.OK);

	}
}
