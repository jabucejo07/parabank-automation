import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private linkRegister: Locator;

    constructor(page: Page){
        super(page);
        this.linkRegister = page.getByRole('link', { name: 'Register' });
    }

    async navigateToRegistrationPage(){
        await this.linkRegister.click();
    }
}