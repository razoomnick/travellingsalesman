function Salesman(map) {
  this.getRandomSolution = function () {
    var arr = new Array(map.length);
    for (var i = 0; i < map.length; i++) {
      arr[i] = i;
    }
    shuffle(arr);
    return arr;
  };

  this.getValue = function (solution) {
    var value = 0;
    for (var i = 0; i < solution.length; i++) {
      var a = map[solution[i]];
      var b = map[solution[(i + 1) % map.length]];
      var distance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
      value += distance;
    }
    return value;
  };

  this.combine = function (solution1, solution2) {
    var len = solution1.length;
    var merged = new Array(len);
    var added = {};
    var x1 = 0;
    var x2 = len - 1;
    for (var i = 0; i < len; i++) {
      if (!added[solution1[(i) % len]]) {
        merged[x1] = solution1[(i) % len];
        added[solution1[(i) % len]] = 1;
        x1++;
      }
      if (!added[solution2[(len - i) % len]]) {
        merged[x2] = solution2[(len - i) % len];
        added[solution2[(len - i) % len]] = 1;
        x2--;
      }
    }
    return merged;
  };

  this.mutate = function (solution) {
    var pos1 = ~~(Math.random() * solution.length);
    var pos2 = ~~(Math.random() * solution.length);
    var min = Math.min(pos1, pos2);
    var max = Math.max(pos1, pos2);
    for (var i = 0; i < (max - min) / 2; i++) {
      var temp = solution[min + i];
      solution[min + i] = solution[max - i];
      solution[max - i] = temp;
    }
  };

  function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue = 0;
    var randomIndex = 0;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }
}