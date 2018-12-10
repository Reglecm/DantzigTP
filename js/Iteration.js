function Contrainte(tableau, resultat){
	this.algo = tableau;
	this.resultat = resultat;
}

function Iteration(algo){
	//l index 0 est pour la constante
	this.algo = algo;
	//index du X
	this.vEntree = 0;
	//index du X
	this.vSortie = 0;
	this.contraintes = [];
	this.Ri = [];
	this.addContrainte = function(contrainte){ this.contraintes.push(contrainte); };
	this.calculateAllRi = function(){
		for(var contrainte in this.contraintes){
			console.log(this.contraintes[contrainte]);
			this.Ri.push(this.contraintes[contrainte].resultat / this.contraintes[contrainte].algo[this.vEntree]);
		};
	};

	this.findVEntree = function(){
		var theNum = 0;
		var theIndex = 0;
		this.algo.forEach(function(num, index){
			if(num > theNum){
				theNum = num;
				theIndex = index;
			}
		});
		this.vEntree = theIndex;
		console.log("Valeur d'entree: " + this.vEntree);
	};

	//idRi se trouve avec findEquationEchange
	this.findVSortie = function(idRi){
		var algo = this.contraintes[idRi].algo;
		for(var index in algo){
			if(algo[index] != 0 && this.algo[index] == 0){
				this.vSortie = index;
			}
		};
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
		for(var i in this.contraintes){
			var finalContrainte = new Contrainte([], 0);
			var multiplier = this.contraintes[i].algo[this.vEntree];
			this.contraintes[i].algo[this.vEntree] = 0;
			for(var index in this.contraintes[i].algo){
				var num = this.contraintes[i].algo[num];
				num += newAlgo[index] * multiplier;
				finalContrainte.algo.push(num);
			};
			newContraintes.push(finalContrainte);
		};
		return newContraintes;
		
	};

	this.checkFinal = function(){
		var test = true;
		this.algo.forEach(function(num, index){
			if(index > 0 && num >= 0){
				console.log("check is false");
				test =  false;
			}
		});
		return test;
	}

	this.logic = function(){
		if(this.checkFinal()){
			console.log("Check was true, end of the program:");
			return this.algo;
		}
		this.findVEntree();
		this.calculateAllRi();
		this.findVSortie(this.findEquationEchange());
		var algo = this.calculateNextAlgo();
		console.log(algo);
		var contraintes = this.calculateNewContraintes();
		var iter = new Iteration(algo);
		console.log(iter);
		contraintes.forEach(function(contr, index){
			iter.addContrainte(contr);
			console.log(contr);
		});
		return iter;
	}
}


