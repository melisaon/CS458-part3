import { expect } from '@wdio/globals';
import { browser, $ } from '@wdio/globals';

describe('Survey Designer TDD Test', () => {
  before(async () => {
    await browser.url('http://localhost:5173/survey-designer');
  });

  //* Test Case1: Add question and then check if it is displayed
  it('Test Case1: Add question should display new question form', async () => {
    const addButton = await $('[data-testid="button-add-question"]');
    await addButton.click();

    const selectType = await $('[data-testid="select-type-0"]');
    const inputText = await $('[data-testid="input-text-0"]');

    await expect(selectType).toBeDisplayed();
    await expect(inputText).toBeDisplayed();
  });

  //* Test Case2: Typing question updates the input field
  it('Test Case3: Typing question text updates the value', async () => {
    const inputText = await $('[data-testid="input-text-0"]');
    await inputText.setValue('What is your favourite AI tool?');
    await expect(inputText).toHaveValue('What is your favourite AI tool?');
  });

  //* Test Case3: Options message should hide after removing from multiple-choice
  it('Test Case3: Option message hide when removing from multiple-choice', async () => {
    const selectType = await $('[data-testid="select-type-0"]');
    await selectType.selectByAttribute('value', 'multiple-choice');
    await expect($("*=Options are as follows:")).toBeDisplayed();

    await selectType.selectByAttribute('value', 'text');
    await expect($("*=Options are as follows:")).not.toBeDisplayed();
  });

  //* Test Case4: Multiple-choice input options display correctly
  it('Test Case4: Input options are visible for multiple-choice questions', async () => {
    const selectType = await $('[data-testid="select-type-0"]');
    await selectType.selectByAttribute('value', 'multiple-choice');

    const addOptionBtn = await $('button=+ Add Option');
    await addOptionBtn.click();
    await addOptionBtn.click();

    const optionInput1 = await $('input[placeholder="Option 1"]');
    const optionInput2 = await $('input[placeholder="Option 2"]');

    await expect(optionInput1).toBeDisplayed();
    await expect(optionInput2).toBeDisplayed();
  });

  //* Test Case5: Conditional logic shows next logical question
  it('Test Case5: Dependent question appears when condition is met', async () => {
    const addButton = await $('[data-testid="button-add-question"]');
    await addButton.click(); // Add question 1
    await addButton.click(); // Add question 2

    const inputText1 = await $('[data-testid="input-text-0"]');
    const inputText2 = await $('[data-testid="input-text-1"]');

    await inputText1.setValue('Rate your experience');
    const dependsInput = await $('#dependsOn-1');
    const showIfInput = await $('#showIfAnswerIs-1');

    await dependsInput.setValue('0');
    await showIfInput.setValue('Yes');

    await expect(inputText2).not.toBeDisplayed();
    
  });

  after(async () => {
    await browser.reloadSession();
  });
});
