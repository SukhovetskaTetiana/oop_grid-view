// fullGridView
let fullGridView = new GridView();
const arg1 = {
  element: document.body,
  header: "Повний перелік компаній та товарів",
  headerClass: ["header"],
  attribute: fullAttribute,
  data: data,
  counter: true,
};
fullGridView.render(arg1);

// shopNameGrid
let shopNameGrid = new ShopNameGridView();
const arg3 = {
  element: document.body,
  header: "Перелік компаній",
  attribute: shopNameAttribute,
  headerClass: ["header"],
  data: data,
  counter: false,
};
shopNameGrid.render(arg3);

// shopNameGridView
let shopNameGridView = new GridView();
const arg2 = {
  element: document.body,
  header: "Перелік всіх товарів та ID товару",
  headerClass: ["header"],
  attribute: titleAttribute,
  data: data,
  counter: true,
};
shopNameGridView.render(arg2);
