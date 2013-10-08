'use strict';

angular.module('angularIssuesApp')
  .controller('MainCtrl', function ($scope, $http) {
  	

    $scope.loadIssues = function() {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.password);
      $http.get('https://api.github.com/repos/abouck/test_1/issues').success(function(response){
      	$scope.issues = response      	
      })
    };

    $scope.addIssue = function(title,body) {
    	$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.password);
    	var data = {title: $scope.title,body: $scope.body}
    	$http.post('https://api.github.com/repos/abouck/test_1/issues', data ).success(function(response){
    		$scope.issues.unshift(data)

    	})
    }

    $scope.updateState = function(issue){
    	issue.state=(issue.state == "open" ? "closed" : "open")
       	$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.password);
    	$http.post(issue.url, issue).success(function(response){console.log(response)})
    }
  });
