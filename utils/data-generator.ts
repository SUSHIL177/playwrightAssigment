import mockUserTemplate from '../testdata/mockUserTemplate.json';

export class DataGenerator {
    static generateUniqueEmail(): string {
        const timestamp = Date.now();
        return `testuser_${timestamp}@example.com`;
    }

    static getStaticMockUser(email: string) {
        return {
            ...mockUserTemplate,
            email: email
        };
    }
}