var app = {
    gameOver : false,
    numOfCards: 6,
    countDownPlaying : null,
    blinkId:null,
    preSelectedColor:"",
    mode:"hard",
    cards:[ ],
    init:function (){
       this.casheDom();
       this.getNumOfCards();
       this.render();
       this.checkSelectedColor();
    },
    casheDom:function (){
        this.cardContainerEl = document.getElementById('card-container');
        this.navbarEl = document.getElementById('navbar');
        this.preSelectedColorEl = document.getElementById('pre-selected-color');
        this.messageEl = document.getElementById('message');
        this.bodyEl = document.body;
        this.countdownDisplayEl = document.querySelector("#countdown");
        
    },
    setCards:function(){
      this.cards = [];
      for(var i = 0 ; i< this.numOfCards ; i++){
         var color = this.randomColor();
         this.cards.push({
            card_id:i,
            color:color
         })
      }
    },
    // end: function (){
    //     countdownDisplay.textContent = '';
    //     resetButton.style.opacity = 1;
    //     this.countdownDisplayEl.textContent = "Play Again"
    //     changeColors("#FFF");
    //     body.style.backgroundColor = pickedColor;
    //     gameOver = true;
    // },
    getMode:function (mode){
      this.mode = mode;
    },  
    getNumOfCards:function (){
        this.navbarEl.addEventListener('click', function (event){
             var targetEl = event.target;
             var targetElText = targetEl.textContent.toLowerCase();
             switch (targetElText) {
                case 'easy':
                    this.numOfCards = 3;
                    this.getMode(targetElText);
                    this.deactivateCountDown();
                    break;
                case 'hard':
                    this.numOfCards = 6;
                    this.getMode(targetElText);
                    this.deactivateCountDown();
                    break;
                case 'nightmare':
                    this.numOfCards = 6;
                    this.getMode(targetElText);
                    this.activateCountDown();
                    break;
                case 'crazy':
                    this.numOfCards = 15;
                    this.getMode(targetElText);
                    this.deactivateCountDown();
                    break;
                default: 
                    this.numOfCards = 6;
                    this.getMode('hard');
                    this.deactivateCountDown();
            }
            this.reset();
        }.bind(this));
    },
    render:function (){
      this.renderCards();
      this.renderColorCode();
    },
    renderCards: function (){
       this.setCards();
       this.cardContainerEl.innerHTML = '';
       var html="";
       this.cards.forEach(function (card){
          html += `<div class="card" style="background-color:${card.color}";></div>`;
       });
       this.cardContainerEl.innerHTML = html;  
    },
    renderColorCode: function (){
        this.preSelectedColor = this.pickColor();
        this.preSelectedColorEl.textContent = this.preSelectedColor;
    },
    activateCountDown:function (){
        this.countDown(true);
    },
    deactivateCountDown:function (){
        this.countDown(false);
    },
  
    blink:function (){
       this.bodyEl.style.backgroundColor = '#232323';
       clearInterval(this.blinkId);
    },
    countDown:function (isON){
        var second = 4;
        if(isON === true){
            this.countdownDisplayEl.textContent = ` ${second + 1}`;
            this.countDownPlaying = setInterval(function(){
              if(second > 0){
                  this.countdownDisplayEl.textContent = ` ${second}`;
                  second -= 1;
                  this.bodyEl.style.backgroundColor = '#FFF';
                  this.blinkId = setInterval(this.blink.bind(this), 50);
               } else {
                  clearInterval(this.countDownPlaying);
                  this.countdownDisplayEl.textContent ="";
                  this.messageEl.textContent = 'Timeout!';
               }
             }.bind(this),1000);    
        } else {
          clearInterval(this.countDownPlaying);
          this.countdownDisplayEl.textContent ="";
          this.messageEl.textContent = "WHAT'S THE COLOR?";
        }
    },
    reset:function (){
       this.render();
    },
    randomColor: function (){
      //pick a "red" from 0 - 255
      var r = Math.floor(Math.random() * 256);
      //pick a "green" from  0 -255
      var g = Math.floor(Math.random() * 256);
      //pick a "blue" from  0 -255
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + ", " + g + ", " + b + ")";
    },
    renderGameState:function (message){
        this.messageEl.innerHTML = message;
    },
    renderBackgroundColor:function (color){
        this.bodyEl.style.backgroundColor = color;
    },
    pickColor: function (){
      var randomNumber = Math.floor(Math.random() * this.cards.length);
      return this.cards[randomNumber].color;
    },
    setAllCardsToWhite:function (){
      var cards = this.cardContainerEl.childNodes;
      cards.forEach(function (card){
          card.style.opacity = 1;
          card.style.background = '#FFF';
      });
    },
    checkSelectedColor:function (){
      this.cardContainerEl.addEventListener('click', function (event){
          var clickedCard = event.target;
          var clickedColor = clickedCard.style.backgroundColor;
          var preSelectedColor = this.preSelectedColor;
          if(clickedColor === preSelectedColor) {
            this.renderGameState('Correct!');
            this.renderBackgroundColor(clickedColor);
            this.setAllCardsToWhite();
          } else{
            clickedCard.style.opacity = 0;
            this.renderGameState('&nbsp');
            setTimeout(function(){
                this.renderGameState('Try Again');
            }.bind(this),100);
          
          }
      }.bind(this));
    },
}



app.init();