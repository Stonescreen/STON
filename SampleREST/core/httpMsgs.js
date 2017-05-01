var settings = require("../settings.js");

exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal Error Occured", { "ContentType" : "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html> ");
    }
    else {
        resp.writeHead(500, "Internal Error Occured", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Error occured:" + err }));
        
    }
    resp.end();

};

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type" : "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    //else { }
    resp.end();
};

//405 method not supported
exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "ContentType" : "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    }
    else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported" }));    
    }
    resp.end();
};

//404 resource not found - wrong url
exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "ContentType" : "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found</body></html>");
    }
    else {
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found" }));
    }
    resp.end();
};

//413 Request entity too large
exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request entity too large", { "ContentType" : "text/html" });
        resp.write("<html><head><title>413</title></head><body>413: Request entity too large</body></html>");
    }
    else {
        resp.writeHead(413, "Request entity too large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Request entity too large" }));
    }
    resp.end();
};

//Send 200 Success message
exports.send200 = function (req, resp) {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.end();
};

exports.showHome = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "ContentType" : "text/html" });
        resp.write("<html><head><title>Home</title></head><body> Valid endpoints: <br> /patients - GET - To List All Patients <br> /patients/empno - GET - To Search For A Patient </body></html>");
    }
    else {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify([
            { url: "/patient", operation: "GET", description: "To List All Paitnes" },
            { url: "/patients/empno", operation: "GET", description: "To search a patient" }
        ]));
    }
    resp.end();
};