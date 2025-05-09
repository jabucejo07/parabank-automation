import { Page, request, expect } from '@playwright/test';
import { getCookieJSessionId } from '../utils/APIAuthenticationHelper';
import { assertBillPaymentAmount } from '../utils/APIAssertions';

export async function fetchAndAssertBillPaymentTransactions(page: Page, accountId: number, expectedAmount: number): Promise<void> {
  const jSessionID = await getCookieJSessionId(page);

  const apiContext = await request.newContext({
    extraHTTPHeaders: {
      Cookie: `JSESSIONID=${jSessionID}`,
    },
  });

  const url = `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${expectedAmount}?timeout=30000`;

  const response = await apiContext.get(url);
  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  assertBillPaymentAmount(data, expectedAmount, accountId);
}