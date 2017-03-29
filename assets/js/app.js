$(document).foundation();

    var app = angular.module("MortgageApp", ['ngAnimate']); // module init
    app.controller("MainController", function($scope, $http) { // controller init\

        $scope.details = {};
        $scope.savedMortgages = [];
        $scope.mortgageDetails = false;

        $scope.calc = {
            homeValue: 300000.00,
            loanAmount: 240000.00,
            interestRate: 4,
            loanTerm: 30,
            note: "A Simple Note."
        };


        $scope.submitForm = function (item) {

            var d = new Date();
            var year = d.getFullYear();

            $scope.mortgageDetails = true;
            console.log(item);
            item.loanTerm = parseInt(item.loanTerm);
            item.interestRate = parseInt(item.interestRate);
            item.loanAmount = parseInt(item.loanAmount);
            item.homeValue = parseFloat(item.homeValue).toFixed(2);

            $scope.details.loanTermMonths = item.loanTerm * 12;
            $scope.details.payOffYear = year + item.loanTerm;

            $scope.details.downPayment = item.homeValue - item.loanAmount;

            // calculate mortgage M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]

            $scope.monthlyInterestRate = (item.interestRate / 100) / 12;
            //console.log($scope.monthlyInterestRate);
            $scope.principal = parseFloat(item.loanAmount).toFixed(2);
            //console.log($scope.principal);
            $scope.payments = $scope.details.loanTermMonths;
            //console.log($scope.payments);

            // calculate mortgage M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
            // M = P [ i(center) ] / [ (center) – 1]
            //$scope.tempCenter = parseFloat(Math.pow((1 + $scope.monthlyInterestRate), $scope.payments)).toFixed(3);
            $scope.tempCenter = Number(parseFloat(Math.pow((1 + $scope.monthlyInterestRate), $scope.payments)).toFixed(3)).toFixed(8);
            console.log($scope.tempCenter);
            $scope.getMortgage = parseFloat($scope.principal * (($scope.monthlyInterestRate * $scope.tempCenter) / ($scope.tempCenter - 1))).toFixed(2);
            //console.log($scope.getMortgage);

            // (P - N) / M = Monthly Interest Paid
            $scope.monthlyInterestPaid = parseFloat(($scope.principal - $scope.payments) / $scope.getMortgage).toFixed(2);

            // (M x N) - P = Total Interest Paid
            $scope.totalInterestPaid = parseFloat(($scope.getMortgage * $scope.payments) - $scope.principal).toFixed(2);

            $scope.totalEverything = parseFloat($scope.totalInterestPaid) + parseFloat(item.homeValue);

            $scope.mortgageObj = {
                amount: item.homeValue,
                loan: item.loanAmount,
                term: item.loanTerm,
                interestRate: parseFloat(item.interestRate).toFixed(2),
                interestMonth: $scope.monthlyInterestPaid,
                interestTotal: $scope.totalInterestPaid,
                downPayment: $scope.details.downPayment,
                note: item.note,
                completeCost: $scope.totalEverything
            };

            $scope.savedMortgages.push($scope.mortgageObj);

            $scope.calc = {};
            $scope.calcF.$setPristine();

            $('html,body').animate({scrollTop: $("#detail-box").offset().top},'slow');

        };

        $scope.removeItem = function (id, item) {
            console.log(id);
            $scope.savedMortgages.splice(id, 1);
            console.log($scope.savedMortgages);
        };

        $scope.eraseAllQuotes = function () {
            $scope.savedMortgages = [];
            console.log("All Quotes have Been Erased.");
        };

        $scope.viewItem = function (item) {
            $scope.popDetails = item.note;
            console.log($scope.popDetails);
        };

    });