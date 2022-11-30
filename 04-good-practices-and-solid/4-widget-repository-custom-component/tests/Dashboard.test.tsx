import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { GitHubRepositoryRepository } from "../src/domain/GitHubRepositoryRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";

const mockRepository = mock<GitHubRepositoryRepository>();

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		const gitHubRepository = GitHubRepositoryMother.create();

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		render(<Dashboard repository={mockRepository} />);

		const title = await screen.findByRole("heading", {
			name: new RegExp("DevDash_", "i"),
		});

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(title).toBeInTheDocument();
		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockRepository.search.mockResolvedValue([]);

		render(<Dashboard repository={mockRepository} />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		render(<Dashboard repository={mockRepository} />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
