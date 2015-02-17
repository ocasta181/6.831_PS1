// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

(function(){

	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	


	angular.module('myApp', [])
	.controller('myController',['$scope', function($scope){
		$scope.lang_to="English";
		$scope.lang_from="Spanish";
		var current_dict_json= dicts[lang_to][lang_from];
		$scope.current_dict = [];
		for(var i in current_dict_json)
			$scope.current_dict.push([i, current_dict_json[i]]);

		$scope.translations=[
			{"source":"calabaza", "translation":"pumpkin", "correct":1},
			{"source":"postmodernidad", "translation":"phone", "correct":"postmodernism"}
		];
		$scope.autocomplete_dict=[];
		$scope.random_input = Math.floor(Math.random()*($scope.current_dict.length));
		$scope.current_word=$scope.current_dict[$scope.random_input][1];
		$scope.current_answer=$scope.current_dict[$scope.random_input][0];
		for(var i in $scope.current_dict)
			$scope.autocomplete_dict.push($scope.current_dict[i][0]);


		$scope.do_submit = function(){
			$scope.current_word == $scope.user_answer ? 1 : $scope.current_answer;
			var is_correct = ($scope.current_answer == $scope.user_answer ? 1 : $scope.current_answer);
			console.log(is_correct);
			console.log(" ");
			$scope.translations.unshift({"source":$scope.current_word, 
										"translation":$scope.user_answer, 
										"correct":is_correct});

			$scope.random_input = Math.floor(Math.random()*$scope.current_dict.length);

			$scope.user_answer="";
			$scope.current_word=$scope.current_dict[$scope.random_input][1];
			$scope.current_answer=$scope.current_dict[$scope.random_input][0];
			$("#input").focus();
		};

		$scope.set_style = function(correct, row){
			var style;
			//console.log(correct);
			if(row == 'source'){
					if(correct!=1){
						style = 'red';
					} else {
						style = 'blue';
					};
				}else if( row == 'translation'){
					if(correct!=1){
						style = 'red strike';
					} else {
						style = 'blue';
					};
				} else if ( row == 'correct'){
					if(correct!=1){
						style = 'red';
					} else {
						style = 'ui-icon ui-icon-check';
					};
			};
			return style;
		};

		$("#input").autocomplete({
				source: function(request, response){
					var results = $.ui.autocomplete.filter($scope.autocomplete_dict, request.term);
					response(results.slice(0,5));
				},
				minLength: 2,
				autoFocus: true,
				delay: 500,
				messages: {
			        noResults: '',
			        results: function() {}
			    },
			    select: function(event, ui){
			    	if(ui.item){
			    		$(event.target).val(ui.item.value);
			    	}
			    	console.log(event.target.form)
			    	$(event.target.form).submit();
			    }
		});

	}]);

})();


