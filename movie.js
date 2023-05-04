let form = document.querySelector("form")
let input = document.querySelector("input")
// console.log("hii")
form.onsubmit = (e) => {

    e.preventDefault()
    if (input.value.length === 0) {
        alert("write something")
    }
    else {
        fetch("https://api.themoviedb.org/3/search/movie?api_key=d99062135fb11777abdedc129ba2b6c7&language=en-US&query=" + input.value + "&page=1&include_adult=false")
            .then((Response) => {
                return Response.json()
            })
            .then((result) => {
                // console.log(result)
                showresults(result)
            })
    }

    movieSection.innerHTML = ""
}
console.log()
var movieSection = document.querySelector("#results")
function showresults(result) {

    for (let i = 0; i < result.results.length; i++) {
        let movieDiv = document.createElement("div")
        movieDiv.classList = "movieDiv"
        let movieImg = document.createElement("img")
        // movieImg.src = "https://image.tmdb.org/t/p/original" + result.results[i].poster_path
        let movieHeading = document.createElement("h2")
        movieHeading.innerHTML = result.results[i].original_title
        if (result.results[i].poster_path === "") {

            movieImg.src = "/blank image.jpg"
        }
        else {
            movieImg.src = "https://image.tmdb.org/t/p/original" + result.results[i].poster_path

        }
        movieDiv.append(movieImg)
        movieSection.append(movieDiv)
        movieDiv.append(movieHeading)
        fetch('https://api.themoviedb.org/3/movie/' + result.results[i].id + '/videos?api_key=d99062135fb11777abdedc129ba2b6c7&language=en-US')
            .then((Response) => {
                return Response.json()
            })
            .then((result) => {
                console.log(result)
                if (result.results.length > 0) {
                    const videoKey = findTrailer(result.results)
                    createAnchor(videoKey, movieDiv)
                }
            })

    }

}
function findTrailer(obj) {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].site === "YouTube" && obj[i].type === "Trailer") {
            return obj[i].key
        }
    }
}

function createAnchor(videoKey, movieDiv) {

    let ankor = document.createElement("a")
    ankor.innerHTML = "Trailer"
    ankor.setAttribute("target", "_blank")
    movieDiv.append(ankor)
    ankor.href = "https://youtube.com/embed/" + videoKey;
}