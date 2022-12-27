export interface GitHubAccessTokenRepository {
	search(): string;
	save(token: string): void;
}
