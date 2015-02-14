// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
/**$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	

	// Your code here

    });



    			var is_correct = (current_word == $scope.user_answer ? 1 : current_answer);
			$scope.translation.push({"source":current_word, 
										"translation":current_answer, 
										"correct":is_correct});
			random_input = Math.floor(Math.random()*current_dict.length);
			$scope.user_answer="";
*/


(function(){

	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	


	angular.module('myApp', [])
	.controller('myController',['$scope', function($scope){
		$scope.lang_to="English";
		$scope.lang_from="Spanish";
		var current_dict_json= dicts[lang_to][lang_from];
		var current_dict = [];
		for(var i in current_dict_json)
			current_dict.push([i, current_dict_json[i]]);

		$scope.translations=[
			{"source":"calabaza", "translation":"pumpkin", "correct":1},
			{"source":"postmodernidad", "translation":"phone", "correct":"postmodernism"}
		];
 
		$scope.do_submit = function(){
			//console.log($scope.translations);
			console.log($scope.user_answer);

			$scope.current_word == $scope.user_answer ? 1 : current_answer;
			var is_correct = ($scope.current_word == $scope.user_answer ? 1 : current_answer);
			
			$scope.translations.push({"source":$scope.current_word, 
										"translation":$scope.user_answer, 
										"correct":is_correct});
			//console.log($scope.translations);
			random_input = Math.floor(Math.random()*current_dict.length);
			$scope.user_answer="";
		};

		var random_input = Math.floor(Math.random()*current_dict.length)
		$scope.current_word=current_dict[random_input][1];
		var current_answer=current_dict[random_input][0];

		

	}]);

})();

