  // API url of this project
	var url = "https://people.rit.edu/dmgics/754/23/proxy.php";
// calling get Organization method to showing up in the website
// using GET with Path of this url "OrgTypes"
	function getOrgTypes(){

	    $.ajax({
	    	type: "GET",  	//HTTP method, could alse be "POST"
	    	async: true, 	//request should be non-blocking?
	    	cache: false,    //store the response data
	    	url: url,
	    	data: { path: "/OrgTypes" },
	    	dataType: "xml", //content type of response
	    	success: function( data, status ){
          console.log( data );
	    		var opts = "";
	    		if( $( data ).find( "error" ).length !== 0){
	    		  //do something gr
	    		}
	    		else{
	    		    opts += "<option value=''> All Organization Types</option>";
	    		    $( "row" , data ).each( function(){
	    		       opts += "<option value='"+ $( "type", this ).text() + "'>" + $( "type", this ).text() + "</option>";
	    		    });
	    		    $( "#orgType" ).html( opts );
              //$( "#orgType").selectmenu();
							$( "#orgType").chosen();

	    		}
	    	}
	    });

	}
	// calling a state method to set up a states from the API
	// Also beside choosing state, the cities will showing up beside the state.
function getStates(){
  // https://harvesthq.github.io/chosen/ plugins
	$.ajax({
	     type: "GET",  	//HTTP method, could alse be "POST"
	    	async: true, 	//request should be non-blocking?
	    	cache: false,    //store the response data
	    	url: url,
	    	data: { path: "/States" },
	    	dataType: "xml", //content type of response
	    	success: function( data, status ){
	    	    console.log( data );
	    		var stateOption = "";
                stateOption += "<option value=''> All States </option>";
								// iletreate through row to get state text and binding to the select, option
	    		     $( "row", data ).each( function(){
	    		       stateOption += "<option value='" + $( "State", this).text() + "'>" + $( "State" , this).text() +"</option>";
	    		      });
								// appending to the html
	    	      $("#state").html( stateOption );
							// calling change function , here when click on the state e.g NY , the cities of NY will showing up for next selection

              $("#state").change( function (){
                 return getCities();  // comming from function inside this script
              });

							// plugin of drop down selection this is a first one ..
							// resoureces : https://harvesthq.github.io/chosen/

              $("#state").chosen();
       }
	});
}

function getCities(){
     var stateSelection = $("#state option:selected").val();
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/Cities?state="+escape($('#state').val())}, // selected option with value from this path will consider on cities with attribute of state value
    dataType: "xml", //content type of response
    success: function( data , status ){
        var cityOption = "";
      if( stateSelection ){
        cityOption+= "<option value=''> All cities </option>";
				// iletreate over the cities and binding them to the selection option
       $("row", data ).each( function(){
           cityOption += "<option value='" + $( "city", this).text() + "'>" + $("city", this).text() +"</option>";
       });
			 // append to the html
        $("#city").html( cityOption );
				// plugin of drop down selection this is a first one ..
				// resoureces : https://harvesthq.github.io/chosen/
        $("#city").chosen();
      }
      else {

        $( "#tableOutput").html( "no matches " );
      }
    }
  });


}

// the tabs infromation

function getGeneralInfo( idObject ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject +"/General"},
    dataType: "xml", //content type of response
    success: function( data , status ){
       console.log(data);
      var generalInfo = "";
            generalInfo += "<div id=re>"
                        + "<div>" + "<label> Name : </label>"
                        + "<label>" + $(data).find("name").text() + "</label>" + "</div>"
                        + "<div>" + "<label> Description : </label>"
                        + "<label>" + $(data).find("description").text() + "</label>" + "</div>"
                        + "<div>" + "<label> Email : </label>"
                        + "<label>" + $(data).find("email").text()  + "</label>" + "</div>"
                        + "<div>" + "<label> Website : </label>"
                        + "<label>" + $(data).find("website").text() + "</label>" + "</div>"
                        + "<label>" + "<label> Number of Memebers : </label>"
                        + "<label>" + $(data).find("nummembers").text() + "</label>" + "</div>"
                        + "<div>" + "<label> Number of calls  : </div>"
                        + "<label>" + $(data).find("numcalls").text() + "</label>" + "</label>"
                        + "<div>" + "<label> Service Area : </label>"
                        + "<label>" + $(data).find("servicearea").text() + "</label>" + "</div>"
                        + "</div>"
         $( "#General").html( generalInfo );
        }
    });
}
// funciton of treatment tab
function getTreatmentsInfo( idObject1 ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject1 +"/Treatments"},
    dataType: "xml", //content type of response
    success: function( data , status ){
       console.log(data);
      var treatmentInfo = "";
			// building table to showing up the informtio inside it
         treatmentInfo += `<table id="result-table" class="tablesorter">
                             <thead>
                             <tr>
                             <th>ID</th>
                              <th>Type</th>
                              <th>Observation</th>
                             </tr>
                             </thead>`;
						// iletreate over the treatement and get information need to showun up
             $( "treatment", data).each( function (){
                      treatmentInfo += "<tr>" +
                                       "<td>" + $(this).find( "typeId" ).text() + "</td>"
                                       +"<td>" + $(this).find( "type" ).text() + "</td>"
                                       + "<td>" + $(this).find("abbreviation").text() + "</td>"
                                       + "</tr>";
              });
							// close table
                treatmentInfo += "</table>";
								// appending to the html

         $( "#Treatment").html( treatmentInfo );
        }
    });
}
// function from the tab
function getTrainingInfo( idObject2 ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject2 +"/Training"},
    dataType: "xml", //content type of response
    success: function( data , status ){
       console.log(data);
      var trainingInfo = "";
			// creating table to showing informaiton
         trainingInfo += `<table id="result-table" class="tablesorter">
                             <thead>
                             <tr>
                             <th> ID </th>
                              <th>Type</th>
                              <th>Observation</th>
                             </tr>
                             </thead>`;
							// iletreate over the treaingn tag to get infroamtion need
             $( "training", data).each( function (){
                      trainingInfo += "<tr>" +
                                       "<td>" + $(this).find( "typeId" ).text() + "</td>"
                                       +"<td>" + $(this).find( "type" ).text() + "</td>"
                                       + "<td>" + $(this).find("abbreviation").text() + "</td>"
                                       + "</tr>";
              });
							// close table
                trainingInfo += "</table>";
								// append to the html
         $( "#Training").html( trainingInfo );
        }
    });
}

function getEquipmentInfo( idObject3 ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject3 +"/Equipment"},
    dataType: "xml", //content type of response
    success: function( data , status ){
       console.log(data);
      var equipmentInfo = "";
			//creating table to showing informaiton inside it
         equipmentInfo += `<table id="result-table" class="tablesorter">
                             <thead>
                             <tr>
                             <th>Type Id</th>
                              <th>Type</th>
                              <th>Quantity</th>
                              <th>Description</th>
                             </tr>
                             </thead>`;
														 //iterate on the equipment to filling into the table created
             $( "equipment", data).each( function (){
                      equipmentInfo += "<tr>" +
                                       "<td>" + $(this).find( "typeId" ).text() + "</td>"
                                       + "<td>" + $(this).find("type").text() + "</td>"
                                       + "<td>" + $(this).find("quantity").text() + "</td>"
                                       + "<td>" + $(this).find("description").text() + "</td>"
                                       + "</tr>";
              });
                equipmentInfo += "</table>";
         $( "#Equipment").html( equipmentInfo );
        }
    });
}


function getPhysiciansInfo( idObject4 ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject4 +"/Physicians"},
    dataType: "xml", //content type of response
    success: function( data , status ){
       console.log(data);
      var physicianInfo = "";
			// create table for physiscans
         physicianInfo  += `<table id="result-table" class="tablesorter">
                             <thead>
                             <tr>
                             <th>Person ID</th>
                              <th>First Name</th>
                              <th>Middel Name</th>
                              <th>Last Name </th>
                              <th>Suffix</th>
                              <th>Phone</th>
                              <th>License</th>
                             </tr>
                             </thead>`;
														 // iterat on the physician to get information
             $( "physician", data).each( function (){
                      physicianInfo  += "<tr>" +
                                       "<td>" + $(this).find( "personId" ).text() + "</td>"
                                       + "<td>" + $(this).find("fName").text() + "</td>"
                                       + "<td>" + $(this).find("mName").text() + "</td>"
                                       + "<td>" + $(this).find("lName").text() + "</td>"
                                       + "<td>" + $(this).find("suffix").text() + "</td>"
                                       + "<td>" + $(this).find("phone").text() + "</td>"
                                       + "<td>" + $(this).find("license").text() + "</td>"
                                       + "</tr>";
              });
                physicianInfo  += "</table>";
         $( "#Physicians").html( physicianInfo  );
        }
    });
}

function getPeopleInfo( idObject5 ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject5 +"/People"},
    dataType: "xml", //content type of response
    success: function( data , status ){
       console.log(data);
      var peopleInfo = "",
          optSite =""
					 divInfo="";
         peopleInfo  += `<div> `+
                      `<label> Please choose a Site: </label>`
                      + `<select id='selectionsite'></select>`
                      + "</div>";
					optSite = "<option> All sites</option>";

          $( "site", data).each( function (){
                  //var addressString = $( this ).text() + " = " + $( this ).attr( "address" );
             optSite +="<option value='"+ $( this).attr("siteId") +"'>"+  $( this).attr("address")+"</option>";

           });
           $( "#People").html(peopleInfo);
           $("#selectionsite").html( optSite );


           $("#selectionsite").change( function(){
             var selectionOfsite = $("#selectionsite option").filter(":selected").val(),
                 peopleInfo1 = "";
            peopleInfo1 += "<div>" + `<table id="result-table" class="tablesorter tablesorter-blackice">
                               <thead>
                               <tr>
                               <th>Person ID</th>
                               <th>Honorific</th>
                               <th>First Name</th>
                               <th>Middle Name</th>
                               <th>Last Name</th>
                               <th>Suffix</th>
                               <th>Role</th>
                               <th>Contact Method</th>
                               </tr>
                               </thead>`;
									$("site",data).each( function(){
										if( selectionOfsite === $(this).attr("siteId") ){
												 console.log( selectionOfsite );
                         $("person", data).each( function(){
                             peopleInfo1 += "<tr>" +
                            "<td>" + $( this).find( "personId" ).text() + "</td>"
                          + "<td>"+ $(this).find("honorific").text() + "</td>"
                          + "<td>"+ $(this).find("fName").text() + "</td>"
                          + "<td>"+ $(this).find("mName").text() + "</td>"
                          + "<td>"+ $(this).find("lName").text() + "</td>"
                          + "<td>"+ $(this).find("suffix").text() + "</td>"
                          + "<td>"+ $(this).find("role").text() + "</td>"
                          + "<td>"+ $(this).find("contactmethod").text() + "</td>"
                          + "</tr>";
										 peopleInfo1 += "</table>" + "</div>";
                  });
							 	}
								});
						 $("#tableOutput1").html( peopleInfo1 );
						 $("#tableOutput1").tabs();
           });
    }
  });
}
// a facilites function
function getAssetsInfo( idObject6 ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject6 +"/Facilities"},
    dataType: "xml", //content type of response
    success: function( data , status ){
         console.log( data );
         var facilitiesInfo = "";
				 // create table to the facitiltes
            facilitiesInfo += `<table id="result-table" class="tablesorter">
                                <thead>
                                <tr>
                                <th>Type Id</th>
                                 <th>Type</th>
                                 <th>Quantity</th>
                                 <th>Description</th>
                                </tr>
                                </thead>`;
																// iterate on the facitity to get infromtation
                $( "facility", data).each( function (){
                         facilitiesInfo += "<tr>" +
                                          "<td>" + $(this).find( "typeId" ).text() + "</td>"
                                          + "<td>" + $(this).find("type").text() + "</td>"
                                          + "<td>" + $(this).find("quantity").text() + "</td>"
                                          + "<td>" + $(this).find("description").text() + "</td>"
                                          + "</tr>";
                 });
                   facilitiesInfo += "</table>";
            $( "#Facilities").html( facilitiesInfo );
    }
  });
}
// location function
function getLocationInfo( idObject7 ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/"+ idObject7 +"/Locations"},
    dataType: "xml", //content type of response
    success: function( data , status ){
      console.log( data );
     // create a select to able user click on the value they want it
      var locationInfo = "",
          optlocation ="";
         locationInfo  += `<div> `+
                      `<label> Location Type : </label>`
                      + `<select id='selectionTypeLocation'></select>` // asing ID to the selection
                      + "</div>";

          optlocation +="<option> All type of location </option>";
					//iteration on the location to get type and sited , sitedId as a value , type is the text which will appear
          $( "location", data).each( function (){
                  //var addressString = $( this ).text() + " = " + $( this ).attr( "address" );
             optlocation +="<option value='"+ $(this).find("siteId").text()  + "'>"+  $(this).find("type").text() +"</option>";
           });
					 // appending the div than option to the select which is in the div
           $( "#Locations").html(locationInfo);
           $("#selectionTypeLocation").html( optlocation );

					 /**
					  on change function will sort on the value selected to showing up
						information of that value, so i used sitedId as a value of the location
						information
					 **/
           $("#selectionTypeLocation").change( function( event ){
            var selectionOflocation = $("#selectionTypeLocation option").filter(":selected").val(),
                 locationInfo1 = "";
          //   if( selectionOflocation  ){
              //  console.log( selectionOflocation );
            locationInfo1 += "<div>" + `<table id="result-table" class="tablesorter">
                               <thead>
                               <tr>
                               <th>Type</th>
                               <th>address 1</th>
                               <th>address 2</th>
                               <th>City</th>
                               <th>State</th>
                               <th>Zip </th>
                               <th>Phone</th>
                               <th>TTY PHONE</th>
                               <th>Fax</th>
                               <th>Latitude</th>
                               <th>Longitude</th>
                               <th> Country ID </th>
                               <th> Country Name </th>
                               <th> sited ID </th>
                               </tr>
                               </thead>`;

                // iterate on the location
                  $("location", data).each( function(){
										// if that selected equal to the value of sitedId, information will appear
										if( selectionOflocation === $(this).find("siteId").text()){
                    locationInfo1 += "<tr>" +
                            "<td>" + $( this).find( "type" ).text() + "</td>"
                          + "<td>"+ $(this).find("address1").text() + "</td>"
                          + "<td>"+ $(this).find("address2").text() + "</td>"
                          + "<td>"+ $(this).find("city").text() + "</td>"
                          + "<td>"+ $(this).find("state").text() + "</td>"
                          + "<td>"+ $(this).find("zip").text() + "</td>"
                          + "<td>"+ $(this).find("phone").text() + "</td>"
                          + "<td>"+ $(this).find("ttyphone").text() + "</td>"
                          + "<td>"+ $(this).find("fax").text() + "</td>"
                          + "<td id='latit'>"+ $(this).find("latitude").text() + "</td>"
                          + "<td id='longit'>"+ $(this).find("longitude").text() + "</td>"
                          + "<td>"+ $(this).find("countyId").text() + "</td>"
                          + "<td>"+ $(this).find("countyName").text() + "</td>"
                          + "<td>"+ $(this).find("siteId").text() + "</td>"
                          + "</tr>";
												locationInfo1 += "</div>" + "</table>";
												}
                    // to get map of the location selected
										/**
										here two attribute parse float from the text that appear in the table
										then get the location and marke it by using the google API,
										refrences of this code : https://developers.google.com/maps/documentation/javascript/tutorial
										Marker google : https://developers.google.com/maps/documentation/javascript/examples/marker-simple
										**/

			                  var mapLoc = "<div id='map' style='width:100%; height:400px; background-color:grey;'></div>";
			                  $( "#tableOutput1").html(locationInfo1 + mapLoc );
												$("#tableOutput1").tabs();
                  });
									var latitude = parseFloat($("#latit").text()),
											longitude = parseFloat($("#longit").text());
											//code from google API provied by Profassor ..
											var map = new google.maps.Map(document.getElementById('map'), {
													center: {lat: latitude, lng: longitude},
													zoom: 8
												 });

											 var marker = new google.maps.Marker({
	                      position: {lat: latitude, lng: longitude},
	                      map: map,
	                      title: 'Hello World!'
                      });

          //   }
           });
        }
  });
}

function getTabs( idObject ){
  $.ajax({
    type: "GET",  	//HTTP method, could alse be "POST"
    async: true, 	//request should be non-blocking?
    cache: false,    //store the response data
    url: url,
    data: { path: "/Application/Tabs?orgId=" + idObject },
    dataType: "xml", //content type of response
    success: function( data , status ){
     //var tabsoutput= "";
      console.log( data );
      var divEle = `<div id ="tabs">`;
          divEleInside="";
          divEle+='<ul>';
					// iterate on Tab to get text of the tab , that able to append information inside it
      $("Tab", data).each( function(){
          divEle += "<li style='margin-bottom: 5px; margin-left: 20px;'>" + $(this).text()+"</li>";
          divEleInside += "<div id='"+ $(this).text()+"'>" + "</div>";
      });

           divEle += "</ul>" + "</div>";
      $( "#tableOutput").html( divEle + divEleInside );
      $("#tableOutput").tabs(); // plugins from https://jqueryui.com/tabs/

			/**
			in click funciton information will get if li equal to the text,
			when that equal I call the function to get the information
			and delete the other if i click on another tab
			**/
      $("li").click( function(){
          if( $(this).text() === 'General'){
						$("#tableOutput1").remove();
						$("#tableOutput1").remove();
						$("#Locations").empty();
            return  getGeneralInfo( idObject );
          }
          else if ( $(this).text() === 'Locations'){
            $("#General").html("");
						$("#People").empty();
            return getLocationInfo( idObject );
          }
          else if ( $(this).text() === 'Treatment'){
						$("#tableOutput1").remove();
            $("#Locations").html("");
            return getTreatmentsInfo( idObject );
          }
          else if ( $(this).text() === 'Training'){
						$("#tableOutput1").remove();
            $("#Treatment").empty();
            return getTrainingInfo( idObject );
          }
          else if ( $(this).text() === 'Facilities'){
						$("#tableOutput1").remove();
            $("#Treatment").empty();
            $("#Training").empty();
            return getAssetsInfo( idObject );
          }
          else if ( $(this).text() === 'Equipment'){
						$("#tableOutput1").remove();
            $("#Facilities").empty();
            return getEquipmentInfo( idObject );
          }
          else if ( $(this).text() === 'Physicians'){
						$("#tableOutput1").remove();
						$("#Facilities").empty();
            $("#Equipment").empty();
            return getPhysiciansInfo( idObject );
          }
          else if ( $(this).text() === 'People'){
            $("#Physicians").empty();
						$("#Equipment").empty();
						$("Facilites").empty();
						$("Training").empty();
            return getPeopleInfo( idObject );
          }

      });
    }
  });
}
	 function showResults(){
	    $.ajax({
	    url: url,
	    data: {path: "/Organizations?" + $( "#search-form" ).serialize() },
	    success: function( data ){
	       console.log( data );
	       var output = "";
	       $( "#tableOutput").html( "" );
	       // you *should* test for error
	       if( $( data ).find("row").length === 0 ){
	          output += "No matches found";
						$("#tableOutput").html( output);
	       }
	       else {
					 // create table to show result after click on the button
	          output += `<table id="result-table" class="tablesorter">
	                                 <thead>
	                                 <tr>
	                                 	<th>Type</th>
	                                 	<th>Name</th>
	                                 	<th>Email</th>
	                                 	<th>State</th>
	                                 	<th>County</th>
	                                 	<th> Zip</th>
	                                 </tr>
	                                 </thead>`;

           //iterate on the row to get information need to append it to the table
	            $( "row", data).each( function (){
	                output += "<tr>" +
	                			"<td>" + $( this).find( "type" ).text() + "</td>"
	                			+ "<td>" + "<a href='javascript:getTabs(" + $(this).find("OrganizationID").text() + ")'>"+ $("Name", this).text() + "</a>" + "</td>"
	                			+ "<td>"+ $("Email", this).text() + "</td>"
                        + "<td>"+ $("State", this).text() + "</td>"
	                			+ "<td>" + $("CountyName", this).text() + "</td>"
	                			+ "<td>" + $("zip", this).text() + "</td>"
	                			+ "</tr>";
	            });
	           output += "</table>";

	           $( "#tableOutput").html( output);
             $( "#result-table" ).draggable(); // this taggle from jquery UI
	       }
	      }
	    });

	 }

	// JQuery ready function
	$( function(){
	   getOrgTypes();
	   getStates();
	});


	$( function() {
	      $("#tableOutput").show();
				// a custome plugins for the filedset , will change the css
				// and make animation
	     $("fieldset").animateDiv();  //customise
	 //animation headers
	  var state = true;

		// at this function, when click on the show result,  the div will animate with changeing backgreound and move the div
	    $( "#btnSearch" ).click( function() {
	      if ( state )
	        $( "fieldset" ).animate({
	          backgroundColor: "rgba(0,0,0,.075)",
	          color: "#fff",
	          width: 550
	        }, 1000 );
	    });
// at this function, when click on the show result,  the div will animate with changeing backgreound and move the div
// also, will clear div
	    $( "#btnSearch1" ).click( function() {
	        $( "fieldset" ).animate({
	          backgroundColor: "rgba(0,0,0,.075)",
	          color: "#000",
	          width: 750
	        }, 1000 );
	        $("#tableOutput").toggle();// from Jquery UI
					$("#tableOutput1").toggle();

	    });
	  });
