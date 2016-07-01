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
  var valuelist = [{title: 'Accomplishment', description:' Gain a sense of achievement'}
  ,{title: 'Acknowledgement', description: 'Be acknowledged for your good works' }
  ,{title: 'Adventure', description: 'Experience adventure/excitement'}
  ,{title: 'Altruisim', description: 'Work for a good cause/ help society'}
  ,{title: 'Autonomy', description: 'Be able to determine the nature of work without significant direction from others'}
  ,{title: 'Beauty', description: 'Work in an aesthetically pleasing environment'}
  ,{title: 'Collaboration', description: 'Work as a team'}
  ,{title: 'Community', description: 'Be active in your community'}
  ,{title: 'Compettition', description: 'Opportunities to compete with others'}
  ,{title: 'Excitement', description: 'Work on the edge, in a high-risk environment'}
  ,{title: 'Flexibility', description: 'Set your own hours/have flexibility'}
  ,{title: 'Fun/Humor', description: 'Laugh often' }
  ,{title: 'Harmony/ Tranquility', description: 'Avoid job related pressures and stress' }
  ,{title: 'Help Others', description: 'Be involved in helping or being of service to people directly'}
  ,{title: 'Independence', description: 'Be your own boss'}
  ,{title: 'Influence', description: 'Be in position to influence others'}
  ,{title: 'Knowledge', description: 'Engage in pursuit of knowledge, truth and understanding'}
  ,{title: 'Leadership', description: 'Direct, manage, or supervise the work done by others'}
  ,{title: 'Location', description: 'Live somewhere conducive to my lifestyle'}
  ,{title: 'Physical Challenge', description: 'Have a job that requires physical strength, speed, dexterity, or agility'}
  ,{title: 'Politics', description: 'Have political influence' }
  ,{title: 'Power', description: 'Have control/power/authority'}
  ,{title: 'Prestige', description: 'Have prestige or social status'}
  ,{title: 'Professional Development', description: 'Have access to educational opportunities'}
  ,{title: 'Public Interaction', description: 'Have lots of public contact'}
  ,{title: 'Respect', description: 'Feel respected for your work'}
  ,{title: 'Risks', description: 'Take risks/have physical challenges'}
  ,{title: 'Security', description: 'Have a stable work environment and reasonable financial reward'}
  ,{title: 'Society', description: 'Make a positive impact on society'}
  ,{title: 'Speed', description: 'Work in a fast-paced environment'}
  ,{title: 'Spirituality', description: 'Have time for spirituality/personal growth'}
  ,{title: 'Stability', description: 'Have a work routine that are largely predictable and not likely to change'}
  ,{title: 'Travel', description: 'Explore new places / travel often'}
  ,{title: 'Variety', description: 'Have responsibilities that frequently change in setting/people/activities'}
  ,{title: 'Wealth', description: 'Obtain high monetary rewards'} ];
  var VIPlist = [];
  var KIPlist = [];
  var NIPlist = [];
  var Finallist= [];
  var Discard1= [];
  var Discard2= [];
  var Discard3= [];
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

  factory.loadDiscard1 = function(callback) {
        callback(Discard1);

  }
  factory.loadDiscard2 = function(callback) {
        callback(Discard2);

  }
  factory.loadDiscard3 = function(callback) {
        callback(Discard3);

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
  factory.updateDiscard1 = function (data) {
    Discard1 = data;

  }
  factory.updateDiscard2 = function (data) {
    Discard2 = data;

  }
  factory.updateDiscard3 = function (data) {
    Discard3 = data;

  }
  factory.addValue = function (data, callback) {
    valuelist.push(data);
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
    listFactory.updateNIP($scope.list4);
    listFactory.updateVIP($scope.list2 ,function () {
      $location.url('/filter')
    });

  }
  $scope.newValue = function () {
    console.log('hello');
    listFactory.addValue($scope.new_Value, function () {
      listFactory.loadValues(function (data) {
        $scope.list1 = data;
        $scope.new_Value ={};
      })
    })
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
  $scope.KIPlist = [];
  $scope.NIPlist = [];
  $scope.Dreamlist= [];

  $scope.Discard1 = [];
  $scope.Discard2 = [];
  $scope.Discard3 = [];
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

  $scope.final = function () {
    listFactory.updateDiscard1($scope.Discard1);
    listFactory.updateDiscard2($scope.Discard2);
    listFactory.updateDiscard3($scope.Discard3);
    listFactory.updateFinal($scope.Dreamlist,function () {
      $location.url('/show')
    });


  }

  $scope.hideMe2 = function() {
    return $scope.Dreamlist.length > 0;
  }

  $scope.hideMe3 = function() {
    return $scope.Discard1.length > 0;
  }

  $scope.hideMe4 = function() {
    return $scope.Discard2.length > 0;
  }

  $scope.hideMe5 = function() {
    return $scope.Discard3.length > 0;
  }

});
App.controller('ShowCtrl', function($scope, $timeout,listFactory) {
  $scope.VIPlist = [];
  $scope.Round3 = [];
  $scope.Round2 = [];
  $scope.Round1 = [];
  $scope.Finallist= [];
  $scope.user = {};


  listFactory.loadUser(function (data) {
    $scope.user = data;
  })

  listFactory.loadDiscard1(function (data) {
    console.log(data);
    $scope.Round1 = data;
  })
  listFactory.loadDiscard2(function (data) {
    console.log(data);
    $scope.Round2 = data;
  })
  listFactory.loadDiscard3(function (data) {
    console.log(data);
    $scope.Round3 = data;
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
// [{title: 'Accomplishment', description:' Gain a sense of achievement'}
// {title: 'Acknowledgement', description: 'Be acknowledged for your good works' }
// {title: 'Adventure', description: 'Experience adventure/excitement'}
// {title: 'Altruisim', description: 'Work for a good cause/ help society'}
// {title: 'Autonomy', description: 'Be able to determine the nature of work without significant direction from others'}
// {title: 'Beauty', description: 'Work in an aesthetically pleasing environment'}
// {title: 'Collaboration', description: 'Work as a team'}
// {title: 'Community', description: 'Be active in your community'}
// {title: 'Compettition', description: 'Opportunities to compete with others'}
// {title: 'Excitement', description: 'Work on the edge, in a high-risk environment'}
// {title: 'Flexibility', description: 'Set your own hours/have flexibility'}
// {title: 'Fun/Humor', description: 'Laugh often' }
// {title: 'Harmony/ Tranquility', description: 'Avoid job related pressures and stress' }
// {title: 'Help Others', description: 'Be involved in helping or being of service to people directly'}
// {title: 'Independence', description: 'Be your own boss'}
// {title: 'Influence', description: 'Be in position to influence others'}
// {title: 'Knowledge', description: 'Engage in pursuit of knowledge, truth and understanding'}
// {title: 'Leadership', description: 'Direct, manage, or supervise the work done by others'}
// {title: 'Location', description: 'Live somewhere conducive to my lifestyle'}
// {title: 'Physical Challenge', description: 'Have a job that requires physical strength, speed, dexterity, or agility'}
// {title: 'Politics', description: 'Have political influence' }
// {title: 'Power', description: 'Have control/power/authority'}
// {title: 'Prestige', description: 'Have prestige or social status'}
// {title: 'Professional Development', description: 'Have access to educational opportunities'}
// {title: 'Public Interaction', description: 'Have lots of public contact'}
// {title: 'Respect', description: 'Feel respected for your work'}
// {title: 'Risks', description: 'Take risks/have physical challenges'}
// {title: 'Security', description: 'Have a stable work environment and reasonable financial reward'}
// {title: 'Society', description: 'Make a positive impact on society'}
// {title: 'Speed', description: 'Work in a fast-paced environment'}
// {title: 'Spirituality', description: 'Have time for spirituality/personal growth'}
// {title: 'Stability', description: 'Have a work routine that are largely predictable and not likely to change'}
// {title: 'Travel', description: 'Explore new places / travel often'}
// {title: 'Variety', description: 'Have responsibilities that frequently change in setting/people/activities'}
// {title: 'Wealth', description: 'Obtain high monetary rewards'} ]
