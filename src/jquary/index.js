const pageNumberEl = document.querySelector('#img-number');

const clickMeButton = document.querySelector("#click-me");
clickMeButton.addEventListener("click", () => {
    const promis = getImages(pageNumberEl.value);
    promis.then(onDataRecieved);
});


function onDataRecieved(data) {
    data.map(el => {

        //   const img  = document.createElement('img');
        //   img.src = el.thumbnail;
        //   document.querySelector('body').appendChild(img);

        var img = document.querySelector('#img-address');
        img.src = el.thumbnail;
    });
}






// 
// setTimeout(function () {
//     console.log(1);
    
// }, 1000);

// console.log(2);