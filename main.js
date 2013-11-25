
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];


$("#playerOneButton").click(function () {
  $( ".line" ).hide();
  $('#turn-label').html($('#playerOneName').val());
  var player1 = $('#playerOneName').val();
  var player2 = $('#playerTwoName').val();
  var currentPlayer = null;
  var gameWon = false;
  var veggie_wins = 0
  var junkfood_wins = 0

  var setNextTurn = function () {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    }else {
      currentPlayer = player1;
    }
    $('#turn-label').text('It\'s ' +currentPlayer+'\'s turn');
  };

  var checkForWinner = function () {
    if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
      || spaces[3] === spaces[4] && spaces[4] === spaces[5]
      || spaces[6] === spaces[7] && spaces[7] === spaces[8]
      || spaces[0] === spaces[3] && spaces[3] === spaces[6]
      || spaces[1] === spaces[4] && spaces[4] === spaces[7]
      || spaces[2] === spaces[5] && spaces[5] === spaces[8]
      || spaces[0] === spaces[4] && spaces[4] === spaces[8]
      || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    ){
      if (currentPlayer === player1) {
        veggie_wins+=1;
        $('#veggie_wins').text(player1+ ' wins: '+ veggie_wins);
      } else{
        junkfood_wins+=1;
        $('#junkfood_wins').text(player2+ ' wins: '+ junkfood_wins);
      };
      console.log(currentPlayer+' won');
      $(document).trigger('game-win', currentPlayer);
    };
  };

  $(document).on('click', '#board .space', function (e) {
   if (!gameWon) {
      var spaceNum = $(e.currentTarget).index();
      console.log('You clicked on space #' + spaceNum);
      if (spaces[spaceNum]) {
        alert("this place is full");      
      } else {
        spaces[spaceNum] = currentPlayer;
        if (currentPlayer===player1) {
          $('#board .space:eq(' + spaceNum + ')').addClass('veggies');
        } else{
          $('#board .space:eq(' + spaceNum + ')').addClass('junkfood');
        };
        checkForWinner();
        setNextTurn();
      };  
    };
  });

  $(document).on('game-win', function (e, winner) {
    // TODO: Alert who won the game
    alert(winner+" won!");
    gameWon = true;
  });

  // Start the game
  $('.new_game').click(function (e) {
    gameWon = false;
    $('#board .space').removeClass('veggies');
    $('#board .space').removeClass('junkfood');
    for (var i = 8; i >= 0; i--) {  
      spaces[i]= NaN   
    }; 
  });

  setNextTurn();
});

