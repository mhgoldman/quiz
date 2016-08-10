questions = [
  { prompt: "What Frank Costanza catchphrase was responsible for Lloyd Braun's nervous breakdown?",
    answers: ['Hakuna Matata', 'Serenity Now', 'Hoochie Mama', 'God Love a Duck'],
    correctAnswerIndex: 1,
    imageName: 'frank.png'
  },
  { prompt: "What was Elaine's ultimate betrayal of Ned Isakoff?",
    answers: ["Deciding he wasn't spongeworthy", "Getting banished by the Soup Nazi", "Re-gifting a label maker", "Naming names"],
    correctAnswerIndex: 3,
    imageName: 'elaine.jpg'
  },
  { prompt: "Why didn't Newman get his dream transfer to Hawaii?",
    answers: ['Too many people got their mail', 'Kramer cancelled his mail', 'He was a scofflaw', 'He used his mail truck to transport empty bottles'],
    correctAnswerIndex: 0,
    imageName: 'newman.png'
  },
  { prompt: "Who really invaded Spain in the 8th century?",
    answers: ['The Franks', 'The Moors', 'The Moops', 'The Knicks'],
    correctAnswerIndex: 1,
    imageName: 'george.jpg'
  },
  { prompt: "Which role was never played by Larry David?",
    answers: ['Newspaper stand vendor', 'Mr. Steinbrenner', "Frank's friend", "Manager of Reggie's Diner"],
    correctAnswerIndex: 3,
    imageName: 'larrydavid.jpg'
  },
];

function newGame() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  loadQuestion(currentQuestionIndex);
}

function loadQuestion(questionIndex) {
  $('input[name=selectedAnswer]').prop('checked', false);

  currentQuestionIndex = questionIndex;
  question = questions[questionIndex];

  $('.prompt').html(question.prompt);

  for (i=0; i<question.answers.length; i++) {
    $('.answerText' + i).html(question.answers[i]);    
  }

  $('.background').css('background-image', "url('images/" + question.imageName + "')");

  updateProgress(questionIndex);
}

function updateProgress() {
  $('.progress progress').val((currentQuestionIndex+1) * 20);
  $('.progress p').html('Question ' + (currentQuestionIndex+1) + ' / ' + questions.length);
}

function incrementQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    loadQuestion(currentQuestionIndex+1);    
  } else {
    finish();
  }
}

function scoreCurrentQuestion() {
  if (questions[currentQuestionIndex].correctAnswerIndex == $('input[name=selectedAnswer]:checked').val()) {
    correctAnswers++;
  }
}

function finish() {
  $('.question').hide();
  $('.ending .subheading').html('You got ' + correctAnswers + ' right!')
  $('.background').css('background-image', "url('images/background.jpg')");  
  $('.ending').show();
}

$('.start-button').click(function(){
  newGame();
  $('.intro').hide();
  $('.ending').hide();
  $('.question').show();
  $('.progress').show();
});

$('.submit-button').click(function() {
  if ($('input[name=selectedAnswer]:checked').length > 0) {
    scoreCurrentQuestion();
    incrementQuestion();    
  }
});