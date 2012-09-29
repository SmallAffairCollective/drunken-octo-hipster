define([],function(){
  return function(data) {
    var lines = data.split("\n");
    var flag = 1;
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
    return {labels: labels, values: values, title: title};
  };
});