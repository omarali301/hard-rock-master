
const searchSongs = () => {

    const searchText = document.getElementById("searchField").value;

    const url = `https://api.lyrics.ovh/suggest/:${searchText}`


    fetch(url)

        .then(res => res.json())

        .then(data => displaySongs(data.data))

        .catch(error => displayError("Sorry I am faild to load please try again latter"));





    // const searchSongs = async () => {

    //     const searchText = document.getElementById("searchField").value;

    //     const url = `https://api.lyrics.ovh/suggest/:${searchText}`


    //     const res = await fetch(url);

    //    const data = await res.json();

    //    displaySongs(data.data)


}

const displaySongs = songs => {

    const songContainer = document.getElementById("song-container")
    songContainer.innerHTML = '';

    songs.forEach(song => {

        const songDiv = document.createElement("div")

        songDiv.className = 'single-result row align-items-center my-3 p-3';

        songDiv.innerHTML = `
    
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>

        <audio controls>
        <source src="${song.preview}" type="audio/mpeg">
        </audio>
         </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick ="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
         </div>
    
    `
        songContainer.appendChild(songDiv)
    });

}


const getLyric = async (artist, title) => {

    const url = ` https://api.lyrics.ovh/v1/:${artist}/:${title}`

    try {

        const res = await fetch(url);

        const data = await res.json();

        displayLyrics(data.lyrics);


    }

    catch (error) {


        displayError("sorry I am not able to load please try again letter");
    }



}


const displayLyrics = lyrics => {

    const lyricDiv = document.getElementById('songlayrics')

    lyricDiv.innerText = lyrics;

}


const displayError = error => {


    const errorTag = document.getElementById("erorr-massage")

    errorTag.innerText = error;
}