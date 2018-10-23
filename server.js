const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./js/db.js"); 
const user = require("./js/user.js");

let studentNames = [];

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(user);




app.get('/app/requests', function(req,res, next){
    res.json(studentNames).end();
});

app.post('/app/request', function (req,res,next){
    let studentName = req.body.studentName;
    let isUnique = ! isNameInList(studentNames, studentName);

    if(isUnique && studentName){
        studentNames.push(req.body.studentName);
        res.status(200).json(studentNames).end();
    } else{
        res.status(400).json(studentNames).end();
        res.se
    }
});

function isNameInList(list,name){
    let searchName = name.toLowerCase();
    let result = false;
    for(let student in list){
		if(list[student].toLowerCase() === searchName){
            result = true;
            break;
		}
    }
	return result;
}

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops thats bad');
});

app.listen(app.get('port'), function() {
    console.log('Drowning pool server', app.get('port'));
});