// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

(function(){

	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	


	angular.module('myApp', ['ngRoute'])

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
			console.log("WE GOT THIS FAR!")
			$scope.current_word == $scope.user_answer ? 1 : $scope.current_answer;
			var is_correct = ($scope.current_answer == $scope.user_answer ? 1 : $scope.current_answer);
			console.log($scope.current_answer);
			console.log($scope.translations)
			$scope.translations.unshift({"source":$scope.current_word, 
										"translation":$scope.user_answer, 
										"correct":is_correct});
			console.log($scope.translations)
			$scope.random_input = Math.floor(Math.random()*$scope.current_dict.length);

			$scope.user_answer="";
			$scope.current_word=$scope.current_dict[$scope.random_input][1];
			$scope.current_answer=$scope.current_dict[$scope.random_input][0];
			$("#input").focus();
		};

		$scope.set_style = function(correct, row){
			var style;
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
		$("#text_form").submit(function(){
			$scope.do_submit();
			return false;
		});

	}])

	.directive('autocomplete', ['$timeout', function($timeout){
		var directive = {
			restrict: "EA",
			link: link

		};

		return directive;
		function link(scope, elem, attrs){
			scope.submit = function(val){
					console.log("LOOK AT ME: ",val);
					text_form.submit = scope.do_submit();
				};
			var myElement = $("#autocomplete");
			myElement.autocomplete({
			//angular.element().find("#autocomplete").autocomplete({	
				source: scope.autocomplete_dict,

				
				select: function(event, ui){
					var self = this;
					$timeout(function(){
						myElement.trigger('input');
						scope.user_answer = ui.item.value;
			    		scope.submit(ui.item.value);

					}, 0);
				}
			});
		};
	}])


/*

		$("#input").autocomplete({
				source: function(request, response){
					var results = $.ui.autocomplete.filter($scope.autocomplete_dict, request.term);
					response(results.slice(0,5));
				},
				minLength: 2,
				autoFocus: true,
				messages: {
			        noResults: '',
			        results: function() {}
			    },

			    select: function(event, ui){
			    		console.log("ui.item = ");
			    		console.log(ui.item);
			    		console.log("event.target = ");
			    		console.log(event.target);
			    		console.log("event.target.form = ");
			    		console.log(event.target.form);
			    		console.log("ui.item.value = ");
			    		console.log(ui.item.value);
			    		console.log("$(event.target).val(ui.item.value)= ");
			    		console.log($(event.target).val(ui.item.value));
			    		console.log("user_answer = ");
			    		console.log($scope.user_answer);
			    		//$(event.target).val(ui.item.value);
			    		$scope.user_answer = ui.item.value;
			    		$(event.target ).submit();

			    }
		});
*/



})();


