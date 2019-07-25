const express = require('express') //Express
const body_parser = require('body-parser') //Body Parser to parse the input that we receive
const url = require('url') // URL which does various functions on a URL

const app = express()

//middleware
app.use(body_parser.json())

//function to validate URL
// returns true or false
const validate = (url) => {

    // Regex Expression to check URL Format
    var regex = new RegExp(
        "^" +
        // protocol identifier (optional)
        // short syntax // still required
        "(?:(?:(?:https?|ftp):)?\\/\\/)" +
        // user:pass BasicAuth (optional)
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
            // IP address exclusion
            // private & local networks
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
            // host & domain names, may end with dot
            // can be replaced by a shortest alternative
            // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
            "(?:" +
            "(?:" +
                "[a-z0-9\\u00a1-\\uffff]" +
                "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
            ")?" +
            "[a-z0-9\\u00a1-\\uffff]\\." +
            ")+" +
            // TLD identifier name, may end with dot
            "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
        ")" +
        // port number (optional)
        "(?::\\d{2,5})?" +
        // resource path (optional)
        "(?:[/?#]\\S*)?" +
        "$", "i"
    );
      
    return !!url.match(regex)
    
}

//validate URL
app.post('/validateURL', (req, res) => {
      
    var req_url = req.body.url //gets the url from the request

    //gets the root url from the submitted url
    //Example: 
    //if Submitted URL = https://facebook.com/signup
    //root URl = https://facebook.com
    var q = url.parse(req_url, true) 

    //Stores info about the submitted URL
    var result = {
        'Submitted URL': req_url,
        'Root URL': q.hostname, //q.hostname contains the root URL
        'Valid': validate(req_url) //calling our validate function
    }

    res.send(result) //finally sending back the result

})

//generate key - yet to be implemented
app.post('/generateKey', (req, res) => {

})

//validate key - yet to be implemented
app.post('/validateKey', (req, res) => {
    
})

// 3000 is the port which we wanna listen to
// Example: localhost:3000/
app.listen(3000)