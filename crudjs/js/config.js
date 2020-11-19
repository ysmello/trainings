function setTitle() {
    var text = {
        "title" : "App Control"
    };

    document.text = text.title;
    document.getElementById("navTitle").innerHTML = text.title;
}

setTitle();