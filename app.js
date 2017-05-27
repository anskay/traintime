  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAd8joXHLdEQpX3HV0pNPeUfxA_QsAT1Pw",
    authDomain: "traintime-2a985.firebaseapp.com",
    databaseURL: "https://traintime-2a985.firebaseio.com",
    projectId: "traintime-2a985",
    storageBucket: "traintime-2a985.appspot.com",
    messagingSenderId: "820974999478"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  var nextTrain = '';
var nextTrain2= '';
var minutesAway = '';
var firstTime = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';


  // 	database.ref().set({
		//     name: name,
		//     destination: destination,
		//     firstTrain: firstTrain,
		//     frequency: frequency
		// });


$(document).ready(function (){

	$("#newTrain").on("click", function(e){
		e.preventDefault();
		name = $("#name"). val().trim();
		destination = $("#destination").val().trim();
		firstTrain = $("#firstTrain").val().trim();
		frequency = $("#frequency").val().trim();

      firstTime= moment(firstTrain, "hh:mm").subtract(1, "years");
      currentTime = moment();
      diffTime = moment().diff(moment(firstTime), "minutes");
      tRemainder = diffTime % frequency;
      minutesTillTrain = frequency - tRemainder;
      nextTrain = moment().add(minutesTillTrain, "minutes");
      nextTrain2 = moment(nextTrain).format("hh:mm");

		console.log(name, ", " + destination + firstTrain + frequency);

		//Each time a new value is added that is the "child_added" event
		database.ref().push( {
		    name: name,
		    destination: destination,
		    firstTrain: firstTrain,
		    frequency: frequency,
            nextTrain2: nextTrain2,
            minutesTillTrain: minutesTillTrain		    
		});

        $('#name').val('');
     	$('#destination').val('');
     	$('#firstTrain').val('');
     	$('#frequency').val('');

	});

		//Firebase watcher
		database.ref().on("child_added", function(snapshot) {

			console.log(snapshot.val());  //logs everything
			console.log(snapshot.val().name);
			console.log(snapshot.val().destination);
			console.log(snapshot.val().firstTrain);
			console.log(snapshot.val().frequency);


			

			var name = snapshot.val().name;
			var destination = snapshot.val().destination;
			var frequency = snapshot.val().frequency;
			var nextTrain2 = snapshot.val().nextTrain2;
			var minutesTillTrain = snapshot.val().minutesTillTrain;
		
			//add row data 

			var tableRow = $("<tr>");
			var tableData = $("<td>");

			tableData.append(name);
			tableRow.append(tableData);
			var tableData = $("<td>");

			tableData.append(destination);
			tableRow.append(tableData);
			var tableData = $("<td>");

			tableData.append(frequency);
			tableRow.append(tableData);
			var tableData = $("<td>");

			tableData.append(nextTrain2);
			tableRow.append(tableData);
			var tableData = $("<td>");

			tableData.append(minutesTillTrain);
			tableRow.append(tableData);
			var tableData = $("<td>");


			$("tbody").append(tableRow);

		});

});
