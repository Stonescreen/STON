var http = require("http");
var emp = require("../controllers/patient");
var settings = require("../settings");
var httpMsgs = require("./httpMsgs");


http.createServer(function (req, resp) {
	switch (req.method) {
		case "GET":
            if (req.url === "/") {
                //resp.end();
                httpMsgs.showHome(req, resp);

            }
            else if (req.url === "/patients") {
                emp.getList(req, resp);
            }
            else {
                var empnoPatt = "[0-9]+";
                var patt = new RegExp("/patients/" + empnoPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(empnoPatt);
                    var empno = patt.exec(req.url);
                    emp.get(req,resp, empno);
                }
                else { 
                    httpMsgs.show404(req,resp);
                }
            }
			break;
        case "POST":
            if (req.url === "/patients") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.Length > 1e7) //more than 10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });

                req.on("end", function () { 
                    emp.add(req, resp, reqBody);
                });
            }
            else { 
                httpMsgs.show404(req,resp);
            }
			break;
        case "PUT":
            if (req.url === "/patients") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.Length > 1e7) //more than 10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                
                req.on("end", function () {
                    emp.update(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            if (req.url === "/patients") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.Length > 1e7) //more than 10mb
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                
                req.on("end", function () {
                    emp.delete(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
			break;
        default:
            //HTTP Method is not supported    
            httpMsgs.show405(req, resp);
			break;
	}
}).listen(settings.webPort, function () { 
	console.log("Started listeneing at : " + settings.webPort);
});
