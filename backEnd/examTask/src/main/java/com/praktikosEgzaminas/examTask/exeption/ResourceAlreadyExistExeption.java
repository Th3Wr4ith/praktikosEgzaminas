package com.praktikosEgzaminas.examTask.exeption;

public class ResourceAlreadyExistExeption extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ResourceAlreadyExistExeption(String message) {

		super(message);
	}

}
