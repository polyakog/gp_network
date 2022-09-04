

function getImages(pageNumber) {

    const data = $.ajax(`https://repetitora.net/api/JS/Images?page=${pageNumber}&count=1`);

    return data;

}