let startX = 0, startY = 0, endX = 0, endY = 0;
let fill = "no";
let color = "blue";

function getFirstPosition(e) {
    if (e.type === "mousedown") {
        let zoomValue = window.getComputedStyle(document.getElementById("root-canvas")).zoom;
        startX = e.pageX / zoomValue - e.target.offsetLeft;
        startY = e.pageY / zoomValue - e.target.offsetTop;
    } else {
        let touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        startX = touch.clientX - $(e.target).offset().left;
        startY = touch.clientY - $(e.target).offset().top;
        console.log(startX, startY);
    }

}

function getSecondPosition(e) {
    if (e.type === "mouseup") {
        let zoomValue = window.getComputedStyle(document.getElementById("root-canvas")).zoom;
        endX = e.pageX / zoomValue - e.target.offsetLeft;
        endY = e.pageY / zoomValue - e.target.offsetTop;
    } else {
        let touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        endX = touch.clientX - $(e.target).offset().left;
        endY = touch.clientY - $(e.target).offset().top;
    }
}

function calculateWidth() {
    return endX - startX;
}

function calculateHeight() {
    return endY - startY;
}

function paintRect() {
    let canvas = document.getElementById("root-canvas");
    let ctx = canvas.getContext("2d");
    let width = calculateWidth();
    let height = calculateHeight();
    if (fill === "no") {
        ctx.strokeStyle = color;
        ctx.strokeRect(startX, startY, width, height);
    } else {
        ctx.fillStyle = fill;
        ctx.strokeStyle = color;
        ctx.fillRect(startX, startY, width, height);
        ctx.strokeRect(startX, startY, width, height);
    }
}

function clear() {
    let canvas = document.getElementById("root-canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//
// function paintPreview() {
//     let canvas = document.getElementById("root-canvas");
//     let ctx = canvas.getContext("2d");
//     let width = calculateWidth();
//     let height = calculateHeight();
//     ctx.fillStyle = 'grey';
//     ctx.strokeRect(startX, startY, width, height);
// }

// function clearPreview() {
//     let canvas = document.getElementById("root-canvas");
//     let ctx = canvas.getContext("2d");
//     let width = calculateWidth();
//     let height = calculateHeight();
//     ctx.clearRect(startX, startY, width, height);
// }

function setRealSize() {
    let canvas = $("#root-canvas");
    canvas.attr("width", window.innerWidth);
    canvas.attr("height", (window.innerHeight - document.getElementById("header").offsetHeight - 10));
}

$(document).ready(() => {
    setRealSize();
    let flag = false;
    let root = $("#root-canvas");
    root.on("mousedown touchstart", (e) => {
        flag = true;
        getFirstPosition(e);
    })
    root.on("touchend", (e) => {
        if (flag === false)
            return
        getSecondPosition(e);
    })
    root.on("mouseup touchend", (e) => {
        flag = false;
        getSecondPosition(e);
        paintRect();
    })
    $("#clearBtn").on("click", () => {
        clear();
    })
    $("#colorLine + .dropdown-menu > a").on("click", (e) => {
        color = e.target.getAttribute("my-value");
    })
    $("#fillColor + .dropdown-menu > a").on("click", (e) => {
        fill = e.target.getAttribute("my-value");
    })
})