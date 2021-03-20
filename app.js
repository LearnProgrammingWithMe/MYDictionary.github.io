let input = document.querySelector("#input");

let searchBtn = document.querySelector("#search");

let apiKey = '58b2baa0-7645-488a-9a0f-dfbd63060075';

let not_found = document.querySelector(".not_found");

let defBox = document.querySelector(".def");

let audioBox = document.querySelector(".audio");

let loading = document.querySelector(".loading");

searchBtn.addEventListener('click' , (e) =>{
    e.preventDefault();

    // clear data 

    audioBox.innerHTML = '';

    not_found.innerText = '';

    defBox.innerText = ''; 

    //get input data

    let word = input.value;

    // call API get data

    if (word === '') {
        alert("Write a word!");
        return;
    }

    getData(word);
});



async function getData(word) {
    loading.style.display = "block";

    // Ajax Call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

    const data = await response.json();

    // console.log(data);
    // check data
    if (!data.length) {
        loading.style.display = "none";

        not_found.innerText = 'Result Not Found!';
        return;
    }

    // If result is suggetions
    if (typeof data[0] === 'string') {
        loading.style.display = "none";

        let heading = document.createElement('h3');
        heading.innerText = 'Did You Mean?';
        not_found.appendChild(heading);

        data.forEach(element => {
            let suggetions = document.createElement('span');

            suggetions.classList.add('suggested');

            suggetions.innerText = element;

            not_found.appendChild(suggetions);
        })
    }

    console.log(data);
    // return;

    // Result found 
    loading.style.display = "none";
    let defination = data[0].shortdef[0];

    defBox.innerText = defination;

    // Sound 

    const soundName = data[0].hwi.prs[0].sound.audio;

    if (soundName) {
        // true
        renderSound(soundName);
    }
}


function renderSound(soundName) {
    // https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);

    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');

    aud.src = soundSrc;

    aud.controls = true;

    audioBox.appendChild(aud);
}


// console.log(data);
// console.log(defination);


//! API password P@pTMgjH4VBj9Fu

