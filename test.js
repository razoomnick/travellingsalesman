(function(){
  $("#btnGo").click(test);
  
  function test(){
    var citiesCount = parseInt($("#txtCities").val());
	var populationSize = parseInt($("#txtPopulation").val());
    var mutationsValue = parseFloat($("#txtMutations").val());
	var iterations = parseInt($("#txtIterations").val());
	testInternal(citiesCount, populationSize, mutationsValue, iterations);
  }
  
  function testInternal(citiesCount, populationSize, mutationsValue, iterations){
    var map = generateMap(citiesCount);
	var salesman = new Salesman(map);
	var genetic = new Genetic(populationSize, mutationsValue, salesman);
	for (var i = 0; i < iterations; i++){
	  genetic.step();
	}
	var bestGenetic = genetic.getBest();
	var greedy = getGreedySolution(map);
	var greedyScore = salesman.getValue(greedy);
	draw(map, bestGenetic.value, "canvasGenetic");
	draw(map, greedy, "canvasGreedy");
	$("#lblGeneticResult").html(bestGenetic.key)
	$("#lblGreedyResult").html(greedyScore);
  }
  
  function generateMap(citiesCount){
	var result = [];
	for (var i = 0; i < citiesCount; i++){
	  var x = Math.floor(Math.random() * 500);
	  var y = Math.floor(Math.random() * 500);
	  result.push({x: x, y: y});
	}
	return result;
  }
  
  function draw(map, solution, canvasId){
	var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = '#ff0000';
	for (var i = 0; i < map.length; i++){
	  ctx.beginPath();
	  ctx.arc(map[i].x, map[i].y, 2, 0, 2*Math.PI);
	  ctx.stroke();
	}
	ctx.strokeStyle = '#000000';
	ctx.moveTo(map[solution[0]].x, map[solution[0]].y);
	for (i = 1; i <= solution.length; i++){
	  var point = map[solution[i % map.length]];
	  ctx.lineTo(point.x, point.y);
	}
	ctx.stroke();
  }
  
  function getGreedySolution(map){
    var mapCopy = map.slice(0);
	var result = [0];
	mapCopy[0].used = 1;
	var current = 0;
	for (var i = 1; i < map.length; i++){
	  var minDistance = null;
	  var minPosition = null;
	  for (var j = 0; j < mapCopy.length; j++){
		if (!mapCopy[j].used){
		  var a = mapCopy[current];
		  var b = mapCopy[j];
		  var distance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
		  if (!minDistance || distance < minDistance){
		    minDistance = distance;
			minPosition = j;
		  }
		}
	  }
	  result.push(minPosition);
	  mapCopy[minPosition].used = 1;
	  current = minPosition;
	}
	return result;
  }
  
})();