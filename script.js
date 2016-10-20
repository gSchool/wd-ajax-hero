'use strict'
window.onload = function() {
    document.getElementById('button').addEventListener('click', doAjax);

}

function doAjax(event) {
    let title = document.getElementById('search').value;
    event.preventDefault();


    jQuery.ajax({
        url: `https://www.omdbapi.com/?t=${title}&y=&plot=short&r=json`,
        method: "GET",
        success: function(data) {
            var infoArea = document.getElementById('listings')
            infoArea.innerHTML = '';

            let p = document.createElement('p');
            let img = document.createElement('img');

            img.src = data.Poster;
            p.innerText = data.Plot;

            infoArea.appendChild(p);
            infoArea.appendChild(img);
        }
    });
}
