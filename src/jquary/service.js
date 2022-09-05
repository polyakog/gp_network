

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


function getTask() {

    const promis = axios.get(`https://repetitora.net/api/JS/Tasks?widgetId=4422`);
    return promis.then((response) => {
        return response.data;
    });

}

function createTask(title) {
    const promis = axios.post(`https://repetitora.net/api/JS/Tasks?widgetId=4422&title=${title}`);
    return promis.then((response) => {
        return response.data;
    });

}