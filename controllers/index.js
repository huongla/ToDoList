//Tạo mảng dữ liệu quản lý các task
var arrTasks = []; //mảng lưu trữ các task được add vào
var validate = new Validation();
var id = 0;

//Lấy dữ liệu khi người dùng nhập vào
document.getElementById('btnAddTask').onclick = function () {
    var t = new Tasks();

    t.taskName = document.getElementById('task__Name').value;
    t.taskId = id++;
    t.action = false;

    var valid = true;
    valid &= validate.checkNull(t.taskName, '#err_taskName_checkNull');
    if (!valid) {
        return;
    }
    arrTasks.push(t);
    addDivPending(t);
}

var addDivPending = function (t) {
    var count1 = countDiv("itemPending");
    var newDiv = document.createElement("DIV");

    var newId = "pending" + count1;
    newDiv.setAttribute("id", newId);
    newDiv.setAttribute("class", "itemPending row m-1 py-1 border rounded bg-white text-secondary");
    var contentDiv = '';
    contentDiv += `
        <div class="col-10 pr-0">
            <span>${t.taskName}</span>
        </div>
        <div class="col-1 pl-0" onclick="removeTask('${newId}','${t.taskId}')"><i class="fa fa-trash-alt"></i></div>
        <div class="col-1 pl-0" onclick="checkTask('${newId}','${t.taskName}','${t.taskId}')"><i class="fa fa-check-circle"></i></div>
    `
    newDiv.innerHTML = contentDiv;
    document.getElementById('toDoList__pending').appendChild(newDiv);
    document.getElementById('task__Name').value = '';
}
var countDiv = function (divName) {
    var count = document.getElementsByClassName(divName).length;
    return count;
}

var removeTask = function (codeId,id) {
    $("div#" + codeId).remove();
    //Chỉ xóa những action không làm
    for (var index = arrTasks.length - 1; index >= 0; index--) {
        var t = arrTasks[index];
        if (t.taskId === Number(id) && (!t.action)) {
            arrTasks.splice(index, 1);
        }
    }
    console.log('arrTasks',arrTasks);
    
}

var checkTask = function (codeId, tn, id) {
    var count2 = countDiv("itemDone");
    var newId2 = "done" + count2;
    var newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", newId2);
    newDiv.setAttribute("class", "itemDone row m-1 py-1 border rounded bg-white text-info")
    var contentDiv = '';
    contentDiv += `
                    <div class="col-10 pr-0">
                        <span>${tn}</span>
                    </div>
                    <div class="col-1 pl-0" onclick="removeTask('${newId2}','${id}')"><i class="fa fa-trash-alt text-secondary"></i></div>
                    <div class="col-1 pl-0" onclick="inform()"><i class="fa fa-check-circle"></i></i></div>

            `
    newDiv.innerHTML = contentDiv;
    document.getElementById('toDoList__done').appendChild(newDiv);

    for (var index = 0; index <= arrTasks.length - 1; index++) {
        var t = arrTasks[index];
        if (t.taskId === Number(id)) {
            t.action = true;
        }
    }
    
    $("div#" + codeId).remove();
}
var inform = function(){
    alert('Công việc đã hoàn thành!');
}
