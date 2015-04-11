var app = angular.module('musterd8', [])
.controller('homeController', function($scope){
	$scope.title = 'Musterd8 online dating - Find the love of your life';
	$scope.description = 'Musterd8 is an online dating website to find partners. It includes instant feature and date locator';
	$scope.author = 'musterd8';
	$scope.authorUrl = 'http://musterd8.com';
})

.controller('appController', function($scope){
	$scope.title = 'Musterd8 - Online dating';
	$scope.description = 'Musterd8 is an online dating website to find partners. It includes instant feature and date locator';
	$scope.author = 'musterd8';
	$scope.authorUrl = 'http://musterd8.com';
});