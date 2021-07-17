import puppeteer from 'puppeteer';
import { fork } from 'child_process';
import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

jest.setTimeout(30000);

describe('creating button, click button and appearence of a hint', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseURL = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      // devTools: true,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('creating widget', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
  });

  test('waiting input-single-date selector', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.waitForSelector('.input-single-date');
  });

  test('selectors input-back and input-back no visible', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.waitForSelector('.input-back', { hidden: true });
    await page.waitForSelector('.input-back', { hidden: true });
  });

  test('test click input sindle date', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-single-date');
    await page.waitForSelector('.calendar');
  });

  test('test hide calendar', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-single-date');
    await page.waitForSelector('.calendar');
    await page.click('.main-title');
    await page.waitForSelector('.calendar', { hidden: true });
  });

  test('test select date', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-single-date');
    await page.waitForSelector('.calendar');
    const selectArrDate = await page.$$('.available');
    const input = await page.$('.input-single-date');
    await selectArrDate[3].click();
    const valueSelectDate = await page.evaluate((item) => item.dataset.date, selectArrDate[3]);
    const valueInput = await page.evaluate((item) => item.value, input);
    expect(valueInput).toBe(valueSelectDate);
  });

  test('test check salected date at calendar', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-single-date');
    await page.waitForSelector('.calendar');
    const selectArrDate = await page.$$('.available');
    const valueSelectDate = await page.evaluate((item) => item.dataset.date, selectArrDate[3]);
    await selectArrDate[3].click();
    await page.click('.input-single-date');
    await page.waitForSelector('.calendar');
    const activeItem = await page.$('.active');
    const activeItemDatasetDate = await page.evaluate((item) => item.dataset.date, activeItem);
    expect(activeItemDatasetDate).toEqual(valueSelectDate);
  });

  test('test input valid date and output correct visual perfomance', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-single-date');
    await page.type('.input-single-date', '12122021');
    await page.click('.main-title');
    const input = await page.$('.input-single-date');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    expect(valueDateInInput).toBe('12-12-2021');
  });

  test('test input invalid date', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-single-date');
    await page.type('.input-single-date', '666666');
    await page.click('.main-title');
    const input = await page.$('.input-single-date');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    const currentValue = moment().format('DD-MM-YYYY');
    expect(valueDateInInput).toBe(currentValue);
  });

  test('test input date less then today', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-single-date');
    await page.type('.input-single-date', '12122019');
    await page.click('.main-title');
    const input = await page.$('.input-single-date');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    const currentValue = moment().format('DD-MM-YYYY');
    expect(valueDateInInput).toBe(currentValue);
  });

  test('selectors input-there and input-back visible but ', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-single-date', { hidden: true });
    await page.waitForSelector('.input-there');
    await page.waitForSelector('.input-back');
  });

  test('test click input input-there date', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-there');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
  });

  test('test hide calendar input-there', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-there');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    await page.click('.main-title');
    await page.waitForSelector('.calendar', { hidden: true });
  });

  test('test select date input-there', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-there');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDate = await page.$$('.available');
    const input = await page.$('.input-there');
    await selectArrDate[3].click();
    const valueSelectDate = await page.evaluate((item) => item.dataset.date, selectArrDate[3]);
    const valueInput = await page.evaluate((item) => item.value, input);
    expect(valueInput).toBe(valueSelectDate);
  });

  test('test check salected date at calendar input-there', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-there');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDate = await page.$$('.available');
    const valueSelectDate = await page.evaluate((item) => item.dataset.date, selectArrDate[3]);
    await selectArrDate[3].click();
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const activeItem = await page.$('.active');
    const activeItemDatasetDate = await page.evaluate((item) => item.dataset.date, activeItem);
    expect(activeItemDatasetDate).toEqual(valueSelectDate);
  });

  test('test input valid date in input-there and output correct visual perfomance', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-there');
    await page.click('.input-there');
    await page.type('.input-there', '12122021');
    await page.click('.main-title');
    const input = await page.$('.input-there');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    expect(valueDateInInput).toBe('12-12-2021');
  });

  test('test input invalid date in input-there', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-there');
    await page.click('.input-there');
    await page.type('.input-there', '666666');
    await page.click('.main-title');
    const input = await page.$('.input-there');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    const currentValue = moment().format('DD-MM-YYYY');
    expect(valueDateInInput).toBe(currentValue);
  });

  test('test input in input-there date less then today', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-there');
    await page.click('.input-there');
    await page.type('.input-there', '12122019');
    await page.click('.main-title');
    const input = await page.$('.input-there');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    const currentValue = moment().format('DD-MM-YYYY');
    expect(valueDateInInput).toBe(currentValue);
  });

  test('test click input input-back date', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-back');
    await page.waitForSelector('.calendar');
  });

  test('test hide calendar input-back', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-back');
    await page.waitForSelector('.calendar');
    await page.click('.main-title');
    await page.waitForSelector('.calendar', { hidden: true });
  });

  test('test select date input-back', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDateThere = await page.$$('.available');
    await selectArrDateThere[3].click();
    await page.click('.input-back');
    await page.waitForSelector('.calendar');
    const selectArrDate = await page.$$('.available');
    const input = await page.$('.input-back');
    await selectArrDate[3].click();
    const valueSelectDate = await page.evaluate((item) => item.dataset.date, selectArrDate[3]);
    const valueInput = await page.evaluate((item) => item.value, input);
    expect(valueInput).toBe(valueSelectDate);
  });

  test('test check salected date at calendar input-back', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDateThere = await page.$$('.available');
    await selectArrDateThere[3].click();
    await page.click('.input-back');
    await page.waitForSelector('.calendar');
    const selectArrDate = await page.$$('.available');
    const valueSelectDate = await page.evaluate((item) => item.dataset.date, selectArrDate[3]);
    await selectArrDate[3].click();
    await page.click('.input-back');
    await page.waitForSelector('.calendar');
    const activeItem = await page.$('.active');
    const activeItemDatasetDate = await page.evaluate((item) => item.dataset.date, activeItem);
    expect(activeItemDatasetDate).toEqual(valueSelectDate);
  });

  test('test input valid date in input-back and output correct visual perfomance', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDateThere = await page.$$('.available');
    await selectArrDateThere[3].click();
    await page.click('.input-back');
    await page.type('.input-back', '12122021');
    await page.click('.main-title');
    const input = await page.$('.input-back');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    expect(valueDateInInput).toBe('12-12-2021');
  });

  test('test input invalid date in input-back and get correct date equal to input-there date', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDateThere = await page.$$('.available');
    const valueSelectDateThere = await page.evaluate(
      (item) => item.dataset.date, selectArrDateThere[3],
    );
    await selectArrDateThere[3].click();
    await page.click('.input-back');
    await page.type('.input-back', '666666');
    await page.click('.main-title');
    const input = await page.$('.input-back');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    expect(valueDateInInput).toBe(valueSelectDateThere);
  });

  test('test input invalid date in input-back, if input-there is empty, get correct date equal to current date', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDateThere = await page.$$('.available');
    const valueSelectDateThere = await page.evaluate(
      (item) => item.dataset.date, selectArrDateThere[3],
    );
    await selectArrDateThere[3].click();
    await page.click('.input-back');
    await page.type('.input-back', '666666');
    await page.click('.main-title');
    const input = await page.$('.input-back');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    expect(valueDateInInput).toBe(valueSelectDateThere);
  });

  test('test input in input-back date less then today with empty input-there', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-back');
    await page.type('.input-back', '12122019');
    await page.click('.main-title');
    const input = await page.$('.input-back');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    const currentValue = moment().format('DD-MM-YYYY');
    expect(valueDateInInput).toBe(currentValue);
  });

  test('test input in input-back date less then input-there', async () => {
    await page.goto(baseURL);
    await page.waitForSelector('.date-input');
    await page.click('.input-checkbox');
    await page.waitForSelector('.input-back');
    await page.click('.input-there');
    await page.waitForSelector('.calendar');
    const selectArrDateThere = await page.$$('.available');
    const valueSelectDateThere = await page.evaluate(
      (item) => item.dataset.date, selectArrDateThere[3],
    );
    await selectArrDateThere[3].click();
    await page.click('.input-back');
    await page.type('.input-back', '12122019');
    await page.click('.main-title');
    const input = await page.$('.input-back');
    const valueDateInInput = await page.evaluate((item) => item.value, input);
    expect(valueDateInInput).toBe(valueSelectDateThere);
  });
});
