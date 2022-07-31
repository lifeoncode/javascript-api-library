

// HTTP LIBRARY
function httpLib() {
    this.http = new XMLHttpRequest();
}

// GET method
httpLib.prototype.get = function(url, callback) {
    this.http.open('GET', url, true);

    // preserve THIS
    const self = this;
    this.http.onload = function() {
        if (self.http.status === 200) {
            // error is Null if status is OK
            callback(null, self.http.response);

        } else {
            callback(`Error ${self.http.status}`);
        }
    }
    this.http.send();
}