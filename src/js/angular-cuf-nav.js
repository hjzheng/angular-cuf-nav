/**
* cuf Module
*
* Description
*/
angular.module('cuf.nav', ['cuf-nav-template']).directive('cufNav', function($window){
  // Runs during compile
  return {
    scope: {
      triggeredEvent: '@'
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'template/cufNav.html',
    replace: true,
    transclude: true,
    controllerAs: 'cufNavCtrl',
    controller: function($scope, $element, $attrs, $transclude){
        if(!$scope.triggeredEvent) {
            $scope.triggeredEvent = "click";
        }

        var items = [];

        this.triggeredEvent = $scope.triggeredEvent;
        
        this.addItems = function(item) {
           items.push(item);
        };

        this.closeOtherItems = function(item){
            angular.forEach(items, function(it) {
                if(it.label !== item.label){
                  it.show = false;
                  angular.forEach(item.childItems, function(child){
                    angular.forEach(child, function(childItem){
                        childItem.show = false;
                    });
                  });
                }
            });
        };

        var closeAllItems = function(event){
            $scope.$apply(function(){
              angular.forEach(items, function(item) {
                item.show = false;
                angular.forEach(item.childItems, function(child){
                    angular.forEach(child, function(childItem){
                        childItem.show = false;
                    });
                });
              });
            });
        }

        var closeAllItemsWhenClick = function(event){
            if($scope.triggeredEvent === 'click'){
               if(jQuery.contains( $element[0], event.target)){
                    if(jQuery(event.target.parentNode).attr('has-children')){
                      return;
                    } else {
                      closeAllItems(event);
                    }    
                }
                closeAllItems(event);
            }
        }

        var closeAllItemsWhenMouseover = function(event){
            if($scope.triggeredEvent === 'mouseover'){
                if(jQuery.contains( $element[0], event.target )){
                  return;
                }
                closeAllItems(event);
            }
        }

        jQuery($window).on("click", closeAllItemsWhenClick);

        jQuery($window).on("mouseover", closeAllItemsWhenMouseover);
    }
  };
}).directive('cufNavItem', function(){
  // Runs during compile
  return {
    require: '^cufNav',
    scope: {
      label: '@',
      href: '@',
      triggeredEvent: '@',
      isChildren: '@hasChildren',
      itemClick: '&' // pass function with parameter
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'template/cufNavItem.html',
    replace: true,
    transclude: true,
    controllerAs: 'cufNavItem',
    controller: function($scope, $element, $attrs, $transclude){

        $scope.hasChildren = ($scope.isChildren === 'true');

        if(!$scope.triggeredEvent){
          this.triggeredEvent = $scope.$parent.$parent.triggeredEvent;
        }else{
          this.triggeredEvent = $scope.triggeredEvent;
        }

        var childItems = $scope.childItems = {};
        
        this.addChildItems = function(label, item) {
          childItems[label] = childItems[label] || []
          childItems[label].push(item);
        };

        this.closeOtherChildItems = function(label, item){
            angular.forEach(childItems[label], function(it) {
                if(it.label !== item.label){
                  it.show = false;
                }
            });
        };

        $scope.navClick = function($event){
          $scope.itemClick();
          $event.stopPropagation();
        };
    },
    link: function($scope, iElm, iAttrs, cufNavCtrl) {
        cufNavCtrl.addItems($scope);

        $scope.triggeredEvent = cufNavCtrl.triggeredEvent;

        $scope.clickToggle = function(){
            if(cufNavCtrl.triggeredEvent === 'click') {
              cufNavCtrl.closeOtherItems($scope);
              $scope.show = ($scope.show == true ? false: true); 
            }
        }

        $scope.mouseOver = function(){
            if(cufNavCtrl.triggeredEvent === 'mouseover') {
              cufNavCtrl.closeOtherItems($scope);
              $scope.show = ($scope.show == true ? false: true); 
            }
        }
    }
  };
}).directive('cufNavChildItem', function(){
  return {
    require: '^cufNavItem',
    scope: {
      label: '@',
      href: '@',
      isChildren: '@hasChildren',
      itemClick: '&'
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'template/cufNavChildItem.html',
    replace: true,
    transclude: true,
    controllerAs: 'cufNavItem',
    controller: function($scope, $element, $attrs, $transclude){
      $scope.hasChildren = ($scope.isChildren === 'true');
      
      $scope.navClick = function($event){
          $scope.itemClick();
          $event.stopPropagation();
      };
    },
    link: function($scope, iElm, iAttrs, cufNavItem) {

      var pLabel = jQuery(iElm[0].parentNode.parentNode).attr("label");
      
      if(pLabel) {
          $scope.parentLabel = pLabel;
          cufNavItem.addChildItems(pLabel, $scope);
      }


      $scope.clickToggle = function(){
          if(cufNavItem.triggeredEvent === 'click') {
            cufNavItem.closeOtherChildItems($scope.parentLabel, $scope);
            $scope.show = ($scope.show == true ? false: true); 
          }
      }

      $scope.mouseOver = function(){
          if(cufNavItem.triggeredEvent === 'mouseover') {
            cufNavItem.closeOtherChildItems($scope.parentLabel, $scope);
            $scope.show = ($scope.show == true ? false: true); 
          }
      }
    }
  };
});