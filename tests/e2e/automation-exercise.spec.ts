import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { AuthPage } from '../../pages/auth.page';
import { SignupPage } from '../../pages/signup.page';
import { ProductsPage } from '../../pages/products.page';
import { CategoryPage } from '../../pages/category.page';
import { DataGenerator } from '../../utils/data-generator';
import searchData from '../../testdata/searchData.json';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Automation Exercise E2E', () => {
    let homePage: HomePage;
    let authPage: AuthPage;
    let signupPage: SignupPage;
    let productsPage: ProductsPage;
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
        // Intercept and block common ad/tracking domains to reduce test flakiness
        await page.route('**/*google*/**', route => route.abort());
        await page.route('**/*doubleclick*/**', route => route.abort());
        await page.route('**/pagead/**', route => route.abort());

        homePage = new HomePage(page);
        authPage = new AuthPage(page);
        signupPage = new SignupPage(page);
        productsPage = new ProductsPage(page);
        categoryPage = new CategoryPage(page);

    });

    test('Product Search and Category Filtering', async () => {
        // Generate unique test data for registration
        const uniqueEmail = DataGenerator.generateUniqueEmail();
        const mockUser = DataGenerator.getStaticMockUser(uniqueEmail);
        const baseUrl = process.env.BASE_URL!;

        // 1. Navigate & 2. Verify Home Page
        await homePage.navigateTo(baseUrl);
        await homePage.verifyHomePageLoaded();

        // 3. Navigate to Signup/Login
        await homePage.goToSignupLogin();

        // 4. Register structural initialization
        await authPage.initiateSignup(mockUser.username, mockUser.email);

        // 5. Fill registration forms & 6. Confirm success
        await signupPage.fillAccountDetails(mockUser);
        await signupPage.verifyAccountCreated();

        // 7. Click structural redirect hooks or verify login status back on home
        await homePage.navigateTo(baseUrl);
        await homePage.verifyLoggedInUser(mockUser.username);

        // 8. Navigate to Products & 9. Search "Jeans"
        await homePage.goToProducts();
        await productsPage.searchProduct(searchData.jeansSearch.searchTerm);
        await productsPage.verifyAllProductNamesContain(searchData.jeansSearch.expectedValidationText);

        // 10. Handle non-existent terms gracefully
        await productsPage.searchProduct(searchData.invalidSearch.searchTerm);
        await productsPage.verifyNoProductsFound();

        // 11. Navigate Categories -> Women -> Dress & 12. Verify Text & 13. Products presence
        await homePage.selectWomenDressCategory();
        await categoryPage.verifyCategoryHeader(searchData.categories.womenDress.headerText);
        await categoryPage.verifyProductsAreListed();

        // 14. Navigate Brands -> Polo & 15. Verify identity execution
        await homePage.selectPoloBrand();
        await categoryPage.verifyCategoryHeader(searchData.brands.polo.headerText);
        await categoryPage.verifyProductsAreListed();
    });
});