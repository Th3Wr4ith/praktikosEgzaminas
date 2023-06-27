package com.praktikosEgzaminas.examTask.carShop;

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

import com.praktikosEgzaminas.examTask.dto.CarShopDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/v1/carshops")
public class CarShopController {

	@Autowired
	public ModelMapper modelMapper;

	@Autowired
	private CarShopService carShopService;

	public CarShopController() {
		;
	}

	@GetMapping
	public List<CarShopDTO> getCarShops() {

		return carShopService.getCarShops().stream().map(carShop -> modelMapper.map(carShop, CarShopDTO.class))
				.collect(Collectors.toList());
	}

	@GetMapping("{id}")
	public ResponseEntity<CarShopDTO> getCarShopById(@PathVariable Long id) {

		CarShop carShop = carShopService.getCarShopById(id);

		CarShopDTO carShopResponse = modelMapper.map(carShop, CarShopDTO.class);

		return ResponseEntity.ok().body(carShopResponse);
	}

	@PostMapping
	public ResponseEntity<CarShopDTO> createCarShop(@RequestBody CarShop carShopDTO) {

		CarShop carShopRequest = modelMapper.map(carShopDTO, CarShop.class);

		CarShop carShop = carShopService.createCarShop(carShopRequest);

		CarShopDTO carShopResponse = modelMapper.map(carShop, CarShopDTO.class);

		return new ResponseEntity<CarShopDTO>(carShopResponse, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CarShopDTO> updateCarShop(@PathVariable Long id, @RequestBody CarShop updatedCarShopDTO) {

		CarShop carShopRequest = modelMapper.map(updatedCarShopDTO, CarShop.class);

		ResponseEntity<CarShop> updatedCarShop = carShopService.updateCarShop(id, carShopRequest);

		CarShopDTO categoryResponse = modelMapper.map(updatedCarShop, CarShopDTO.class);

		return ResponseEntity.ok().body(categoryResponse);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCarShop(@PathVariable Long id) {

		carShopService.deleteCarShop(id);

		return new ResponseEntity<>("Expense category successfully deleted!", HttpStatus.OK);
	}

}
