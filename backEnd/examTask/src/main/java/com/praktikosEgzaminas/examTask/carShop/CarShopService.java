package com.praktikosEgzaminas.examTask.carShop;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.praktikosEgzaminas.examTask.exeption.ResourceAlreadyExistExeption;
import com.praktikosEgzaminas.examTask.exeption.ResourceNotFoundException;

@Service
public class CarShopService {

	@Autowired
	private CarShopRepository carShopRepository;

	public List<CarShop> getCarShops() {

		return carShopRepository.findAll();
	}

	public CarShop getCarShopById(Long id) throws ResourceNotFoundException {

		CarShop carShopById = carShopRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Car shop does not exist"));

		return carShopById;
	}

	public CarShop createCarShop(CarShop carShop) {

		if (carShopRepository.findCarShopByName(carShop.getName()).isPresent()) {
			throw new ResourceAlreadyExistExeption("Car shop already exist");

		} else {

			return carShopRepository.save(carShop);
		}
	}

	public ResponseEntity<CarShop> updateCarShop(Long id, CarShop carShopDetails) {

		CarShop carShop = carShopRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Car shop does not exist"));

		if (carShopRepository.findCarShopByName(carShopDetails.getName()).isPresent()) {
			throw new ResourceAlreadyExistExeption("Car shop already exist");

		} else {

			carShop.setName(carShopDetails.getName());
			carShop.setAddress(carShopDetails.getAddress());
			carShop.setManager(carShopDetails.getManager());

			CarShop updatedCategory = carShopRepository.save(carShop);

			return ResponseEntity.ok(updatedCategory);
		}
	}

	public void deleteCarShop(Long id) {

		carShopRepository.deleteById(id);

	}

}
