requirejs.config({
    paths: {
        cs: '../lib/cs',
        'coffee-script': '../lib/coffee-script',
        graphael: '../lib/g.raphael-min',
        gpie: '../lib/g.pie-min',
        gline: '../lib/g.line-min',
        gdot: '../lib/g.dot-min',
        gbar: '../lib/g.bar-min'
    },
    shim: {
        'graphael': {
            exports: 'GRaphael'
        },
        'gpie': {
            deps: ['graphael'],
            exports: 'GPie'
        },
        'gline': {
            deps: ['graphael'],
            exports: 'GLine'
        },
        'gdot': {
            deps: ['graphael'],
            exports: 'GDot'
        },
        'gbar': {
            deps: ['graphael'],
            exports: 'GBar'
        }
    }
});

// Start the main app logic.
requirejs(['cs!graphs', 'parsecsv'],
function   (Graphs, parseCSV) {
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
                var data = evt.target.result;
                var pieData = parseCSV(data);
                Graphs.linechart(pieData.values, pieData.labels, pieData.title); 
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
