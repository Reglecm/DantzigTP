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
		this.contraintes.forEach(function(contrainte){
			this.Ri.push(contrainte.resultat / contrainte.algo[this.vEntree]);
		});
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
		console.log("vEntree :",vEntree);
	};

	//idRi se trouve avec findEquationEchange
	this.findVSortie = function(idRi){
		var algo = this.contraintes[idRi].algo;
		algo.forEach(function(num, index){
			if(num != 0 && this.algo[index] == 0){
				this.vSortie = index;
				console.log("vSortie :",VSortie);
			}
		})
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
			var finalContrainte = new Contrainte();
			var multiplier = contrainte.algo[this.vEntree];
			contraintes.algo[this.vEntree] = 0;
			contrainte.algo.forEach(function(num, index){
				num += newAlgo[index] * multiplier;
				finalContraite.algo.push(num);
			});
			newContraintes.push(finalContraite);
		});
		return newContraintes;
		
	};

	this.checkFinal = function(){
		this.algo.forEach(function(num, index){
			if(index > 0 && num >= 0){
				return False;
			}
		});
		return True;
	}

	this.logic = function(){
		if(this.checkFinal){
			return this.algo;
		}
		this.findVEntree();
		this.calculateAllRi();
		this.findVSortie(this.findEquationEchange());
		var algo = this.calculateNextAlgo();
		var contraintes = this.calculateNewContraintes();
		var iter = new Iteration(algo);
		contraintes.forEach(function(contr, index){
			iter.addContrainte(contr);
		});
		return iter;
	}
}


