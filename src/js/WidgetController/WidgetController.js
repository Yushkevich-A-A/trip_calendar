import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class WidgetController {
  constructor(widget = null, calendar = null) {
    if (widget !== null) {
      this.widget = widget;
      this.calendar = calendar;
      this.currentInput = null;
      this.there = document.querySelector('.input-there');
      this.back = document.querySelector('.input-back');

      this.init();
    }
  }

  init() {
    this.addListenersClick();
    this.addListenersMouseOver();
    this.addListenersInput();
    this.addListenersChange();
  }

  addListenersClick() {
    document.addEventListener('click', (event) => {
      event.preventDefault();

      if (!event.target.closest('.calendar')
                && event.target.closest('.input-date') !== this.currentInput) {
        this.calendar.deleteCalendar();
      }

      if (event.target.closest('.input-date')) {
        this.currentInput = event.target.closest('.input-date');
        this.calendar.drawCalendar(this.currentInput);
      }

      if (event.target.closest('.available')) {
        const item = event.target.closest('.available');
        this.currentInput.value = item.dataset.date;
        this.calendar.selectDate(item.dataset.date);
        if (this.back.value !== '' && this.checkDateIsAfter(this.there.value, this.back.value)) {
          this.back.value = '';
          this.calendar.resetSelectedBack();
        }
        this.calendar.deleteCalendar();
      }

      if (event.target.closest('.arrow-right')) {
        this.calendar.editMonth(true);
      }

      if (event.target.closest('.arrow-left')) {
        this.calendar.editMonth();
      }

      if (event.target.closest('.input-checkbox')) {
        this.toggleCheckbox(event.target.closest('.input-checkbox'));
        this.calendar.resetAllData();
      }
    });
  }

  addListenersMouseOver() {
    document.addEventListener('mouseover', (event) => {
      if (event.target.closest('.available')) {
        event.target.closest('.available').classList.add('select');
      }

      if (event.relatedTarget !== null && event.relatedTarget.closest('.available')) {
        event.relatedTarget.closest('.available').classList.remove('select');
      }
    });
  }

  addListenersInput() {
    document.addEventListener('input', (event) => {
      if (event.target.closest('.input-block')) {
        this.currentInput.value = this.replaceDate(this.currentInput.value);
      }
    });
  }

  addListenersChange() {
    document.addEventListener('change', (event) => {
      if (event.target.closest('.input-date')) {
        this.drawHandleDate();
      }
    });
  }

  toggleCheckbox(element) {
    const checkbox = element;
    const singleData = document.querySelector('.single-data');
    const multipleData = document.querySelector('.multiple-data');
    for (const i of [...document.querySelectorAll('.input-date')]) {
      i.value = '';
    }
    if (checkbox.classList.contains('mark')) {
      checkbox.classList.remove('mark');
      singleData.classList.remove('disactive');
      multipleData.classList.add('disactive');
      return;
    }
    checkbox.classList.add('mark');
    singleData.classList.add('disactive');
    multipleData.classList.remove('disactive');
  }

  replaceDate(data) {
    const parseValue = data.split('-').join('');
    const value = parseValue.split('');
    if (!parseInt(parseValue, 10)) {
      return '';
    }

    if (value.length >= 5) {
      value.splice(4, 0, '-');
    }
    if (value.length >= 3) {
      value.splice(2, 0, '-');
    }

    return value.slice(0, 10).join('');
  }

  checkDateIsAfter(start, end) {
    return moment(start, 'DD-MM-YYYY').isAfter(moment(end, 'DD-MM-YYYY'));
  }

  drawHandleDate() {
    if (this.currentInput.value === '') {
      return;
    }
    if (this.currentInput.closest('.input-back')) {
      if (this.there.value === '' && !this.checkDateToCurrentTime(this.currentInput.value)) {
        this.currentInput.value = moment().format('DD-MM-YYYY');
      } else if (
        !moment(this.there.value, 'DD-MM-YYYY')
          .isSameOrBefore(moment(this.currentInput.value, 'DD-MM-YYYY'))
      ) {
        this.currentInput.value = this.there.value;
      }
    } else if (!this.checkDateToCurrentTime(this.currentInput.value)) {
      this.currentInput.value = moment().format('DD-MM-YYYY');
    }
    this.calendar.drawCalendar(this.currentInput);
    this.calendar.drawBody();
    this.calendar.drawDateOfMonth(this.currentInput.value);
    this.calendar.selectDate(this.currentInput.value);
  }

  checkDateToCurrentTime(value) {
    return moment().isSameOrBefore(moment(value, 'DD-MM-YYYY'));
  }
}
