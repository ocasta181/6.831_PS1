// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.


/*
Translation Game app.

Author: 
	Andrin Knight Foster

Collaborators: 
	Doug G, a consultant at InterSystems. 
	He helped debug an incompatability between Angular and jQuery in the autocomplete directive

Additional Libraries: 
	Angular.js
*/
(function(){

	/*
		This is the main Angular application.
		All functioning Angular code must exist inside of the html tag including ng-App="translateApp"
	*/
	angular.module('myApp', [])


	/*
		This controller contains the majority of the functionality.
	*/
	.controller('myController',['$scope', function($scope){
		$scope.lang_to="English";				//The language the user tries to translate to
		$scope.lang_from="Spanish";				//the language the user tries to translate from
		

		// The dictionary is more easily accessed as an Array, so we create two versions:
		var json_dict= dicts[$scope.lang_to][$scope.lang_from];		// a JSON version
		$scope.current_dict = [];											// and an Array version

		//This pulls the dictionary entries from the JSON into an Array.
		for(var i in json_dict)
			$scope.current_dict.push([i, json_dict[i]]);

		//This is where previous answers are stored. It is pre populated with examples.
		$scope.previous_translations=[
			{"previous_word":"calabaza", "previous_answer":"pumpkin", "previous_correct":1},
			{"previous_word":"postmodernidad", "previous_answer":"phone", "previous_correct":"postmodernism"}
		];

		var random_input = Math.floor(Math.random()*($scope.current_dict.length));	//a randomly chosen index of the current_dictionary
		$scope.current_word=$scope.current_dict[random_input][1];					// this is the word to be translated
		var correct_answer=$scope.current_dict[random_input][0];					// this is the correct translation

		autocomplete_list=[];		// This list is used to populate autocomplete suggestions. 
									// declared in global scope for use with autocomplete directive
		// This populates the autocomplete list with the lang_to portion of the dictionary
		for(var i in $scope.current_dict)
			autocomplete_list.push($scope.current_dict[i][0]);

		/*
			This function is called when an answer is submit.
			It takes no inputs and returns to outputs.
		*/
		$scope.do_submit = function(){

			// if the user is correct set the is correct flag to 1 otherwise set it to the correct answer
			var is_correct = (correct_answer == $scope.user_answer ? 1 : correct_answer);

			// adds to beginning of the array of stored answers.
			$scope.previous_translations.unshift({"previous_word":$scope.current_word, 
										"previous_answer":$scope.user_answer, 
										"previous_correct":is_correct});

			// produces a new random index of the current dictionary
			random_input = Math.floor(Math.random()*$scope.current_dict.length);
			// sets a new word to be translated and a new correct translation
			$scope.current_word=$scope.current_dict[random_input][1];	
			correct_answer=$scope.current_dict[random_input][0]; 

			$scope.user_answer="";		// resets the user response box
	
			$("response_box").focus();		// returns focus to the response box input
		};

		//

		/*
		 	this adds style tags to the past answers depending on correctness
		 	Params: 
		 		correct 	- 	the value of a 'previous_correct'
		 		row 		-	either 'previous_word', 'previous_answer', or 'previous_correct'

		 	Return: 
		 		style		-	a string of tags to be passed to the ng-class module and later used to define the css
		*/
		$scope.set_style = function(correct, row){
			var style;

			if(row == 'previous_word'){
				if(correct!=1){
					style = 'red';
				} else {
					style = 'blue';
				};

			}else if( row == 'previous_answer'){
				if(correct!=1){
					style = 'red strike';
				} else {
					style = 'blue';
				};

			} else if ( row == 'previous_correct'){
				if(correct!=1){
					style = 'red';
				} else {
					style = 'ui-icon ui-icon-check';		// this relpaces the "1" with a jQuery ui provided checkmark 
				};
			};
			return style;
		};

	}])

	/*
		This directive creates a new html tag type called autocomplete.
		it allows the 

	*/
	.directive('autocomplete', ['$timeout', function($timeout){

		// this includes the high level features of the directive
		var directive = {
			restrict: "EA",
			link: link		// this points to the more detailed functionality

		};

		return directive;


		/*
			this includes the more detailed functionality
		*/
		function link(scope, elem, attrs){

			// this overrides the default submit function of jQuery autocomplete
			scope.submit = function(val){
					text_form.submit = scope.do_submit();
				};
			var myElement = $("#response_box");

			// this defines the jQuery autocomplete functionality
			myElement.autocomplete({	
				source: autocomplete_list,
				minLength: 2,		// this causes autocomplete responses to only appear after two letters have been typed
				autoFocus: true,	// this sets the focus to the first matching item in the autocomplete list
				
				// this causes the function to submit after a selection is made from the list by click or 'enter'
				select: function(event, ui){
					var self = this;
					$timeout(function(){
						myElement.trigger('input');
						scope.user_answer = ui.item.value;		// this sets the answer to the autocomplete term chosen
			    		scope.submit();

					}, 0);
				}
			});
		};
	}])

})();


