import { test, expect } from './fixtures';

test('chat easter egg yields the Green Day response', async ({ homePage, chatApi }) => {
  const expectedReply = '♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫- Dookie by Green Day';

  await chatApi.onlyFor('easter egg', { reply: expectedReply });

  await homePage.goto();
  await homePage.chat.open();
  await homePage.chat.send('easter egg');

  await expect(homePage.chat.lastMessage()).toHaveText(expectedReply);
});

test('widget opens and minimizes back to the launcher', async ({ homePage }) => {
  await homePage.goto();
  await homePage.chat.open();
  await expect(homePage.chat.input).toBeVisible();

  await homePage.chat.minimizeButton.click();
  await expect(homePage.chat.input).not.toBeVisible();
  await expect(homePage.chat.launcher).toBeVisible();
});
