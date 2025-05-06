import { Page, Locator, expect } from '@playwright/test';

export class SideMenuComponent {
    private linkOpenNewAccount: Locator;
    private linkAccountsOverview: Locator;
    private linkTransferFunds: Locator;
    private linkBillPay: Locator;


    constructor(page: Page){
        this.linkOpenNewAccount = page.getByRole('link', { name: 'Open New Account' });
        this.linkAccountsOverview = page.getByRole('link', { name: 'Accounts Overview' });
        this.linkTransferFunds = page.getByRole('link', { name: 'Transfer Funds' });
        this.linkBillPay = page.getByRole('link', { name: 'Bill Pay' })
    }

    async navigateToOpenNewAccountPage(){
        await this.linkOpenNewAccount.click();
    }

    async navigateToAccountsOverviewPage(){
        await this.linkAccountsOverview.click();
    }

    async navigateToTransferFundsPage(){
        await this.linkTransferFunds.click();
    }

    async navigateBillPayPage(){
        await this.linkBillPay.click();
    }

}