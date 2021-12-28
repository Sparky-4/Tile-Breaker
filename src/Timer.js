class Timer{

    constructor()
    {
        this.counter = 0;
        this.time = 0;
        this.tweens = [];

        this.update();
    }

    tween(value, end, time, object, name)
    {
        this.tweens.push(new Tween(value, end, time, object, name));
    }

    update()
    {
        this.counter++;
        this.time = this.counter/60;

        for(let i = 0; i < this.tweens.length; i++)
            if(this.tweens[i].ratio < 1)
                this.tweens[i].update();
    }
}