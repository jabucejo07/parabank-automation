import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SideMenuComponent } from '../pages/components/SideMenuComponent';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { BillPayPage } from '../pages/BillPayPage'

import { TestDataGenerator} from '../utils/TestDataGenerator';
import registrationData from '../test-data/registrationData.json';
import transferFundsData from '../test-data/transferFundsData.json';
import billPayData from '../test-data/billPayData.json';

test('Parabank UI End to End Tests @EndToEndTest', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    const sideMenuComponent = new SideMenuComponent(page);
    const openNewAccountPage = new OpenNewAccountPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);
    const transferFundsPage = new TransferFundsPage(page);
    const billPayPage = new BillPayPage(page);
    const generatedUsernameData = TestDataGenerator.generateUniqueUsername();

    await homePage.goto(process.env.BASE_URL);
    await homePage.navigateToRegistrationPage();
    await registrationPage.verifyRegistrationPageSuccessfullyLoaded();
    await registrationPage.registerUser(registrationData.validDetails.firstName,registrationData.validDetails.lastName,registrationData.validDetails.address,registrationData.validDetails.city,registrationData.validDetails.state,registrationData.validDetails.zipCode,registrationData.validDetails.phoneNumber, registrationData.validDetails.ssn, generatedUsernameData, registrationData.validDetails.password);
    await registrationPage.verifyUserRegistrationIsSuccessful(generatedUsernameData, registrationData.validDetails.expectedMessage);
   
    await sideMenuComponent.navigateToOpenNewAccountPage();
    await openNewAccountPage.verifyOpenNewAccountPageSuccessfullyLoaded();

    await openNewAccountPage.createNewSavingsAccount();
    const accountId = await openNewAccountPage.storeNewAccountIdValue();

    await sideMenuComponent.navigateToAccountsOverviewPage();
    await accountsOverviewPage.verifyAccountsOverviewPageSuccessfullyLoaded();
    await accountsOverviewPage.assertNewAccountIdIsDisplayed(accountId);
    
    await sideMenuComponent.navigateToTransferFundsPage();
    await transferFundsPage.transferFundsToAnotherAccount(accountId,transferFundsData.validTransferFundDetails.amount);
    await transferFundsPage.verifyTransferFundsIsSuccessful(transferFundsData.validTransferFundDetails.amount,transferFundsData.validTransferFundDetails.expectedMessage);
    await sideMenuComponent.navigateBillPayPage();

    await billPayPage.verifyBillPayPageSuccessfullyLoaded();
    await billPayPage.sendPayment(accountId,billPayData.validBillPayDetails.payeeName,billPayData.validBillPayDetails.address,billPayData.validBillPayDetails.city,billPayData.validBillPayDetails.state,billPayData.validBillPayDetails.zipCode,billPayData.validBillPayDetails.phoneNumber,billPayData.validBillPayDetails.accountNumber,billPayData.validBillPayDetails.amount);
    await billPayPage.verifyBillPayIsSuccessful(accountId,billPayData.validBillPayDetails.amount,billPayData.validBillPayDetails.expectedMessage);
});