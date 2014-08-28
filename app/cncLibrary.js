angular.module('cncLibrary', [])

.constant('GEONAMES_API_PREFIX', 'http://api.geonames.org')

.factory('cncCountries', ['$http', '$q', 'GEONAMES_API_PREFIX',
                  function($http,   $q,   GEONAMES_API_PREFIX) {
    var countryInfo = [];
    return function() {
        var defer = $q.defer(),
            path = "/countryInfoJSON?username=jettagozoom";

        if (countryInfo.length == 0) {
            $http.get(GEONAMES_API_PREFIX + path)
            .success(function(data) {
                countryInfo = removeDups(data.geonames);
                defer.resolve(countryInfo);
            })
        } else {
            defer.resolve(countryInfo);
        }

        return defer.promise;
    }

    function removeDups(countries) {
        var newname = "",
            tmpArray = [],
            arrayLen = 0;
            foundDup = false;

        for (country in countries) {
            newname = countries[country].countryName;
            arrayLen = tmpArray.length;

            if (arrayLen == 0) {
                tmpArray.push(countries[country]);
            } else {
                foundDup = false;
                for (var i = 0; i < arrayLen; i++) {
                    var name = tmpArray[i].countryName;
                    if (name === newname) {
                        foundDup = true;
                        console.log("Found a duplicate name: " + newname);
                        break;
                    }
                }
                if (foundDup == false) {
                    tmpArray.push(countries[country]);
                }
            }
        }
        return tmpArray;
    }
}])

.factory('cncCountry', ['cncCountries', '$q',
                function(cncCountries,   $q) {
    return function(countryCode) {
        var defer = $q.defer();
        cncCountries()
        .then(function(countries) {
            for (index in countries) {
                if (countryCode === countries[index].countryCode) {
                    defer.resolve(countries[index]);
                }
            }
        })
        return defer.promise;
    }
}])

.factory('cncCapital', ['$http', '$q', 'GEONAMES_API_PREFIX',
                function($http,   $q,   GEONAMES_API_PREFIX) {
    return function(country) {
        var defer = $q.defer(),
            path = "/searchJSON?" +
                   "q=" + country.capital +
                   "&featureCode=PPLC" +
                   "&country=" + country.countryCode + 
                   "&maxRows=2" +
                   "&username=jettagozoom";

        $http.get(GEONAMES_API_PREFIX + path)
        .success(function(data) {
            defer.resolve(data.geonames[0]);
        })

        return defer.promise;
    }
}]);

