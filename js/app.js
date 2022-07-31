const output = document.querySelector('.output');


// get request form
const getForm = document.querySelector('#get-request-form');
const getURL = getForm.querySelector('input');

// make get request on submit
getForm.addEventListener('submit', fetchData);
function fetchData(e) {
    e.preventDefault();
    const request = new httpLib();
    request.get(getURL.value, displayData);
}


// display data fetched
function displayData(error, response) {
    let responseOutput = '';
    // output the error if error encountered 
    if (error) {
        responseOutput = `<div class="card">${error}<div>`
        output.innerHTML = responseOutput;
        
    // otherwise - output the data
    } else {
        // parse json string into array
        let res = JSON.parse(response);
        res.forEach(item => {
            // for every item in array - grab the key and it's value
            let values = '';
            for (const key in item) {
                values += `<p>${key}: ${item[key]}</p>`;
            }
            // put that data in a containing div for UI
            responseOutput = `
            <div class="card">
                ${values}
            </div>
            `;

            // output to UI
            output.innerHTML += responseOutput;
        })
    }
}