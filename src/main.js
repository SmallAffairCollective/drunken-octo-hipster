requirejs.config({
    paths: {
        cs: '../lib/cs',
        'coffee-script': '../lib/coffee-script',
        graphael: '../lib/g.raphael-min',
        gpie: '../lib/g.pie-min'
    },
    shim: {
        'graphael': {
            exports: 'GRaphael'
        },
        'gpie': {
            deps: ['graphael'],
            exports: 'GPie'
        }
    }
});

// Start the main app logic.
requirejs(['cs!graphs'],
function   (Graphs) {
    window.onload = function () {
        function readBlob(opt_startByte, opt_stopByte) {

            var files = document.getElementById('files').files;
            if (!files.length) {
              alert('Please select a file!');
              return;
            }

            var file = files[0];
            var start = parseInt(opt_startByte) || 0;
            var stop = parseInt(opt_stopByte) || file.size - 1;

            var reader = new FileReader();

            // If we use onloadend, we need to check the readyState.
            reader.onloadend = function(evt) {
              if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                document.getElementById('byte_content').textContent = evt.target.result;
                document.getElementById('byte_range').textContent = 
                    ['Read bytes: ', start + 1, ' - ', stop + 1,
                     ' of ', file.size, ' byte file'].join('');
                var data = evt.target.result
                var lines = data.split("\n");
                var flag = 0;
                var labels = [];
                var values = [];
                var title = "";
                var obj = {};
                var objLabel = {};
                var objVal = {};
                for (var line in lines) {
                  if (lines.hasOwnProperty(line)) { 
                    //alert("prop: " + line + " value: " + lines[line])
                    if (line == 0) {
                      var header = lines[line].split(",");
                      title = header[0];
                      // use columns as labels
                      if (flag == 0) {
                        for (i=1; i<header.length; i++) {
                          labels.push(header[i]);
                        }
                      }
                    }
                    else {
                      if (flag == 1) {
                        var line_a = lines[line].split(",");
                        objLabel[line_a[0]] = [];
                        objLabel[line_a[0]].push(line_a[0]);
                      }
                      var line_a = lines[line].split(",");
                      obj[line_a[0]] = [];
                      for (i=1; i<line_a.length; i++) {
                        obj[line_a[0]].push(line_a[i]);
                      }
                    }
                  }
                }
                if (flag == 1) {
                  for (row in obj) {
                    if (obj[row].length != 0) {
                      var sum = 0;
                      for (value in obj[row]) {
                        if (isNaN(parseInt(obj[row][value]))) {
                          // skip, NaN
                        }
                        else {
                          sum += parseInt(obj[row][value]);
                        }
                      }
                      values.push(sum);
                    }
                  }
                  for (label in objLabel) {
                    if (label.length != 0) {
                      labels.push(label);
                    }
                  }
                }
                else {
                  for (label in labels) {
                    objVal[labels[label]] = [];
                  }
                  for (row in obj) {
                    for (label in labels) {
                      objVal[labels[label]].push(obj[row][label]);
                    }
                  }
                  for (row in objVal) {
                    if (objVal[row].length != 0) {
                      var sum = 0;
                      for (value in objVal[row]) {
                        if (isNaN(parseInt(objVal[row][value]))) {
                          // skip, NaN
                        }
                        else {
                          sum += parseInt(objVal[row][value]);
                        }
                      }
                      values.push(sum);
                    }
                  }
                  
                } 
                console.log(labels);
                console.log(values);
                console.log(title); 
              }
            };

            reader.readAsBinaryString(file);
          }
          
          document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
            if (evt.target.tagName.toLowerCase() == 'button') {
              var startByte = evt.target.getAttribute('data-startbyte');
              var endByte = evt.target.getAttribute('data-endbyte');
              readBlob(startByte, endByte);
            }
          }, false);
    };
});