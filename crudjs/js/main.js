var list = [
    {
        "item" : "rice",
        "value" : "10.00",
        "amount" : "1"
    },
    {
        "item" : "beer",
        "value" : "2.50",
        "amount" : "3"
    },
    {
        "item" : "pen",
        "value" : "2.00",
        "amount" : "4"
    }
];



function getList(list) {
    var i = 0;
    for (var key in list) {
        i += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(i);
};

function getTotal(list) {
    var table = '<thead><tr><th>Item</th><th>Price</th><th>Amount</th><th>Action</th></tr></thead><tbody>';
    for (var key in list) {
        table += '<tr><td>' + formatItem(list[key].item) + '</td><td>' + formatValue(list[key].value) + '</td><td>' + formatAmount(list[key].amount) + '</td><td><button onclick="editItem('+ key +')" class="btn btn-default">Edit</button><button onclick="deleteItem('+ key +')" class="btn btn-default">Delete</button></td></tr>';
    }
    table += '</tbody>';
    
    document.getElementById("idTable").innerHTML = table;
    getList(list);
    saveItemLocaStorage();
};

getTotal(list);

function formatItem(item) {
    var str = item.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
}

function addItem() {
    if (!formValidate()) {
        return;
    }

    var item = document.getElementById("item").value;
    var value = document.getElementById("value").value;
    var amount = document.getElementById("amount").value;
    
    list.unshift(
        {
            "item" : item,
            "value" : value,
            "amount" : amount
        }
        );    
        getTotal(list);
        
    }
    
function editItem(id) {
    var obj = list[id];
    
    document.getElementById("item").value = obj.item;
    document.getElementById("value").value = obj.value;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
    
    document.getElementById("inputUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+ id +'">';
    
}
    
function cancelItem() {
    document.getElementById("item").value = "";
    document.getElementById("value").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    
    document.getElementById("inputUpdate").innerHTML = "";
}
    
function saveItem() {
    if (!formValidate()) {
        return;
    }

    var id = document.getElementById("idUpdate").value;
    var item = document.getElementById("item").value;
    var value = document.getElementById("value").value;
    var amount = document.getElementById("amount").value;

    
    
    list[id] = {
        "item" : item,
        "value" : value,
        "amount" : amount
    };
    cancelItem();
    getTotal(list);
}

function deleteItem(id) {
    if (confirm("Delete this item?")) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrayIni = list.slice(0,id);
            var arrayEnd = list.slice(id + 1);

            list = arrayIni.concat(arrayEnd);
        }
        getTotal(list);
    }
}

function formatAmount(amount) {
    return parseInt(amount);
}

function formValidate() {
    var item = document.getElementById("item").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    document.getElementById("error").style.display = "none";
    var error = "";

    if (item === "") {
        error += 'Preencha o item corretamente<br>';
    }
    if (amount === "") {
        error += 'Preencha a quantidade corretamente<br>';
    } else if (amount != parseInt(amount)) {
        error += 'Preencha a quantidade corretamente<br>';
    }
    if (value === "") {
        error += 'Preencha o valor corretamente<br>';
    } else if (value != parseFloat(value)) {
        error += 'Preencha o valor corretamente<br>';
    }

    if (error != "") {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "<h3>Error: </h3>" + error;
        return 0;
    } else {
        return 1;
    }
}

function deleteList() {
    if (confirm("delete this list?")) {
        list = [];
        getTotal(list);
    }
}

function saveItemLocaStorage() {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function initListStorage() {
    var testList = localStorage.getItem("list");
    if (testList) {
        list = JSON.parse(testList);
    }
    getTotal(list);
}

initListStorage();