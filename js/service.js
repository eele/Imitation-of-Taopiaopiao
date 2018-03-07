angular.module('myApp')
    .factory('CityService', [function () {
        var currentCity = '广州';
        return {
            getCurentCity() {
                return currentCity;
            },
            setCurrentCIty(city) {
                currentCity = city;
            }
        }
    }])
    .factory('CinemaService', [function () {
        var filterObj = {
            area: '%%',
            orderBy: '',
            support: '%%'
        };
        
        return {
            getFilterObj() {
                return filterObj;
            }
        }
    }])
    .factory('PaymentService', [function () {
        var paymentData = {
            price: 0,
            totalprice: 0
        };
        
        return {
            getPaymentData() {
                return paymentData;
            }
        }
    }])