

// HTTP LIBRARY
function httpLib() {
    this.http = new XMLHttpRequest();
}

// GET request method
httpLib.prototype.get = function(url, callback) {
    this.http.open('GET', url, true);

    // preserve THIS
    const self = this;
    this.http.onload = function() {
        if (self.http.status === 200) {
            // error is Null if status is OK
            console.log('SUCCESS!!');
            callback(null, self.http.response);

        } else {
            callback(`Error ${self.http.status}`);
        }
    }
    this.http.send();
}


// POST request method
httpLib.prototype.post = function(url, data, callback) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    const self = this;
    this.http.onload = function() {
        console.log('SUCCESS!!');
        // callback(null, self.http.response);
        console.log(self.http.response);
        callback(self.http.response);
    }
x
    this.http.send(data);
}
