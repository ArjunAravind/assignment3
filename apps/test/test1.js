


describe('PopupCont', function() {
    var $controller;
  beforeEach(module('myApp'));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
  describe('addData', function() {
    it('check whether the new item is added to tha array', function() {
      var modalInstance;

          modalInstance = {                    
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };   
      var $scope = {};
      var controller = $controller('PopupCont', { $scope: $scope,$uibModalInstance:modalInstance });
      $scope.assoId="111";
      $scope.assoName="abc";
      $scope.addData();
      console.log($scope.datas);
      expect($scope.datas).toEqual(jasmine.objectContaining([Object({id: '111',name:"abc"})])); 
    });

  });
}); 