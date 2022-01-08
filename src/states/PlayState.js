class PlayState{

    constructor()
    {
        this.isSelected = false;
    }

    enter(params)
    {
        this.opacity = params.opacity;
        let me = this;
        window.requestAnimationFrame(function() {
            Timer.tween(me.opacity, 0, .5, me);
        });
    }

    set(value)
    {
        this.opacity = value;
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
        if(Board.tiles.length > 9){
            if(Board.tiles[9].length > 0)
                gStateMachine.change('start');
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

        if(this.gameEnd())

        if(keys && keys[27])
            window.close();
        if(keys && keys[82])
            location.reload();
    }

    render()
    {
        Board.render();

        ctx.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }
}