class ShopNameGridView extends GridView {
  constructor() {
    super();
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

    // show header of the table;
    super.renderHeader();

    let table = document.createElement("table");
    // create header row - создаем строку заголовка;
    const trHeader = document.createElement("tr");
    // add counter;
    let thCounter = super.addCounter();

    if (thCounter !== null) {
      trHeader.append(thCounter);
    }
    //show th - создаем заглавие таблицы;
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

    const uniqueShopNames = {}; // объект для отслеживания уникальных названий магазинов
    let counter = 0; // инициализируем счетчик;

    // filter label and drow body
    for (let i = 0; i < this.data.length; i++) {
      let dataArr = this.data[i];

      if (!uniqueShopNames[dataArr.shop_name]) {
        const trBody = document.createElement("tr");

        if (thCounter !== null) {
          counter += 1;
          const tdCounter = document.createElement("td");
          tdCounter.textContent = counter;
          trBody.append(tdCounter);
        }

        const tdId = document.createElement("td");
        tdId.textContent = dataArr.id;
        trBody.append(tdId);

        const tdShopName = document.createElement("td");
        tdShopName.textContent = dataArr.shop_name;
        trBody.append(tdShopName);

        uniqueShopNames[dataArr.shop_name] = true;

        table.append(trBody);
      } else {
        continue;
      }
    }
    this._element.append(table);
    return table;
  }
}
