function Iteration(vEntree, vSortie, algo){
	this.algo = algo;
	this.vEntree = vEntree;
	this.vSortie = vSortie;
	this.contraintes = [];
	this.Ri = [];
	this.addContrainte = function(contrainte){ this.contraintes.push(contrainte); };
	this.calculateAllRi = function(){
		this.contraintes.forEach(function(contrainte){
			this.Ri.push(contrainte.resultat / contrainte.algo[this.vEntree]);
		});
	};
	this.findEquationEchange = function(){
		var min = 0;
		this.Ri.forEach(function(ri){
			if(ri < min){
				min = ri;
			}
		});
		return this.Ri.indexOf(min);
	};
	this.calculateNextAlgo = function(){
		var i = this.findEquationEchange();
		var tempAlgo = this.contraintes[i].algo;
		var divider = tempAlgo[this.vEntree]
		tempAlgo[this.vEntree] = 0;
		var newAlgo = [];
		this.contraintes[i].algo.forEach(function(num, index){
			var newnum = num * -1 / divider;
			newAlgo.push(newnum);
		});
		var multiplier = this.algo[this.vEntree];
		this.algo[this.vEntree] = 0;
		var finalAlgo = [];
		this.algo.forEach(function(num, index){
			num += newAlgo[index] * multiplier;
			finalAlgo.push(num);
		});
		return finalAlgo;
	}

	this.calculateNewContraintes = function(){
		var i = this.findEquationEchange();
		var tempAlgo = this.contraintes[i].algo;
		var divider = tempAlgo[this.vEntree]
		tempAlgo[this.vEntree] = 0;
		var newAlgo = [];
		this.contraintes[i].algo.forEach(function(num, index){
			var newnum = num * -1 / divider;
			newAlgo.push(newnum);
		});
		var newContraintes = [];

		this.contraintes.forEach(function(contrainte){
			var newContraine = new Contrainte();
			var multiplier = contrainte.algo[this.vEntree];
			contrainte.algo.forEach(function(num, index){
				num += newAlgo[index] * multiplier;
				finalContrainte.algo.push(num);
			});
		});
		
	};
}