class PlayState{

    constructor()
    {
        this.isSelected = false;
        this.timer = 180;
        this.over = false;
    }

    enter(params)
    {
        this.opacity = params.opacity;
        let me = this;
        window.requestAnimationFrame(function() {
            Timer.tween(me.opacity, 0, .5, me, "opacity");
            Timer.tween(me.timer, 0, 180, me, "timer");
        });
        //startSound.pause();
        gSounds.main.play();
    }

    set(value, name)
    {
        if(name == 'opacity')
            this.opacity = value;
        else if(name == 'timer')
            this.timer = value;
    }

    collide(tile)
    {
        if(mousePositionX > tile.x*SCALE_FACTOR_WIDTH &&
             mousePositionX < tile.x*SCALE_FACTOR_WIDTH + tile.width*SCALE_FACTOR_WIDTH && !tile.isStarter)
        {
            if(mousePositionY > tile.y*SCALE_FACTOR_HEIGHT &&
                 mousePositionY < tile.y*SCALE_FACTOR_HEIGHT + 25*SCALE_FACTOR_HEIGHT){
                return true;
            }
        }
        return false;
    }

    gameEnd()
    {   
        if(this.over)
            return;
        if(Board.tiles.length > 9 || this.timer<1){
            if(this.timer<1 || Board.tiles[9].length > 0){
                this.over = true;
                let me = this;
                setTimeout(() => {
                    gStateMachine.change('game_over', {opacity: this.opacity, score: Board.score});
                }, 500);
                window.requestAnimationFrame(function() {
                    Timer.tween(me.opacity, 1, .5, me, "opacity");
                });
            }
        }
    }

    update()
    {
        if(isMouseDown && !this.isSelected && Board.noneFalling() && Board.noneRising())
        {
            for(let i = 0; i < Board.tiles.length; i++)
            {
                for(let j = 0; j < Board.tiles[i].length; j++)
                {
                    if(this.collide(Board.tiles[i][j])){
                        Board.tiles[i][j].startPos = Board.tiles[i][j].x;
                        Board.tiles[i][j].selected = true;
                        this.isSelected = true;
                    }
                    else
                        Board.tiles[i][j].selected = false;
                }
            }
        }

        if(!isMouseDown && this.isSelected)
        {
            this.isSelected = false;
            Board.cooldown = 1;
            Board.deselectAll();
            setTimeout(() => {
                Board.rowNeeded = true;
            }, 17);
            
        }
        Board.update();
        this.gameEnd();
        if(this.timer==5||this.timer==4||this.timer==3||this.timer==2||this.timer==1){
            gSounds.tick.load();
            let temp = document.createElement("AUDIO");
            temp.src = gSounds.tick.src;
            temp.play();
        }

        if(keys && keys[27])
            window.close();
        if(keys && keys[82])
            location.reload();
    }

    render()
    {
        Board.render();

        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.fillRect(35*SCALE_FACTOR_WIDTH, 50*SCALE_FACTOR_HEIGHT,
            150*SCALE_FACTOR_WIDTH, 150*SCALE_FACTOR_HEIGHT);

        ctx.textAlign = 'left';
        ctx.font = gFonts.small;
        ctx.fillStyle = 'darkcyan';
        ctx.fillText('Time remaining: '+Math.floor(this.timer/60)+':'+Math.floor(this.timer%60), 40*SCALE_FACTOR_WIDTH, 75*SCALE_FACTOR_HEIGHT);

        ctx.fillText('Score: ' + Board.score, 40*SCALE_FACTOR_WIDTH, 100*SCALE_FACTOR_HEIGHT);

        ctx.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }
}