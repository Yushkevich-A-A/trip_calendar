import WidgetController from '../WidgetController';

const widget = new WidgetController();

test('check replace inpit date', () => {
  const expected = '12-12-2021';
  const returned = widget.replaceDate('12122021');
  expect(returned).toBe(expected);
});

test('check date is after', () => {
  const returned = widget.checkDateIsAfter('12-12-2022', '12-12-2021');
  expect(returned).toBeTruthy();
});

test('date is same or before to current data', () => {
  const returned = widget.checkDateToCurrentTime('12-12-2021');
  expect(returned).toBeTruthy();
});

test('invalid date is returned false', () => {
  const returned = widget.checkDateToCurrentTime('12-eh-2021');
  expect(returned).toBeFalsy();
});
