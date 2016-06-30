// $(function() {
//   $("#catalog").accordion();
// });
var App = angular.module('drag-and-drop', ['ngDragDrop','ngRoute']);


App.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/intro.html'
        })
        .when('/pick',{
            templateUrl: 'partials/pick.html'
        })
        .when('/filter',{
          templateUrl:'partials/filter.html'
        })
        .when('/show',{
          templateUrl:'partials/show.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });


App.factory('listFactory' ,function ($http) {
  var valuelist = [{'title': 'LIFE'},{'title': 'COMPASSION'},{'title': 'HUMOR'},{'title': 'COOPERATION'},
                  {'title': 'FREEDOM'},{'title': 'DEDICATION'},{'title': 'TRUSTWORTHINESS'},{'title': 'ADVANCEMENT'},
                  {'title': 'CREATIVITY'},{'title': 'ACCOUNTABILITY'},{'title': 'WORK'},{'title': 'RELIGION'},
                  {'title': 'LOYALTY'},{'title': 'WEALTH'},{'title': 'SECURITY'},{'title': 'RECOGNITION'},
                  {'title': 'BEAUTY'},{'title': 'PROFESSIONALISM'},{'title': 'MORALITY'},{'title': 'PATIENCE'},
                  {'title': 'SPIRITUALITY'},{'title': 'SUCCESS'},{'title': 'RESPONSIBILITY'},{'title': 'POWER'},
                  {'title': 'RESPECT'},{'title': 'HONESTY'},{'title': 'EMPATHY'},{'title': 'INTEGRITY'},
                  {'title': 'JUSTICE'},{'title': 'HEALTH'},{'title': 'LOVE'},{'title': 'FAITH'},
                  {'title': 'HELPFULNESS'},{'title': 'KNOWLEDGE'},{'title': 'WISDOM'},{'title': 'INDEPENDENCE'},
                ];
  var VIPlist = [];
  var KIPlist = [];
  var NIPlist = [];
  var Finallist= [];
  var user = {};
  var factory = {};
  factory.loadValues = function(callback) {
        callback(valuelist);

  }
  factory.loadVIP = function(callback) {
        callback(VIPlist);

  }
  factory.loadKIP = function(callback) {
        callback(KIPlist);

  }
  factory.loadNIP = function(callback) {
        callback(NIPlist);

  }
  factory.loadFinal = function(callback) {
        callback(Finallist);

  }
  factory.setUser =function (data, callback) {
    user = data;
    callback();
  }
  factory.loadUser = function(callback) {
        callback(user);
      }

  factory.updateVIP = function (data,callback) {
    VIPlist = data;
    callback();
  }
  factory.updateKIP = function (data) {
    KIPlist = data
  }
  factory.updateNIP = function (data) {
    NIPlist = data
  }
  factory.updateFinal = function (data, callback) {
    Finallist = data;
    callback();
  }


  return factory;
});
App.controller('introCtrl', function($scope, $timeout,listFactory,$location) {
  $scope.start = function () {
    listFactory.setUser($scope.user, function () {
      $location.url('/pick')
    });
  }


});


App.controller('PickCtrl', function($scope, $timeout,listFactory,$location) {
  $scope.list1 = [];
  $scope.list2 = [];
  $scope.list3 = [];
  $scope.list4 = [];
  $scope.user = {};

  listFactory.loadValues(function (data) {
    $scope.list1 = data;
  })

  listFactory.loadUser(function (data) {
    $scope.user = data;
  })
  $scope.setList = function () {
    console.log($scope.list2);
    listFactory.updateKIP($scope.list3);
    listFactory.updateNIP($scope.list3);
    listFactory.updateVIP($scope.list2 ,function () {
      $location.url('/filter')
    });


  }

  $scope.hideMe2 = function() {
    return $scope.list2.length > 0;
  }

  $scope.hideMe3 = function() {
    return $scope.list3.length > 0;
  }

  $scope.hideMe4 = function() {
    return $scope.list4.length > 0;
  }
});




App.controller('FilterCtrl', function($scope, $timeout,listFactory,$location) {
  $scope.VIPlist = [];
  $scope.Discard1 = [];
  $scope.Discard2 = [];
  $scope.Discard3 = [];

  listFactory.loadVIP(function (data) {
    console.log(data);
    $scope.VIPlist = data;
  })

  $scope.final = function () {
    listFactory.updateFinal($scope.VIPlist,function () {
      $location.url('/show')
    });


  }

  $scope.hideMe2 = function() {
    return $scope.Discard1.length > 0;
  }

  $scope.hideMe3 = function() {
    return $scope.list3.length > 0;
  }

  $scope.hideMe4 = function() {
    return $scope.list4.length > 0;
  }


});
App.controller('ShowCtrl', function($scope, $timeout,listFactory) {
  $scope.VIPlist = [];
  $scope.KIPlist = [];
  $scope.NIPlist = [];
  $scope.Finallist= [];
  $scope.user = {};


  listFactory.loadUser(function (data) {
    $scope.user = data;
  })

  listFactory.loadVIP(function (data) {
    console.log(data);
    $scope.VIPlist = data;
  })
  listFactory.loadKIP(function (data) {
    console.log(data);
    $scope.KIPlist = data;
  })
  listFactory.loadNIP(function (data) {
    console.log(data);
    $scope.NIPlist = data;
  })
  listFactory.loadFinal(function (data) {
    console.log(data);
    $scope.Finallist = data;
  })



  $scope.hideMe2 = function() {
    return $scope.Discard1.length > 0;
  }

  $scope.hideMe3 = function() {
    return $scope.list3.length > 0;
  }

  $scope.hideMe4 = function() {
    return $scope.list4.length > 0;
  }
});

$( document ).ready(function() {
  $('#filter1').click(function () {
    $('.1stprompt').hide();
    $('.2ndprompt').show('slow');
  });
});
