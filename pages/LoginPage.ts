import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private textFieldUserName: Locator;
    private textFieldPassword: Locator;
    private buttonLogIn: Locator;
    

    constructor(page: Page){
        super(page);
        this.textFieldUserName = page.locator('input[name="username"]');
        this.textFieldPassword = page.locator('input[name="password"]');
        this.buttonLogIn = page.getByRole('button', { name: 'Log In' });
    }

    async login(username: string, password: string){
        await this.textFieldUserName.fill(username);
        await this.textFieldPassword.fill(password);
        await this.buttonLogIn.click();
    }
}