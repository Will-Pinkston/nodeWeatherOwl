var app = angular.module('app', [])
app.factory('OwlFetch', OwlFetch)
app.controller('MainCtrl', MainCtrl)

function MainCtrl ($scope, $http, OwlFetch) {
    var owlPellet;
    var dataIndex = 0;
    $scope.OwlSearch = function() {
        var word = $scope.search;
        OwlFetch.tryit()
          .then(function(data) {
                owlPellet = data;
		$("#def_word").html("");
                $("#def_def").html("");
                $("#def_ex").html("");
		
                $("#def_word").html(word);
                $("#def_def").html(owlPellet[0].defenition);
                $("#def_ex").html(owlPellet[0].example);
        });                     
        $scope.search = "";
    };              

    $scope.CitySearch = function() {
        $( "#cityfield" ).keyup(function() {
		if ($("#cityfield").val() == "") {
			$("#txtHint").html("Empty");
		}
		else {
	                var url = "../getcity?q="+$("#cityfield").val();
	                $.getJSON(url,function(data) {
	                    var everything; 
	                    everything = "<ul>";
	                    $.each(data, function(i,item) {
	                        everything += "<li> "+data[i].city;
	                    });     
	                    everything += "</ul>";
	                    $("#txtHint").html(everything);
	                });
		}
        });     
    };      
}


function OwlFetch ($http) {
    return {
        tryit: function() {
            var theOwl = "/owlbot?q="+$("#owlfield").val();
            return $http
                .get(theOwl)
                .then(function(resp) {
                    return resp.data;
                })
        }
    }
}
