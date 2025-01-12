const puppeteer = require('puppeteer');
const app = require('../app');
const port = 5000;

let server;

beforeAll(async () => {
  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
});

afterAll(async () => {
  server.close();
});

test('calculates 1 + 2 in the frontend', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5000');
  
  await page.type('#a', '1');
  await page.type('#b', '2');
  await page.click('button');
  
  await page.waitForSelector('#result');
  
  const result = await page.$eval('#result', el => el.textContent);
  expect(result).toBe('3');
  
  await browser.close();
});
