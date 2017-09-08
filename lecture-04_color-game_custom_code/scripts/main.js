var app = {
    gameOver : false,
    numOfCards: 6,
    countDownPlaying : null,
    blinkId:null,
    preSelectedColor:"",
    mode:"hard",
    cards:[],
    init:function (){
       this.casheDom();
       this.getNumOfCards();
       this.render();
       this.checkSelectedColor();
       this.resetButtonEl.addEventListener('click',function (){
            this.reset();
       }.bind(this));
    },
    casheDom:function (){
        this.cardContainerEl = document.getElementById('card-container');
        this.navbarEl = document.getElementById('navbar');
        this.preSelectedColorEl = document.getElementById('pre-selected-color');
        this.messageEl = document.getElementById('message');
        this.bodyEl = document.body;
        this.countdownDisplayEl = document.querySelector("#countdown");
        this.resetButtonEl = document.getElementById('reset');
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
    setMode:function (mode){
      this.mode = mode;
    },  
    getNumOfCards:function (){
        this.navbarEl.addEventListener('click', function (event){
             var navbarItems = this.navbarEl.querySelectorAll('li a');
             navbarItems.forEach(function(item){
                item.classList.remove('selected');
             });
             var targetEl = event.target;
             if(targetEl.nodeName.toLowerCase() === 'a'){
                  targetEl.classList.add('selected');
             }
          
             var targetElText = targetEl.textContent.toLowerCase();
          
             switch (targetElText) {
                case 'easy':
                    this.numOfCards = 3;
                    this.setMode(targetElText);
                    this.resetBackgroundColor();
                    this.deactivateCountDown();
                    break;
                case 'hard':
                    this.numOfCards = 6;
                    this.setMode(targetElText);
                    this.resetBackgroundColor();
                    this.deactivateCountDown();
                    break;
                case 'nightmare':
                    this.numOfCards = 6;
                    this.setMode(targetElText);
                    this.resetBackgroundColor();
                    this.activateCountDown();
                    break;
                default: 
                    this.numOfCards = 6;
                    this.setMode('hard');
                    this.deactivateCountDown();
            }
            if(targetEl.nodeName.toLowerCase() === 'a'){
                this.reset();
            }
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
            clearInterval(this.countDownPlaying);
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
        } else if (isON === false) {
          clearInterval(this.countDownPlaying);
          this.countdownDisplayEl.textContent ="";
          this.messageEl.textContent = "WHAT'S THE COLOR?";
        }
    },
    reset:function (){
       this.resetButtonEl.textContent = 'New Color';
       this.bodyEl.style.backgroundColor = '#232323';
       this.messageEl.textContent = "WHAT'S THE COLOR?";
       this.render();
       if(this.mode === 'nightmare'){
         this.activateCountDown();
       }
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
    pickColor: function (){
      var randomNumber = Math.floor(Math.random() * this.cards.length);
      return this.cards[randomNumber].color;
    },
    resetBackgroundColor:function (){
         this.bodyEl.style.backgroundColor = '#232323';
    },
    setAllCardsToWhite:function (){
      var cards = this.cardContainerEl.childNodes;
      cards.forEach(function (card){
          card.style.opacity = 1;
          card.style.background = '#FFF';
      });
    },
    end:function (){
         this.countdownDisplayEl.textContent = '';
         this.resetButtonEl.style.opacity = 1;
         this.resetButtonEl.textContent = "Play Again"
         this.setAllCardsToWhite();
         this.bodyEl.style.backgroundColor = this.preSelectedColor;
         this.deactivateCountDown();
         gameOver = true;
    },
    checkSelectedColor:function (){
      this.cardContainerEl.addEventListener('click', function (event){
          var clickedCard = event.target;
          var clickedColor = clickedCard.style.backgroundColor;
          var preSelectedColor = this.preSelectedColor;
          if(clickedColor === preSelectedColor) {
            this.setAllCardsToWhite();
            this.end();
            this.renderGameState('Correct!');
          } else{
            clickedCard.style.opacity = 0;
            // this.renderGameState('&nbsp');
            setTimeout(function(){
                this.renderGameState('Try Again');
            }.bind(this),100);
          
          }
      }.bind(this));
    },
}

app.init();