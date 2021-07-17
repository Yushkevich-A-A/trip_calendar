import DrawCalendar from './DrawCalendar/DrawCalendar';
import DrawWidget from './DrawWidget/DrawWidget';
import WidgetController from './WidgetController/WidgetController';

const widget = new DrawWidget();
const calendar = new DrawCalendar();

const widgetController = new WidgetController(widget, calendar);
