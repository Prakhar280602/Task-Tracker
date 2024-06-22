var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readdir('./files', function (err, files) {
    if (err) {
      return next(err);
    }
    res.render('index', { files: files });
  });
});

/* POST create page. */
router.post('/create', function (req, res, next) {
  const filePath = path.join(__dirname, '../files', `${req.body.title.split(' ').join('')}.txt`);
  fs.writeFile(filePath, req.body.details, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
  // console.log(req.body);
});

/* GET file page */
router.get('/file/:filename', function (req, res, next) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
    // console.log(filedata);
    res.render("show", { filename: req.params.filename, filedata: filedata });
  })
});



/* GET edit page */
router.get('/edit/:filename', function (req, res, next) {
  res.render("edit", { filename: req.params.filename });
});


/* POST edit page */
router.post('/edit', function (req, res, next) {
  console.log(req.body); 
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function (err) {
    res.redirect('/');
  });
});


module.exports = router;
