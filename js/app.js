var app = angular.module('Test',['ngStorage']);
app.controller("BodyController", function($scope,$localStorage){
    /*Scope iniciales*/
    $scope.newObject = {};
    $scope.historysave = true;
    $scope.c1 = $localStorage.c1 || 500;
    $scope.c2 = $localStorage.c2 || 500;
    $scope.bolsa = $localStorage.bolsa || 0;
    $scope.cuentas = [{'numero':1,'cuentas': $scope.c1,'historial':[{'depositos':[{'deposito': $scope.c1}]},{'retiros':[]}]},{'numero':2,'cuentas': $scope.c2,'historial':[{'depositos':[{'deposito': $scope.c2}]},{'retiros':[]}]}]
    /*Agregar Valor a una cuenta*/
    $scope.addvalue = function(valor){
        valor.cuentas = parseFloat(valor.cuentas) + parseFloat($scope.newObject[valor.numero])
        $scope.bolsa = parseFloat($scope.bolsa) - parseFloat($scope.newObject[valor.numero])
        valor.historial[0]['depositos'].push({'deposito': parseFloat($scope.newObject[valor.numero]) });
        $scope.newObject = {};
    }
    /*Retirar de una cuenta*/
    $scope.getvalue = function(valor){
        valor.cuentas = parseFloat(valor.cuentas) - parseFloat($scope.newObject[valor.numero])
        $scope.bolsa = parseFloat($scope.bolsa) + parseFloat($scope.newObject[valor.numero])
        valor.historial[1]['retiros'].push({'retiro': parseFloat($scope.newObject[valor.numero]) });
        $scope.newObject = {};
    }
    /*distribuir entre las cuentas*/
    $scope.distvalue = function(valor){
        valor.cuentas = parseFloat(valor.cuentas) + parseFloat($scope.bolsavalue)
        valor.historial[1]['retiros'].push({'retiro': parseFloat($scope.bolsavalue) });
        if ($scope.bolsa < 0) {
            $scope.bolsa = parseFloat($scope.bolsa) + parseFloat($scope.bolsavalue)
        }else{
            $scope.bolsa = parseFloat($scope.bolsa) - parseFloat($scope.bolsavalue)
        };
        $scope.bolsavalue = "" 
    }
    /*Crear una cuenta*/
    $scope.newcount = function(valor){
        co = 0
        if (valor != 'otro'){
        porcent = Math.abs($scope.bolsa)
        co = parseFloat(porcent)*parseInt(valor)/100
        $scope.cuentas.push({'numero':$scope.cuentas.length+1,'cuentas': co,'historial':[{'depositos':[{'deposito': co}]},{'retiros':[]}]})
        console.log($scope.cuentas)
        }else{
            porcent = Math.abs($scope.bolsa)
            co = porcent - parseFloat(valor)
            $scope.cuentas.push({'numero':$scope.cuentas.length+1,'cuentas': co,'historial':[{'depositos':[{'deposito': co}]},{'retiros':[]}]})
            console.log($scope.cuentas)
        };
       if ($scope.bolsa < 0) {
            $scope.bolsa = parseFloat($scope.bolsa) + parseFloat(co)
        }else{
            $scope.bolsa = parseFloat($scope.bolsa) - parseFloat(co)
        };
    }
    /*Cuardar todo*/
    $scope.savecount = function(){
        $scope.historysave = false;
        $scope.$watch($scope.cuentas, function() {
            $localStorage.c1 = $scope.c1;
            $localStorage.c2 = $scope.c2;
            $localStorage.bolsa = $scope.bolsa;
            $localStorage.todo = $scope.cuentas
        }, true);
    }
 });