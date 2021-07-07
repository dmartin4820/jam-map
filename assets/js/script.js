function makeItunesCall(searchTerm) {
	var fullUrl = "https://itunes.apple.com/search?term=" + searchTerm + "&media=music&attribute=songTerm&limit=200&callback=getItunesData";
	var scriptEl = document.createElement("script");
	var bodyEl = document.body;

	scriptEl.setAttribute("src", fullUrl);
	scriptEl.setAttribute("id", "api-call")
	bodyEl.appendChild(scriptEl);
	bodyEl.removeChild(scriptEl);
}


function getItunesData(response) {
	console.log(response.results)

	var searchResults = response.results;
	parseItunesResults(searchResults);
}

function parseItunesResults(searchResults) {
	var desiredResult;
	for (var i = 0; i < searchResults.length; i++) {
		if (searchResults[i].artistId === artistId) {
			desiredResult = searchResults[i];
		}
	}

	if (!desiredResult) {
		console.log("Error: Artist not found");
	}


}

function parseBpmResults(bpmObjArr) {
	for (var i = 0; i < bpmObjArr.length; i++) {
		
	}	
}

//makeItunesCall("travis+scott+antidote");//+antidote");

function plusDelimitString(str) {
	var tempArr = str.split(" ");
	return tempArr.join("+");
}

console.log(plusDelimitString("Michael Jackson"))




































































































































































































// ------------------------ START OF NEW WORK SPACE ----------

// EMPTY ARRAY TO PUSH OBJECTS

// BPM RANGE SELECTOR
var maxBPMLabel = document.getElementById('maxBPMLabel')
var maxBPMRange = document.getElementById('maxBPMRange')
var minBPMLabel = document.getElementById('minBPMLabel')
var minBPMRange = document.getElementById('minBPMRange')
var BPMValue = document.getElementById('BPMValue');
// GENRE SELECTION
var genreLabel = document.getElementById('genreLabel')
var genreDropdown = document.getElementById('genreDropdown')
// YEAR SELECTORS
var maxYearLable = document.getElementById('maxYearLabel')
var maxYearRange = document.getElementById('MaxYearRange')
var currentMaxYear = document.getElementById('currentMaxYear')
var minYearLabel = document.getElementById('minYearLabel')
var minYearRange = document.getElementById('MinYearRange')
var currentMinYear = document.getElementById('currentMinYear')
// ORIGIN 
var originLabel = document.getElementById('originLabel')
var originDropdown = document.getElementById('originDropdown')
// KEY SELECTOR
var keyLabel = document.getElementById('keyLabel')
var keyDropdown = document.getElementById('keyDropdown')
// BUTTON SELECTOR 
var submitBTN = document.getElementById('submitBTN')

console.log(genreDropdown.value)



function GetBpmApi(integer) {
    fetch(`https://api.getsongbpm.com/tempo/?api_key=893450d85c97cdffba8a49349f3d8974&bpm=${integer}`)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var objArr = createArrObj(data)
        parseBpmResults(objArr)
    })
}


submitBTN.addEventListener('click', GetBpmApi)



function createArrObj(inputData){
    var arrayOfObjects = [];
    for(i=0; i < inputData.length; i++) {
        songInfo = {
            name: inputData.tempo[i].artist.name,
            mbid: inputData.tempo[i].artist.mbid,
            songName: inputData.tempo[i].song_title,
            year: inputData.tempo[i].album.year
        }
        arrayOfObjects.push(songInfo)
    }
    return arrayOfObjects;
}
