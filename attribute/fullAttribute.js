const fullAttribute = {
  shop_name: {
    label: "Назва магазину",
    src: "html",
  },
  title: {
    label: "Продукт",
  },
  cost: {
    label: "Вартість",
  },
  image: {
    label: "Зображення",
    value: (data) => {
      if (data["image"] !== "") {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = data["image"];
        img.alt = data["title"];
        div.append(img);
        return div;
      }
    },
  },
};
