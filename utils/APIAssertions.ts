import { expect } from '@playwright/test';
import { JSONPath } from 'jsonpath-plus';

export function assertBillPaymentAmount(data: any, expectedAmount: number, expectedAccountId: number): void {
    console.log('Find Transaction API Response: ' + JSON.stringify(data, null, 2))
    const filtered = JSONPath({
        path: `$[?(@.description.includes("Bill Payment"))]`,
        json: data
    });

    expect(filtered.length).toBeGreaterThan(0);

    filtered.forEach(jsonData => {
        expect(jsonData.amount).toBe(expectedAmount);
        console.log('API Assertion Amount PASSED! Actual:' + jsonData.amount + ' Expected: ' + expectedAmount);
        expect(jsonData.accountId).toBe(expectedAccountId);
        console.log('API Assertion AccountId PASSED! Actual:' + jsonData.accountId + ' Expected: ' + expectedAccountId);
    });
}