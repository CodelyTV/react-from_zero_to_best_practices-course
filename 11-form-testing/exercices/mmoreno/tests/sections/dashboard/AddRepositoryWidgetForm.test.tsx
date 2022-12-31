import { faker } from "@faker-js/faker";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";
import { LocalStorageRepositoryWidgetRepository } from "../../../src/infrastructure/LocalStorageWidgetRepository";
import { AddRepositoryWidgetForm } from "../../../src/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm";

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>();

describe("AddWidgetForm", () => {
	it("show widget form when add button is clicked", async () => {
		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});

		userEvent.click(button);

		const url = screen.getByLabelText(/Url del repositorio/i);

		expect(url).toBeInTheDocument();
	});

	it("save new widget when form is submitted", async () => {
		mockRepository.search.mockResolvedValue([]);

		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		userEvent.click(button);

		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newWidget.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newWidget.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		userEvent.click(submitButton);

		const addAnotherRepositoryFormButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherRepositoryFormButton).toBeInTheDocument();
		expect(mockRepository.save).toHaveBeenCalledWith(newWidget);
	});

	it("show error when repository already exists in Dashboard", async () => {
		mockRepository.save.mockReset();

		const existingWidget: RepositoryWidget = {
			id: "existingWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};
		mockRepository.search.mockResolvedValue([existingWidget]);

		const newWidgetWithSameUrl: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		userEvent.click(button);

		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newWidgetWithSameUrl.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newWidgetWithSameUrl.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		userEvent.click(submitButton);

		const errorMessage = await screen.findByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeInTheDocument();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});

	describe("show error when repository url is not valid", () => {
		it("show error when repository url is random string", async () => {
			mockRepository.save.mockReset();
			const newWidgetUrl: RepositoryWidget = {
				id: "existingWidgetId",
				repositoryUrl: faker.random.word(),
			};
			mockRepository.search.mockResolvedValue([newWidgetUrl]);

			render(<AddRepositoryWidgetForm repository={mockRepository} />);

			const button = await screen.findByRole("button", {
				name: new RegExp("Añadir repositorio", "i"),
			});
			userEvent.click(button);

			const id = screen.getByLabelText(/Id/i);
			userEvent.type(id, newWidgetUrl.id);

			const url = screen.getByLabelText(/Url del repositorio/i);
			userEvent.type(url, newWidgetUrl.repositoryUrl);

			const submitButton = await screen.findByRole("button", {
				name: /Añadir/i,
			});
			userEvent.click(submitButton);

			const errorMessage = await screen.findByRole("alert", { description: /Url no valida/i });

			expect(errorMessage).toBeInTheDocument();
			expect(mockRepository.save).not.toHaveBeenCalled();
		});

		it("show error when repository url is not github domain", async () => {
			mockRepository.save.mockReset();
			const newWidgetUrl: RepositoryWidget = {
				id: "existingWidgetId",
				repositoryUrl: faker.internet.url(),
			};
			mockRepository.search.mockResolvedValue([newWidgetUrl]);

			render(<AddRepositoryWidgetForm repository={mockRepository} />);

			const button = await screen.findByRole("button", {
				name: new RegExp("Añadir repositorio", "i"),
			});
			userEvent.click(button);

			const id = screen.getByLabelText(/Id/i);
			userEvent.type(id, newWidgetUrl.id);

			const url = screen.getByLabelText(/Url del repositorio/i);
			userEvent.type(url, newWidgetUrl.repositoryUrl);

			const submitButton = await screen.findByRole("button", {
				name: /Añadir/i,
			});
			userEvent.click(submitButton);

			const errorMessage = await screen.findByRole("alert", { description: /Url no valida/i });

			expect(errorMessage).toBeInTheDocument();
			expect(mockRepository.save).not.toHaveBeenCalled();
		});

		it("and submit button is Unable", async () => {
			mockRepository.save.mockReset();
			const newWidgetUrl: RepositoryWidget = {
				id: "newWidgetId",
				repositoryUrl: faker.internet.url(),
			};
			mockRepository.search.mockResolvedValue([newWidgetUrl]);

			render(<AddRepositoryWidgetForm repository={mockRepository} />);

			const button = await screen.findByRole("button", {
				name: new RegExp("Añadir repositorio", "i"),
			});
			userEvent.click(button);

			const id = screen.getByLabelText(/Id/i);
			userEvent.type(id, newWidgetUrl.id);

			const url = screen.getByLabelText(/Url del repositorio/i);
			userEvent.type(url, newWidgetUrl.repositoryUrl);
			await act(() => url.blur());

			const submitButton = await screen.findByRole("button", {
				name: /Añadir/i,
			});

			const errorMessage = await screen.findByRole("alert", { description: /Url no valida/i });

			expect(errorMessage).toBeInTheDocument();
			expect(mockRepository.save).not.toHaveBeenCalled();
			expect(submitButton).not.toBeEnabled();
		});
	});
});
