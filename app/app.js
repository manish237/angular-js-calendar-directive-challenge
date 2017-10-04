var calendarApp = angular.module('calendarApp', []);

calendarApp.constant('NUM_YEARS','20')

calendarApp.service('calService',['NUM_YEARS',function (NUM_YEARS) {
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    return{
        getMonths: function () {
            return months;
        },
        getMonth:function (num) {
            return months[num] || 'January'
        },
        getCurrMonthYear: function () {
            var currDate = new Date();
            return {
                currMonth: currDate.getMonth() || 0,
                currMonthName: months[currDate.getMonth()] || 'January',
                currYear: currDate.getFullYear()
            }
        },
        getYearList:function (startYear) {
            var list=[]

            for(var i=1;i<=NUM_YEARS;i++)
            {
                list.push(startYear++);
            }
            return list;
        }
    }

}])

calendarApp.controller('calController',['$scope','calService',function ($scope,calService) {
    // console.log('in controller')
    // var currDate = new Date()
/*    console.log(calService.getCurrMonthYear())
    console.log(calService.getMonths())
    console.log(calService.getYearList(calService.getCurrMonthYear().currYear))*/
    $scope.dateObj = {
        currMonth:parseInt(calService.getCurrMonthYear().currMonth),
        currYear:parseInt(calService.getCurrMonthYear().currYear)
    }
    // console.log($scope.dateObj)
    $scope.months = calService.getMonths();
    $scope.years = calService.getYearList($scope.dateObj.currYear);

    $scope.$watchCollection('dateObj',function (newVal) {
        /*console.log("currMonth--" + newVal.currYear
            + "|" + newVal.currMonth
            + "|" + (new Date(newVal.currYear,newVal.currMonth,1)).toISOString())*/
        $scope.dateObj = {
            currMonth:parseInt(newVal.currMonth),
            currYear:parseInt(newVal.currYear)
        }
        $scope.currDate = new Date(newVal.currYear,newVal.currMonth,1)
    });

    $scope.getType = function (b) {
        return (typeof b);
    }
}])
calendarApp.directive("calendarDisp",function () {
    return{
        restrict:'E',
        templateUrl:'cal-cell.html',
        replace:true,
        scope: {
            currentDate: "=",
            currentSelection : "="
        },
        link: function(scope, elements, attrs) {

            // console.log('Linking...');
            var list = {};
            scope.$watch('currentDate',function () {
                 // console.log("currMonth--" + newVal);
                var data = CalendarRange.getMonthlyRange(scope.currentDate);
                scope.dateList = data;

                var itemList = [];
                var item7 = [];

                for(var i=1;i<=data.days.length;i++)
                {
                    item7.push(data.days[i-1])
                    if(i%7===0){
                        itemList.push(item7)
                        item7=[]
                    }
                }
                // console.log(itemList)
                scope.dataList = itemList


            });

            scope.getBType = function (b) {
                return (typeof b);
            }




            // console.log(scope);
            // console.log(elements);
            // console.log(attrs);
            //scope.dateList = CalendarRange.getMonthlyRange(scope.currentDate);
        }
    }
})