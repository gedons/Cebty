const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(`${__dirname}/public`))


const port = process.env.PORT;

const api = require("./api/api.composer");

app.use('/api/', api);

app.get('/', (req, res)=>{
	return res.sendFile(`${__dirname}/index.html`);
});

app.get('/certificate', (req, res)=>{
	const { cid, cerid } = req.query;
	if(!cid && !cerid){
		return res.send('Error: Your url is not complete');
	}

	const db = require('./api/config/db.config');

	const certSql = `SELECT * FROM certificate WHERE id = ? AND deleted = 0`;

	db.query(certSql, [cerid], (err, certificate)=>{
		if(err){
			return res.send("<h1>Certificate does not exist<h1>".concat(err));
		}else {
			const studentSql = `SELECT * FROM record WHERE candidate_id = ? AND deleted = 0`;

			db.query(studentSql, [cid], (err, result)=>{
				if(result[0]){
					if(result[0].score < certificate[0].cutoff_mark){
						return res.send("<h1 style='text-align: center; color: red'> You are not eligible for a certificate </h1>");
					}else {
						return res.send(certificate[0].html);
					}
				}else {
					return res.send(certificate[0].html);
				}
				
			});
			
		}
	})
})

app.listen(port, ()=>{
    console.log(`App running at port ${port}`);
})