import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { retryClickUntilGone } from '../utils/UIUtils';

export class BillPayPage extends BasePage {
    private buttonSendPayment: Locator;
    private textFieldPayeeName: Locator;
    private textFieldAddress: Locator;
    private textFieldCity: Locator;
    private textFieldState: Locator;
    private textFieldZipCode: Locator;
    private textFieldPhoneNumber: Locator;
    private textFieldAccountNumber: Locator;
    private textFieldVerifyAccountNumber: Locator;
    private textFieldAmount: Locator;
    private dropdownFromAccountId: Locator;

    constructor(page: Page){
        super(page);
        this.textFieldPayeeName = page.locator('input[name="payee\\.name"]');
        this.textFieldAddress = page.locator('input[name="payee\\.address\\.street"]');
        this.textFieldCity = page.locator('input[name="payee\\.address\\.city"]');
        this.textFieldState = page.locator('input[name="payee\\.address\\.state"]');
        this.textFieldZipCode = page.locator('input[name="payee\\.address\\.zipCode"]');
        this.textFieldPhoneNumber = page.locator('input[name="payee\\.phoneNumber"]');
        this.textFieldAccountNumber = page.locator('input[name="payee\\.accountNumber"]');
        this.textFieldVerifyAccountNumber = page.locator('input[name="verifyAccount"]');
        this.textFieldAmount = page.locator('input[name="amount"]');
        this.dropdownFromAccountId = page.locator('//select[@name="fromAccountId"]');
        this.buttonSendPayment = page.getByRole('button', { name: 'Send Payment' });
    }

    async verifyBillPayPageSuccessfullyLoaded(){
        await expect(this.page).toHaveURL(/.*\/parabank\/billpay\.htm$/);
        await expect(this.page).toHaveTitle('ParaBank | Bill Pay');
        await expect(this.buttonSendPayment).toBeVisible();
        console.log("Navigated Successfully to Bill Pay Page!");
    }

    async sendPayment(accountId: string, payeeName: string, address: string, city: string, state: string, zipCode: string, phoneNumber: string, accountNumber: string, amount: number){
        await this.textFieldPayeeName.fill(payeeName);
        await this.textFieldAddress.fill(address);
        await this.textFieldCity.fill(city);
        await this.textFieldState.fill(state);
        await this.textFieldZipCode.fill(zipCode);
        await this.textFieldPhoneNumber.fill(phoneNumber);
        await this.textFieldAccountNumber.fill(accountNumber);
        await this.textFieldVerifyAccountNumber.fill(accountNumber);
        await this.textFieldAmount.fill(amount.toString());
        await this.dropdownFromAccountId.selectOption(accountId);
        await expect(this.buttonSendPayment).toBeVisible();
        await expect(this.buttonSendPayment).toBeEnabled();
        await this.buttonSendPayment.hover();
        await retryClickUntilGone(this.buttonSendPayment);
    }

    async verifyBillPayIsSuccessful(accountId: string, amount: string, message: string){
        await expect(this.page.getByRole('heading', { name: `${message}` })).toBeVisible();
        await expect(this.page.getByText(`$${amount}.00`)).toBeVisible();
        console.log("Bill Pay Successfully!");
    }
}