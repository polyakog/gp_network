

// function getImages(pageNumber) {

//     const data = $.ajax(`https://repetitora.net/api/JS/Images?page=${pageNumber}&count=1`);

//     return data;

// }

function getImages(pageNumber) {

    const promis = axios.get(`https://repetitora.net/api/JS/Images?page=${pageNumber}&count=1`);
    return promis.then((response) => {
        return response.data;
    });

}

const widgetId = 4425;

function getTask() {

    const promis = axios.get(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`);
    return promis.then((response) => {
        return response.data;
    });

}

function createTask(props) {
    const promis = axios.post(`https://repetitora.net/api/JS/Tasks`, {
        widgetId: widgetId,
        title: props
    });
    return promis.then((response) => {
        return response.data;
    });

}

function updateTask(taskId, title) {
    
    const promis = axios.put(`https://repetitora.net/api/JS/Tasks`, {
        widgetId: widgetId,
        taskId: taskId,
        title: title
    });
    return promis.then((response) => {
        return response.data;
    });

}

function deleteTask(props) {
    const promis = axios.delete(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}&taskId=${props}`);
    return promis.then((response) => {
        return response.data;
    });

}