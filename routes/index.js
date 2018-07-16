const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  // const meminfo = getMeminfo();
  // res.render('index', { stdout: meminfo });

  getMeminfo((meminfoObject) => {
    res.render('index', { meminfo: meminfoObject });
  });
});

/**
 * Build an object with data from /proc/meminfo
 * 
 * @param {Function} callback called with (meminfoObject)
 */
function getMeminfo(callback) {
  fs.readFile('/proc/meminfo', (err, data) => {
    if (err) {
      throw err;
    }

    let meminfoObject = {};
    data.toString().split('\n').forEach((value, index) => {
      let key = value.split(':')[0];
      let val = Number(value.split(':')[1].trim().match(/^[0-9]+/)[0]);

      if (key.length > 0) {
        meminfoObject[key] = val;
      }
    });

    callback(meminfoObject);
  });
}

module.exports = router;
