let taskArray = [];

if (window.localStorage.getItem("task") !== null) {
    //put the tasks from local storage to our array of tasks
    taskArray = JSON.parse(window.localStorage.getItem("task"))
    //put the tasks to page
    addToPage(taskArray)
} else {
    taskArray = []
}

$(document).ready(function () {
    $("input").change(function () {
        let inputValue = $("input").val();
        taskArray.push(inputValue)
        addToPage(taskArray)
        saveToLocalStorage(taskArray)
    });

    $("ul").on("click", ".fa-trash", function () {
        $(this).parent().parent().fadeOut(300);
    });

    $("ul").on("click", ".fa-check", function () {
        $(this).parent().parent().toggleClass("completed");
    });
})

// add tasks to page
function addToPage(arr) {
    document.querySelectorAll("li").forEach((el) => el.remove());
    arr.forEach((task, index) => {
        //add li tag with the input value
        let liTag = `
        <li>
            <p>${task}</p>
            <div class="icons">
                <i class="fa-solid fa-check"></i>
                <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
            </div>
        </li>`
        $("ul").append(liTag)
    })
    //make the input empty
    $("input").val("");
}

function deleteTask(index) {
    taskArray.splice(index, 1);
    saveToLocalStorage(taskArray)
    addToPage(taskArray)
}

// save to local storage
function saveToLocalStorage(arr) {
    window.localStorage.setItem("task", JSON.stringify(arr))
}