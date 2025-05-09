import { Page } from '@playwright/test';

export async function getCookieJSessionId(page: Page): Promise<string> {
    const cookies = await page.context().cookies();
    const jsession = cookies.find(c => c.name === 'JSESSIONID');
    if (!jsession) throw new Error('JSESSIONID cookie not found');
    console.log('Cookie JSESSIONID: ' + jsession.value);
    return jsession.value;
}