var eknock = eknock || angular.module('eknock');

eknock.controller('commonChecklistController', ['$rootScope', '$scope', '$state', 'HomeOwnerFactory', '$http', '$uibModalInstance', 'checklistModalFactory', 'commonDataHolder', '$timeout'
    , function ($rootScope, $scope, $state, HomeOwnerFactory, $http, $uibModalInstance, checklistModalFactory, commonDataHolder, $timeout) {

        var currentIndex;
        var nextIndex;
        var lastObjectInList;
        $scope.checklist = [];
        $scope.disabledList = [];
        $scope.checkeddList = [];
        $scope.propertyObject = commonDataHolder.data;
        
        const updatingDealStatus = 1;
        const cancellingDealStatus = 3;
        const closingDealStatus = 4;
         
        /* for closing modal */
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        /* for retrivening checklist based on role */
        $scope.getModalCheckList = function () {
            var objgetModalCheckList = {
                "userType": 1
            };
            checklistModalFactory.getModalCheckList(objgetModalCheckList).then(function (result) {
                $scope.checklist = result.data.resp;
                for (var i = 0; i < $scope.checklist.length; i++) {
                    $scope.checklist[0].checked = true;
                    $scope.checklist[i].checked = false;
                }
                lastObjectInList = $scope.checklist[$scope.checklist.length - 1];
                $timeout(function () {
                   $.material.init();
                }, 100);
                    getSequenceByIndexDealStatusId($scope.propertyObject.property.homeOwnerDealStatusId);
            });

        };

        /* for enable/disable checklist based on sequenceId */
        function getSequenceByIndexDealStatusId(seqId) {
            currentIndex = seqId;
            nextIndex = currentIndex + 1;
            if (currentIndex >= 2) {
                $scope.disabledList = [currentIndex, nextIndex];
            } else {
                $scope.disabledList = [nextIndex];
            }
            $scope.checkeddList = [currentIndex];
            commonDataHolder.data = {};
            for (var l = 0; l < currentIndex; l++) {
                $scope.checklist[l].checked = true;
                $scope.checkeddList.push(l);
            }
            $scope.checkListCurrentStatus = currentIndex;
        };

        /* function for retrieving current sequence from checklist based on current deal status id  */
        $scope.skipConcierge = 'Skip';
        $scope.skipAttorney = 'Skip';
        $scope.getSequence = function (item , value) {
            if(value == 0){
                if(item.name == 'Hire concierge (optional)'){
                    $scope.skipConcierge = 'Undo Skip';
                }else if(item.name == 'Hire an attorney (optional)'){
                    $scope.skipAttorney = 'Undo Skip';
                }
                          
                        var checkedObj = item;
                        var objgetSequence = {
                            "currentStatusId": item.dealStatusId,
                            "userType": 1
                        };
                        checklistModalFactory.getSequenceByDealStatusId(objgetSequence).then(function (result) {

                            currentIndex = result.data.resp[0].sequenceId;
                            //nextIndex = currentIndex + 1;

                            userEventFunction(checkedObj);

            });
         }else if(value == 1){
             $scope.skipConcierge = 'Undo Skip';
             
         }else {
              $scope.skipAttorney = 'Undo Skip';
         }
            
        };
        /* for handle checklist check/uncheck events  */
     function userEventFunction(item) {
            var statusId;
            if (!item.checked) {
                //Update
                if (item.sequenceId != 1) {
                    currentIndex = item.sequenceId;
                    nextIndex = currentIndex - 1;
                }
            } else if (item.checked) {
                //New
                if (item.sequenceId != 1) {
                    currentIndex = item.sequenceId;
                    nextIndex = currentIndex + 1;
                }
            }
          statusId =  updateStatus(currentIndex , nextIndex);
          $scope.updateSellerDealStatus(statusId);
      };
       var updateStatus = function  (currentIndex ,  nextIndex){
           var status;
            if (currentIndex > nextIndex) {
                $scope.checkListCurrentStatus = nextIndex;
            } else {
                $scope.checkListCurrentStatus = currentIndex;
            }
            if (nextIndex >= 2 ) {
                $scope.disabledList = [currentIndex, nextIndex];
            }else {
                // disabling 1st option by default
                 $scope.disabledList = [currentIndex];
            }
            $scope.checkeddList = [currentIndex];
            for (var j = 1; j < currentIndex; j++) {
                 $scope.checkeddList.push(j);
            }
            if (currentIndex === lastObjectInList.sequenceId) {
                // for disabling last option
                // returning 4 for close deal
                $scope.disabledList = [ nextIndex ];
                status = closingDealStatus;
            }else{
                // returning 2 for update deal
                status = updatingDealStatus;
            }

            return status;
        }
       
        /* below method for Update/Cancel/Close Deal 
        * dealStatus : 2/3/4  
        */
        $scope.updateSellerDealStatus = function(statusValue){
            var objupdateSellerDealStatus = {
                "dealStatus": statusValue,
                "currentDealStatusId": $scope.checkListCurrentStatus,
                "propertyDealId": $scope.propertyObject.property.dealId
            };
             checklistModalFactory.updateCheckList(objupdateSellerDealStatus).then(function (result) {
                        if(statusValue == 3){
                                 alert("Successfully cancelled the deal");
                                 $scope.cancel();
                                 
                        }
                        if(statusValue == 4){
                             alert("Successfully completed the deal");
                              $scope.cancel();
                        }

            });
        }
    }]);

