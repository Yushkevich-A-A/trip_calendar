export default class DrawWidget {
    constructor() {
        this.drawForm();
    }

    drawForm() {
        this.div = document.createElement('div');
        this.div.classList.add('widget-serch-ticket');
        this.div.innerHTML = `<div class="ticket-search-wrapper">
                                <div class="ticket-search-background">
                                <div class="ticket-search">
                                    <h1 class="main-title">Поиск билетов</h1>
                                    <div class="block-form">
                                    <form class="form">
                                        <div class="form-block from">
                                        <div class="input-block block-from">
                                            <label class="label" for="input-from">Откуда</label>
                                            <input name="input-from" type="text" class="input input-from">
                                        </div>
                                        <div class="button-reverse-block">
                                            <svg class="rzd-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" version="1.1">
                                            <path d="M6 8.755h9.467l-2.4 2.327.933.905 4-3.878-4-3.88-.933.906 2.4 2.327H6zM18 15.245H8.533l2.4-2.327-.933-.905-4 3.878 4 3.88.933-.906-2.4-2.327H18z" fill="inherit"></path>
                                        </svg>
                                        </div>
                                        </div>
                            
                                        <div class="form-block input-block to">
                                        <label class="label" for="input-to">Куда</label>
                                        <input name="input-to" type="text" class="input input-to">
                                        </div>
                                        
                                        <div class="form-block counter">
                                        <div class="input-block count count-adult">
                                            <label class="label" for="input-adult">Взрослые:</label>
                                            <div class="block-count">
                                            <input name="input-adult" type="number" class="input input-adult" value="1">
                                            <div class="buttons-less-more">
                                                <div class="less"></div>
                                                <div class="more"></div>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="input-block count count-child">
                                            <label class="label" for="input-child">Дети до 10 лет:</label>
                                            <div class="block-count">
                                            <input name="input-child" type="number" class="input input-child" value="0">
                                            <div class="buttons-less-more">
                                                <div class="less"></div>
                                                <div class="more"></div>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="input-block count count-baby">
                                            <label class="label" for="input-baby">Дети до 5 лет:</label>
                                            <div class="block-count">
                                            <input name="input-baby" type="number" class="input input-baby" value="0">
                                            <div class="buttons-less-more">
                                                <div class="less"></div>
                                                <div class="more"></div>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="input-block count checkbox-block">
                                            <h2 class="label">Туда и обратно</h2>
                                            <div class="input-checkbox">
                                            </div>
                                        </div>
                                        </div>
                            
                                        <div class="form-block date-input">
                                            <div class="input-block block-date single-data">
                                                <label class="label" for="input-date">Дата:</label>
                                                <input name="input-date" type="text" class="input input-single-date input-date" placeholder="Введите дату">
                                            </div>
                                            <div class="block-date multiple-data disactive">
                                                <div class="input-block data-there multiple-block-date">
                                                    <label class="label" for="input-there">Туда:</label>
                                                    <input name="input-there" type="text" class="input input-there input-date" placeholder="Дата туда">
                                                </div>
                                                <div class="input-block data-back multiple-block-date">
                                                    <label class="label" for="input-back">Обратно:</label>
                                                    <input name="input-back" type="text" class="input input-back input-date" placeholder="Дата обратно">
                                                </div>
                                            </div>
                                        </div>
                            
                                        <div class="form-block button-submit-block">
                                        <button class="button-submit">Найти билеты</button>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>`
        document.body.appendChild(this.div);
    }
}