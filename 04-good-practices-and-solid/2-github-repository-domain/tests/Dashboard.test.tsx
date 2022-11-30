import { render, screen } from "@testing-library/react";

import { GitHubRepository } from "../src/domain/GitHubRepository";
import { GitHubApiGitHubRepositoryRepository } from "../src/infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";

jest.mock("../src/infrastructure/GitHubApiGitHubRepositoryRepository");
const mockRepository =
	GitHubApiGitHubRepositoryRepository as jest.Mock<GitHubApiGitHubRepositoryRepository>;

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		const gitHubRepository: GitHubRepository = {
			id: {
				organization: "CodelyTv",
				name: "dotly",
			},
			description: "🌚 Modular and easy to customize dotfiles framework",
			url: "https://github.com/CodelyTV/dotly",
			private: true,
			forks: 132,
			hasWorkflows: true,
			isLastWorkflowSuccess: false,
			stars: 4000,
			issues: 12,
			pullRequests: 1,
			updatedAt: new Date(),
			watchers: 134,
		};

		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([gitHubRepository]),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});

		render(<Dashboard />);

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
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([]),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});

		render(<Dashboard />);
		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository: GitHubRepository = {
			id: {
				organization: "CodelyTv",
				name: "dotly",
			},
			description: "🌚 Modular and easy to customize dotfiles framework",
			url: "https://github.com/CodelyTV/dotly",
			private: true,
			forks: 132,
			hasWorkflows: true,
			isLastWorkflowSuccess: false,
			stars: 4000,
			issues: 12,
			pullRequests: 1,
			updatedAt: new Date(),
			watchers: 134,
		};

		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([gitHubRepository]),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});

		render(<Dashboard />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
