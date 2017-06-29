import { HandWritingFormatPage } from './app.po';

describe('hand-writing-format App', () => {
  let page: HandWritingFormatPage;

  beforeEach(() => {
    page = new HandWritingFormatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
