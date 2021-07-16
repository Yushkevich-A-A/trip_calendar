import moment from "moment";
import 'moment/locale/ru';
moment().local("ru");

export default class DrawCalendar {
    constructor() {
      this.calendar = null;
      this.deleteCalendar = this.deleteCalendar.bind(this);
      this.pickedMoment = null;
      this.inputElement = null;
      this.selectedDate = null;
      this.selectedBack = null;
    }

    drawCalendar(element) {
      if (this.calendar !== null) {
        return;
      }
      
      if (this.pickedMoment === null) {
        this.pickedMoment = moment();
      }

      if (this.selectedDate === null) {
        this.selectedDate = moment();
      }

      if (this.inputElement === null) {
        this.inputElement = element
      }

      this.calendar = document.createElement('div');
      this.calendar.classList.add('calendar');
      this.calendar.innerHTML = ` <div class="month">
                                    <h2 class="month-name"></h2>
                                    <div class="month-arrows">
                                      <div class="month-arrow arrow-left"></div>
                                      <div class="month-arrow arrow-right"></div>
                                    </div>
                                  </div>
                                  <table class="table-calendar">
                                    <thead class="calendar-head">
                                      <tr class="month-week name-weekday">
                                        <th class="name-month-day">Пн</th>
                                        <th class="name-month-day">Вт</th>
                                        <th class="name-month-day">Ср</th>
                                        <th class="name-month-day">Чт</th>
                                        <th class="name-month-day">Пт</th>
                                        <th class="name-month-day">Сб</th>
                                        <th class="name-month-day">Вс</th>
                                      </tr>
                                    </thead>
                                    <tbody class="calendar-body">
                                      <tr class="month-week">
                                      </tr>
                                    </tbody>
                                  </table>`;
      document.body.appendChild(this.calendar);

      this.getPositionCalendar();
      this.drawBody();
      this.drawDateOfMonth(this.pickedMoment);
      if (this.inputElement.closest('.data-back')) {
        if (this.selectedBack === null) {
          this.selectedBack = this.selectedDate;
        }
        this.selectDate(this.selectedBack);
        return;
      }
      this.selectDate(this.selectedDate);
    }

    getPositionCalendar() {
      const { top, left} = this.inputElement.getBoundingClientRect();
      this.calendar.style.top = `${top + this.inputElement.offsetHeight + 5}px`;
      const valueLeft = left + this.inputElement.offsetWidth / 2 - this.calendar.offsetWidth / 2
      this.calendar.style.left = `${valueLeft}px`;
    }

    drawBody() {
      this.tbody = document.querySelector('.calendar-body');
      this.tbody.innerHTML = '';
      for(let i = 1; i <= 7; i++) {
        const tr = document.createElement('tr');
        tr.classList.add('month-week');
        tr.innerHTML = `<td class="month-day"></td>
        <td class="month-day"></td>
        <td class="month-day"></td>
        <td class="month-day"></td>
        <td class="month-day"></td>
        <td class="month-day"></td>
        <td class="month-day"></td>`;
        this.tbody.appendChild(tr);
      }
      this.tdArray = [...document.querySelectorAll('.month-day')];
    }

    drawDateOfMonth(data) {
      this.pickedMoment = moment(data, 'DD-MM-YYYY');
      const monthYearName = document.querySelector('.month-name');
      monthYearName.textContent = moment(data, 'DD-MM-YYYY').format('MMMM YYYY');


      const dataMoment = moment(data, 'DD-MM-YYYY').startOf('month');
      const firstDayWeekIndex = dataMoment.isoWeekday() - 1;
      const countDays = dataMoment.daysInMonth();
      for (let i of this.tdArray) {
        i.textContent = '';
      }
      
      for( let i = firstDayWeekIndex; i < countDays + firstDayWeekIndex; i++ ) {
        this.tdArray[i].textContent = dataMoment.format('D');
        this.tdArray[i].dataset.date = dataMoment.format('DD-MM-YYYY');

        this.drawAvaliableDate(dataMoment, this.tdArray[i])
      

        dataMoment.add(1, 'days');
      }
    }

    drawAvaliableDate(date, item) {
      if (this.inputElement.closest('.data-back')) {
        if (this.selectedDate.isSameOrBefore(date, 'day')) {
          item.classList.add('available');
        } else {
          item.classList.add('unavailable');
        }
      } else {
        if (moment().isSameOrBefore(date, 'day')) {
          item.classList.add('available');
        } else {
          item.classList.add('unavailable');
        }
      }
    }

    

    selectDate(date) {
      let pickedDate = null;
      if (this.inputElement.closest('.input-back')) {
        this.selectedBack = moment(date,'DD-MM-YYYY');
        pickedDate = moment(this.selectedBack).format('DD-MM-YYYY');
      } else {
        this.selectedDate = moment(date,'DD-MM-YYYY');
        pickedDate = moment(this.selectedDate).format('DD-MM-YYYY');
      }
      this.tdArray.forEach( item => item.classList.remove('active'));
      const item = this.tdArray.find( item => item.dataset.date === pickedDate);
      if (item) {
        item.classList.add('active');
      }
    }

    deleteCalendar() {
      if (this.calendar !== null) {
        this.calendar.parentElement.removeChild(this.calendar);
        this.calendar = null;
        this.inputElement = null;
      }
    }

    resetAllData() {
        this.pickedMoment = null;
        this.selectedDate = null;
        this.selectedBack = null;
        this.deleteCalendar();
    }

    resetSelectedBack() {
      this.selectedBack = null;
    }

    editMonth(value = false) {
      if (value) {
        this.pickedMoment.add(1, 'month');
      } else {
        this.pickedMoment.subtract(1, 'month');
      }

      this.drawBody();
      this.drawDateOfMonth(this.pickedMoment);
      if (this.inputElement.closest('.data-back')) {
        this.selectDate(this.selectedBack);
      }
      this.selectDate(this.selectedDate);
    }
}