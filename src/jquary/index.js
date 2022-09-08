const pageNumberEl = document.querySelector('#img-number');
const getImagesButton = document.querySelector("#get-images");
const createTaskButton = document.querySelector('#create-task');
const getTasksButtom = document.querySelector('#show-tasks');
const deleteTaskButtom = document.querySelector('#delete-task');
const deleteTaskNumber = document.querySelector('#id-data');
const createTaskText = document.querySelector('#task-text');

const updateTaskNumber = document.querySelector('#id-update');
const updateTaskText = document.querySelector('#title-update');
const updateTaskButtom = document.querySelector('#update-task');


getImagesButton.addEventListener("click", () => {
    const promis = getImages(pageNumberEl.value);
    promis.then(onImageRecieved);
});

createTaskButton.addEventListener('click', () => {
    createTask(createTaskText.value).then((data) => {
        console.log(data);
    });
});

getTasksButtom.addEventListener('click', () => {
 const promis = getTask ();
    promis.then(onTaskRecieved);
});

updateTaskButtom.addEventListener('click', () => {
    debugger;
    const updatedTaskId = updateTaskNumber.value;
    const updateTaskTitle = updateTaskText.value;
    const promis = updateTask(updatedTaskId, updateTaskTitle);
    promis.then(onTaskUpdated);
})

deleteTaskButtom.addEventListener('click', ()=>{
    const taskId = deleteTaskNumber.value
    deleteTaskNumber.value = '';
    const promis = deleteTask(taskId);
    promis.then(onTaskDeleted);
})



function onImageRecieved(data) {
    data.map(el => {

        //   const img  = document.createElement('img');
        //   img.src = el.thumbnail;
        //   document.querySelector('body').appendChild(img);

        var img = document.querySelector('#img-address');
        img.src = el.thumbnail;
    });
}

function onTaskRecieved(data) {

    const result = document.querySelector('#tasks-result');
        result.innerHTML = '';

    data.map(el => {
        const li = document.createElement('li');
        li.innerHTML = el.title +" ID:"+ el.id;
        result.appendChild(li);

    });
}

function onTaskDeleted() {   

    const promis = getTask();
    promis.then(onTaskRecieved);

}

function onTaskUpdated() {

    const promis = getTask();
    promis.then(onTaskRecieved);

}


// 
// setTimeout(function () {
//     console.log(1);
    
// }, 1000);

// console.log(2);