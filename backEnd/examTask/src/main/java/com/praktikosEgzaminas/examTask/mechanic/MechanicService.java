package com.praktikosEgzaminas.examTask.mechanic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.praktikosEgzaminas.examTask.carShop.CarShop;
import com.praktikosEgzaminas.examTask.carShop.CarShopRepository;
import com.praktikosEgzaminas.examTask.dto.MechanicDTO;
import com.praktikosEgzaminas.examTask.exeption.ResourceNotFoundException;

@Service
public class MechanicService {

	@Autowired
	private MechanicRepository mechanicRepository;

	@Autowired
	private CarShopRepository carShopRepository;

	public List<Mechanic> getMechanics() {

		return mechanicRepository.findAll();
	}

	public Mechanic getMechanicById(Long id) throws ResourceNotFoundException {

		Mechanic mechanicById = mechanicRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mechanic does not exist"));

		return mechanicById;
	}

	public Mechanic createMechanic(MechanicDTO mechanicDTO) {

		Mechanic mechanic = new Mechanic();

		mechanic.setName(mechanicDTO.getName());
		mechanic.setSurname(mechanicDTO.getSurname());
		mechanic.setSpecialty(mechanicDTO.getSpecialty());
		mechanic.setCity(mechanicDTO.getCity());

		CarShop carShop = carShopRepository.findCarShopByName(mechanicDTO.getCarShopName())
				.orElseThrow(() -> new ResourceNotFoundException("Car shop does not exist"));

		mechanic.setCarShop(carShop);
		return mechanicRepository.save(mechanic);
	}

	public ResponseEntity<Mechanic> updateMechanic(Long id, MechanicDTO mechanicDetails) {

		Mechanic mechanic = mechanicRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mechanic not exist"));

		mechanic.setName(mechanicDetails.getName());
		mechanic.setSurname(mechanicDetails.getSurname());
		mechanic.setSpecialty(mechanicDetails.getSpecialty());
		mechanic.setCity(mechanicDetails.getCity());

		CarShop carShop = carShopRepository.findCarShopByName(mechanicDetails.getCarShopName())
				.orElseThrow(() -> new ResourceNotFoundException("Car shop does not exist"));

		mechanic.setCarShop(carShop);

		Mechanic updatedMechanic = mechanicRepository.save(mechanic);

		return ResponseEntity.ok(updatedMechanic);

	}

	public void deleteMechanic(Long id) {

		mechanicRepository.deleteById(id);

	}
}