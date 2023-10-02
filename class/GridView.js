class GridView {
  /**
   * properties
   * @param [array] _tableClass - css классы таблицы;
   * @param [array] _headerClass - css классы заголовка;
   * @param [array] data - выходные данные;
   * @param [array] attribute - управляем тем что выводим;
   * @param [array] _element - куда выводить таблицу;
   * @param [array] _header - заголовок таблицы;
   * @param [array] _counter - счетчик в таблице;
   */

  constructor() {
    this._header = "";
    this._tableClass = [];
    this._headerClass = [];
    this.attribute = [];
    this._element = "";
    this.data = [];
    this._counter = false;
  }

  /**
   * method set header() - проверка на тип данных;
   */
  setHeader(header) {
    this._header = header;
    if (typeof this._header === "string" && this._header.trim() != "") {
      this._header = header.trim();
      return true;
    }
    return false;
  }

  get header() {
    return this._header;
  }

  /**
   * method set headerClass() - проверка на тип данных;
   */
  setHeaderClass(headerClass) {
    if (typeof this._headerClass === "object") {
      this._headerClass = headerClass;
      return true;
    }
    return false;
  }

  get headerClass() {
    return this._headerClass;
  }

  /**
   * method set element() - проверка существует ли этот элемент;
   */

  setElement(element) {
    const section = document.createElement("section");
    const body = document.querySelector("body");
    this._element = section;
    body.appendChild(section);
    return true;
  }

  get element() {
    return this._element;
  }

  /**
   * Устанавливает значение счетчика для таблицы.
   * @param {boolean} counter - Если `true`, то столбец с номерами будет отображаться, иначе - скрываться.
   * @returns {boolean} - Возвращает `true`, если значение счетчика было успешно установлено, иначе - `false`.
   */
  setCounter(counter) {
    if (typeof counter === "boolean") {
      this._counter = counter;
      return true;
    }
    return false;
  }

  /**
   * Отрисовывает заголовок таблицы, если заголовок задан.
   * @returns {HTMLElement|null} - Возвращает созданный элемент заголовка (`<h3>`) или `null`, если заголовок не задан.
   */

  renderHeader() {
    // show header
    if (this._header) {
      const header = document.createElement("h3");
      header.textContent = this._header;
      this._headerClass.forEach((cssClass) => {
        header.classList.add(cssClass);
      });
      this._element.append(header);
      return header;
    }
    return null;
  }

  /**
   * Создает и возвращает элемент `<th>` с содержанием "№", если счетчик включен.
   * @returns {HTMLElement|null} - Возвращает созданный элемент `<th>` или `null`, если счетчик выключен.
   */
  addCounter() {
    if (this._counter === true) {
      const thCounter = document.createElement("th");
      thCounter.textContent = "№";
      return thCounter;
    }
    return null;
  }

  /**
   * method for show GridViewTable - отрисовывает таблицу на странице;
   */
  render(arg) {
    this.setElement(arg.element);
    this.setHeaderClass(arg.headerClass);
    this.attribute = arg.attribute;
    this.setHeader(arg.header);
    this.data = arg.data;
    this.setCounter(arg.counter);

    this.renderHeader();

    // create table
    const table = document.createElement("table");
    this._tableClass.forEach((cssClass) => {
      table.classList.add(cssClass);
    });

    // create header row - создаем строку заголовка;
    const trHeader = document.createElement("tr");

    // add counter;
    const thCounter = this.addCounter();

    if (thCounter !== null) {
      trHeader.append(thCounter);
    }

    // create th - создаем заглавие таблицы;
    for (let key in this.attribute) {
      const th = document.createElement("th");
      if (this.attribute[key].label) {
        th.textContent = this.attribute[key].label;
      } else {
        th.textContent = key;
      }
      trHeader.append(th);
    }
    table.append(trHeader);

    // drow body of table - отрисовывает тело таблицы
    let count = 0; // инициализируем счетчик

    // create the same row for each data item
    for (let i = 0; i < this.data.length; i++) {
      const tr = document.createElement("tr");

      if (thCounter !== null) {
        count += 1;
        // add the counter value
        const tdCounter = document.createElement("td");
        tdCounter.textContent = count;
        tr.append(tdCounter);
      }

      let dataArr = this.data[i];
      for (let key in this.attribute) {
        let value = dataArr[key];
        // проверяем есть ли функция в value
        if (this.attribute[key].value) {
          value = this.attribute[key].value(dataArr);

          // проверяем, если value - это элемент td, то добавляем его напрямую в строку
          if (value instanceof HTMLElement) {
            const td = document.createElement("td");
            td.append(value);
            tr.append(td);
          }
        } else {
          // в противном случае, устанавливаем текстовое содержимое ячейки
          const td = document.createElement("td");
          td.textContent = value;
          tr.append(td);
        }
      }
      table.append(tr);
    }
    this._element.appendChild(table);

    return table;
  }
}
