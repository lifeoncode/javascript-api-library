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
    window.scrollTo(0, 600);
    let responseOutput = '';
    // output the error if error encountered 
    if (error) {
        responseOutput = `<div class="card">${error}<div>`;
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




// post request form
const postForm = document.querySelector('#post-request-form');
const postURL = postForm.querySelector('input');

// make post request on submit
postForm.addEventListener('submit', postData);

function postData(e) {
    e.preventDefault();
    // first gather data to post
    const request = new httpLib();
    // make get request to figure out info required for post
    request.get(postURL.value, function(error, response) {
        // output the error if error encountered 
        if (error) {
            responseOutput = `<div class="card">${error}<div>`;
            output.innerHTML = responseOutput;

        // otherwise - gather required data and send post request
        } else {
            gatherPostData(postURL, response);
        }
    });
}



// gather data
function gatherPostData(url, response) {
    const dataForm = document.querySelector('#custom-form');
    let responseOutput = '';
    // parse json string into array
    let res = JSON.parse(response);
    let item = res[0];
    
    let values = '';
    for (const key in item) {
        values += `<input type="text" placeholder="Enter ${key}" required>`;
    }
    responseOutput += `${values}`;
    
    // output required data in a form
    // prompt user to enter data
    dataForm.innerHTML = `
    <h3 class="heading">Fill Post Data</h3>
    ${responseOutput}
    <button type="submit" class="btn">confirm and send</button>
    `;
    dataForm.classList.add('show');

    // listen for submit on custom form
    dataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // get all keys with values
        let keys = [];
        let cleanKeys = [];
        let values = [];
        this.querySelectorAll('input').forEach(input => {
            keys.push(input.placeholder);
            cleanKeys.push(input.placeholder.replace('Enter ', ''));
            values.push(input.value);
        });

        let data = {};
        for (let i = 0; i <= cleanKeys.length; i++) {
            data[cleanKeys[i]] = values[i];
        }

        makePost(url, data);
    })
}


// make post request
function makePost(url, data) {
    const request = new httpLib();
    request.post(url, data, function(response) {
        console.log(response);
    });
}