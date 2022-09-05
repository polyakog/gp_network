const pageNumberEl = document.querySelector('#img-number');
const clickMeButton = document.querySelector("#get-images");
const getTasksButtom = document.querySelector('#show-tasks');

clickMeButton.addEventListener("click", () => {
    const promis = getImages(pageNumberEl.value);
    promis.then(onImageRecieved);
});

getTasksButtom.addEventListener('click', () => {
 const promis = getTask ();
    promis.then(onTaskRecieved);
});

createTask("work").then((data) =>{

console.log(data);
});

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
    data.map(el => {
        const li = document.createElement('li');
        li.innerHTML = el.title +" ID:"+ el.id;
        document.querySelector('#tasks-result').appendChild(li);

    });
}


// 
// setTimeout(function () {
//     console.log(1);
    
// }, 1000);

// console.log(2);