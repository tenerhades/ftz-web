let counter = 0;

setInterval(() => {
    counter++;
    const tag = document.getElementById("counter");

    tag.innerHTML = "<em>" + counter.toString() + "</em>";
}, 100);

(function () {
    console.log('getting meminfo...');
    const tag = document.getElementById("meminfo");

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/meminfo');
    xhttp.send();

    xhttp.onreadystatechange = function() {
        tag.innerHTML = this.response.toString();
        console.log(this.response);
    };

    // console.log(temp);
})();
