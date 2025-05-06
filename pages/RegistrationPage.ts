import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
    private buttonRegister: Locator;
    private textFieldFirstName: Locator;
    private textFieldLastName: Locator;
    private textFieldAddress: Locator;
    private textFieldCity: Locator;
    private textFieldState: Locator;
    private textFieldZipCode: Locator;
    private textFieldPhoneNumber: Locator;
    private textFieldSSNNumber: Locator;
    private textFieldUserName: Locator;
    private textFieldPassword: Locator;
    private textFieldConfirmPassword: Locator;

    constructor(page: Page){
        super(page);
        this.buttonRegister = page.getByRole('button', { name: 'Register' });
        this.textFieldFirstName = page.locator('[id="customer\\.firstName"]');
        this.textFieldLastName = page.locator('[id="customer\\.lastName"]');
        this.textFieldAddress = page.locator('[id="customer\\.address\\.street"]');
        this.textFieldCity = page.locator('[id="customer\\.address\\.city"]');
        this.textFieldState = page.locator('[id="customer\\.address\\.state"]');
        this.textFieldZipCode = page.locator('[id="customer\\.address\\.zipCode"]');
        this.textFieldPhoneNumber = page.locator('[id="customer\\.phoneNumber"]');
        this.textFieldSSNNumber = page.locator('[id="customer\\.ssn"]');
        this.textFieldUserName = page.locator('[id="customer\\.username"]');
        this.textFieldPassword = page.locator('[id="customer\\.password"]');
        this.textFieldConfirmPassword = page.locator('#repeatedPassword');
    }

    async verifyRegistrationPageSuccessfullyLoaded(){
        await expect(this.page).toHaveURL(/.*\/parabank\/register\.htm$/);
        await expect(this.page).toHaveTitle('ParaBank | Register for Free Online Account Access');
        await expect(this.buttonRegister).toBeVisible();
    }

    async registerUser(firstName: string, lastName: string, address: string, city: string, state: string, zipCode: string, phoneNumber: string, ssnNumber: string, userName: string, password: string){
        await this.textFieldFirstName.fill(firstName);
        await this.textFieldLastName.fill(lastName);
        await this.textFieldAddress.fill(address);
        await this.textFieldCity.fill(city);
        await this.textFieldState.fill(state);
        await this.textFieldZipCode.fill(zipCode);
        await this.textFieldPhoneNumber.fill(phoneNumber);
        await this.textFieldSSNNumber.fill(ssnNumber);
        await this.textFieldUserName.fill(userName);
        await this.textFieldPassword.fill(password);
        await this.textFieldConfirmPassword.fill(password);
        await this.buttonRegister.click();
    }

    async verifyUserRegistrationIsSuccessful(username: string, message: string){
        await expect(this.page.getByRole('heading', { name: `Welcome ${username}` })).toBeVisible();
        await expect(this.page.getByText(`${message}`)).toBeVisible();
    }
}