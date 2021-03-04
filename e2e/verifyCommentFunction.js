async function verifyCommentFunction(page) {
  const commentItem = await page.$('#notepaper-main-div');
  commentItem.click();
  await page.waitForSelector('#add-comment-main-div', {
    visivle: true
  });
  const commentBook = await page.$('#add-comment-main-div');
  commentBook.click();
  await page.waitForSelector('.add-comment-modal-form', {
    visivle: true
  });
  const authorForm = await page.$('#author');
  await authorForm.type('MyPuppeteerTest');
  const emailForm = await page.$('#email');
  await emailForm.type('871089057@qq.com');
  const commentForm = await page.$('#commentTA');
  await commentForm.type(
    'This is a test from puppeteer UI Test~'
  );
  page.waitForTimeout(1500);
  const checkFormBtn = await page.$(
    '#add-comment-modal-main-div button'
  );
  checkFormBtn.click();
}
module.exports = {
  verifyCommentFunction
};
