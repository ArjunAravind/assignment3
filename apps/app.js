	var app = angular.module('myApp', ['ui.bootstrap','pascalprecht.translate']);


	app.config(function ($translateProvider, $translatePartialLoaderProvider) {
  	$translateProvider.useLoader('$translatePartialLoader', {
  	urlTemplate: '/i18n/{part}/{lang}.json'
  })
	});

	app.factory('myFact', function() {

  	var tid;
  	var tname;
  	var task=[];

  	return {
  	 
 

    setdata: function(assoId,assoName){
    	task.push({
    		id: assoId,
        	name: assoName
    	})
    },
    getdata: function(){
    	return task;
    }
  	}
  

  })



		app.controller('myCtrl', ['$scope','$uibModal', 'myFact', '$rootScope','$translate', '$translatePartialLoader', function($scope, $uibModal, myFact, $rootScope,$translate, $translatePartialLoader) {
    	$translatePartialLoader.addPart('home');
                   $translate.refresh(); 
                   $translate.use('en');

                   $scope.lang=function(lang){
                  
                   $translate.use(lang);
                   $rootScope.langu=lang;
                   } 

    			   $scope.checked = [];
    			   $scope.datas=myFact.getdata();
				$scope.dispCon = function () {
		   
               var modalInstance = $uibModal.open({
				  controller: 'PopupCont',
                   templateUrl: 'pop.html'
               });
  
			
  	  }
		
	  $scope.toggleChecked = function (data, index) {
      $scope.checked.push(data);
      $scope.datas.splice(index, 1);
	  };  
	  }]);


      app.controller('PopupCont', ['$scope','$uibModalInstance','$rootScope', 'myFact' , '$translate', '$translatePartialLoader', function ($scope, $uibModalInstance,$rootScope, myFact,$translate, $translatePartialLoader) {
    	$translatePartialLoader.addPart('pop');
    	$translate.refresh(); 
    	 $translate.use($rootScope.langu);
      	 $scope.datas = [];

			
            $scope.removeData = function () {
                $uibModalInstance.dismiss('cancel');

            };
           
      
			$scope.addData = function () {

	
			var count=0;
			if($scope.assoId!=undefined&&$scope.assoName!=undefined){
	
			for (var i = 0; i < $scope.datas.length; i++) {
				if($scope.datas[i].id!=$scope.assoId){
				
				count++;
				}
			}
	
			if(count==$scope.datas.length){
    		myFact.setdata($scope.assoId,$scope.assoName);
    		// console.log($scope.datas);
    		$scope.removeData();
    		$scope.datas=myFact.getdata();
    		}
	
    		else{
			alert("already exist");
			}
	
			}
			else
			{
				alert("Improper Input");
			}
	

    	

			};

        }]);

