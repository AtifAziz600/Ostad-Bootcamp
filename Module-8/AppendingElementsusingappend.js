function addItem() {

    const input = document.getElementById("itemInput");

    const newItem = document.createElement("li");

    newItem.textContent = input.value;

    document.getElementById("itemList").append(newItem);

    input.value = "";
}

addItem();