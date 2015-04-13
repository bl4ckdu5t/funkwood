var app = angular.module('musterd8', [])

.controller('appController', ['$scope',function($scope){
	$scope.title = 'Musterd8 online dating - Find the love of your life';
	$scope.description = 'Musterd8 is an online dating website to find partners. It includes instant feature and date locator';
	$scope.author = 'musterd8';
	$scope.authorUrl = 'http://musterd8.com';
	$scope.genders = [
		{
			label: "Male",
			value: "male"
		},
		{
			label: "Female",
			value: "female"
		}
	];
	$scope.ageRanges = [
		{
			range: "18 - 29",
			value: 1
		},
		{
			range: "30 - 39",
			value: 2,
		},
		{
			range: "40 - 50",
			value: 3
		},
		{
			range: "51 - 70",
			value: 4
		}
	];
	$scope.religions = [
		{
			name: "Christian",
			value: "christian"
		},
		{
			name: "Muslim",
			value: "muslim"
		},
		{
			name: "Atheist",
			value: "atheist"
		},
		{
			name: "Other",
			value: "other"
		}
	];
}]);