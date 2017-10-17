import { SiriCliPage } from './app.po';

describe('siri-cli App', () => {
  let page: SiriCliPage;

  beforeEach(() => {
    page = new SiriCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
