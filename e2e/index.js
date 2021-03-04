const puppeteer = require('puppeteer');
const commentFunction = require('./verifyCommentFunction');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  await page.goto('https://shaolianblog.top/');
  await commentFunction.verifyCommentFunction(page);
}

run();
