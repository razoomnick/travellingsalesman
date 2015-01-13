function Genetic(populationSize, mutationValue, solver) {
  var population;
  var probability;
  init();

  function init() {
    population = new SortedFixedSizeArray(populationSize);
    probability = 2 / populationSize;
    for (var i = 0; i < populationSize; i++) {
      var randomSolution = solver.getRandomSolution();
      var key = solver.getValue(randomSolution);
      population.push({ key: key, value: randomSolution });
    }
  }

  this.step = function () {
    var parent1 = getItemFromPopulation();
    var parent2 = getItemFromPopulation();
    while (parent2 == parent1) {
      parent2 = getItemFromPopulation();
    }
    var child = solver.combine(parent1.value, parent2.value);
    if (Math.random() < mutationValue) {
      solver.mutate(child);
    }
    var key = solver.getValue(child);
    population.push({ key: key, value: child });
  };

  this.getBest = function () {
    return population.getBest();
  };

  function getItemFromPopulation() {
    var item = null;
    var i = 0;
    while (item == null) {
      var rnd = Math.random();
      if (rnd < probability) {
        item = population.elements[i % population.elements.length];
      }
      i++;
    }
    return item;
  }
}

function SortedFixedSizeArray(size) {
  var maxKey = null;
  this.elements = [];

  this.push = function (element) {
    if (this.elements.length < size) {
      this.elements.push(element);
      return;
    }
    if (maxKey != null && maxKey <= element.key) {
      return;
    }
    for (var i = 0; i < this.elements.length; i++) {
      if (Math.abs((this.elements[i].key - element.key)) < 0.0001) {
        return;
      }
    }
    this.elements.push(element);
    this.elements = this.elements.sort(function (a, b) {
      var x = a.key; var y = b.key;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    this.elements.splice(size, 1);
    maxKey = this.elements[size - 1].key;
  };

  this.getBest = function () {
    this.elements = this.elements.sort(function (a, b) {
      var x = a.key; var y = b.key;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    return this.elements[0];
  };
}