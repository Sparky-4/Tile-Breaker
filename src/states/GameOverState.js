class GameOverState{
    constructor()
    {
    }

    enter(params)
    {
        this.opacity = params.opacity;
        this.score = params.score;
        let me = this;
        window.requestAnimationFrame(function() {
            Timer.tween(me.opacity, 0, .5, me, "opacity");
        });
    }

    set(value, name)
    {
        if(name == 'opacity')
            this.opacity = value;
        else if(name == 'timer')
            this.timer = value;
    }


    update()
    {
        if(keys && keys[27])
            window.close();
        if(keys && keys[13])
            location.reload();
    }

    render()
    {
        ctx.fillStyle = "white";
        ctx.textAlign = 'center';
        ctx.font = gFonts.large;
        ctx.fillText("Game Over", WINDOW_WIDTH/2, WINDOW_HEIGHT/5);
        ctx.font = gFonts.medium;
        ctx.fillStyle = "teal";
        ctx.fillText("Score: " + this.score,  WINDOW_WIDTH/2, WINDOW_HEIGHT/3);
        ctx.fillText("Press Enter",  WINDOW_WIDTH/2, WINDOW_HEIGHT/2);

        ctx.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }
}