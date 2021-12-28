class StartState{

    constructor()
    {
        this.startHover = false;
        this.scoresHover = false;
        this.width = 80*SCALE_FACTOR_WIDTH;
        this.height = 40*SCALE_FACTOR_WIDTH;
        this.startX = WINDOW_WIDTH/2 - this.width/2;
        this.startY = WINDOW_HEIGHT*5/9;
        this.scoreX = WINDOW_WIDTH/2 - this.width/2;
        this.scoreY = WINDOW_HEIGHT*6/8;
        this.mouseFlag = false;
        this.colors = ['blue', 'cyan', 'purple', 'green', 'orange', 'red', 'yellow'];
        this.titleColors = [0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3];
        this.title = 'TileBreaker';
        this.spaces = [0, 16, 24, 32, 64, 84, 100, 120, 140, 160, 180];
        this.opacity = 0;
    }

    /*
    * updates the title colors
    */
    changeColors()
    {
        for(let i = 0; i < this.titleColors.length; i++)
        {
            this.titleColors[i]++;
            if(this.titleColors[i] == 7)
                this.titleColors[i] = 0;
        }
    }

    /*
    * checks to see if the mouse is touching the buttons
    */
    collide(button)
    {
        if(mousePositionX > this.startX && mousePositionX < this.startX + this.width)
        {
            if(mousePositionY >this.startY && mousePositionY < this.startY + this.height && button == 'start')
                return true;
            else if(mousePositionY >this.scoreY && mousePositionY < this.scoreY + this.height && button == 'scores')
                return true;
            else
                return false;
        }
    }

    /*
    * the state's enter function - instantiates parameters passed from other states and manages 
    * asynchronous tasks
    */
    enter(params){
        var me = this;
        this.interval = setInterval(function(){
            me.changeColors();
        }, 300);
    }

    set(value)
    {
        this.opacity = value;
    }

    /*
    * called upon detecting a click - changes the game state if mouse is touching buttons when clicked
    */
    click()
    {
        let me = this;
        if(this.collide('start'))
        {
            setTimeout(() => {
                gStateMachine.change('play', {opacity: this.opacity});
                clearInterval(me.interval);
            }, 500);
            window.requestAnimationFrame(function() {
                Timer.tween(me.opacity, 1, .5, me);
            });

        }
        else if(this.collide('scores'))
        {
            //gStateMachine.change('scores');
        }
    }

    /*
    * updates the start state and manages buttons on screen - called every frame
    */
    update()
    {
        if(isMouseDown)
            this.mouseFlag = true;
        else if(!isMouseDown && this.mouseFlag){
            this.click();
            this.mouseFlag = false;
        }    
        
        if(this.collide('start'))
            this.startHover = true;
        else 
            this.startHover = false;
        if(this.collide('scores'))
            this.scoresHover = true;
        else
            this.scoresHover = false;

        if(keys && keys[27])
            window.close();
        if(keys && keys[82])
            location.reload();
    }

    /*
    * renders the start page
    */
    render()
    {   
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.fillRect(WINDOW_WIDTH/4, WINDOW_HEIGHT/5, WINDOW_WIDTH/2, WINDOW_HEIGHT/5);

        ctx.textAlign = 'left';
        ctx.font = gFonts.large;
        for(let i = 0; i < this.titleColors.length; i++)
        {   
            ctx.fillStyle = this.colors[this.titleColors[i]];
            ctx.fillText(this.title.charAt(i), 
            WINDOW_WIDTH/4 + (this.spaces[i] + 16)*SCALE_FACTOR_WIDTH, WINDOW_HEIGHT/3);

        }
        if(!this.startHover)
            ctx.drawImage(gTextures.start,this.startX, this.startY, this.width, this.height);
        else
            ctx.drawImage(gTextures.start2,this.startX, this.startY, this.width, this.height);
        if(!this.scoresHover)
            ctx.drawImage(gTextures.start,this.scoreX, this.scoreY, this.width, this.height);
        else
            ctx.drawImage(gTextures.start2,this.scoreX, this.scoreY, this.width, this.height);

        ctx.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            
    }

}