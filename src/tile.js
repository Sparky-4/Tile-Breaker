class Tile{

    constructor(length, indexX, indexY)
    {
        this.length = length;
        this.indexX = indexX;
        this.indexY = indexY;
        this.width = 25*this.length;
        this.x = this.indexX * 25 + 205;
        this.y = (7-this.indexY) * 25 + 21;
        this.color = randInt(4, 16);
        this.shape;
        this.type = this.length*108 - 108;
        this.selected = false;
        this.startPos;
    }

    calculateMax()
    {
        this.maxRight = 7;
        this.maxLeft = 0;
        for(let i = 0; i < Board.tiles[this.indexY].length; i++)
        {
            let tile = Board.tiles[this.indexY][i]
            if(tile.indexX != this.indexX)
            {
                if(tile.indexX - this.length < this.maxRight && tile.indexX > this.indexX)
                    this.maxRight = tile.indexX - this.length;
                if(tile.indexX < this.indexX && tile.indexX+tile.length > this.maxLeft)
                    this.maxLeft = tile.indexX + tile.length;
            }
        }
    }

    update()
    {
        this.calculateMax();
        if(this.selected)
        {
            this.x = (mousePositionX - mouseStartX)/SCALE_FACTOR_WIDTH + this.startPos;
            if(this.x < 205)
                this.x = 205;
            if(this.x + this.width > 405)
                this.x = 405 - this.width;
            if(Math.ceil((this.x - 205)/25) > this.maxRight)
                this.x = this.maxRight* 25 + 205;
            if(Math.floor((this.x - 205)/25) < this.maxLeft)
                this.x = this.maxLeft* 25 + 205;
            console.log(this.maxLeft, this.maxRight, Board.tiles[this.indexY])
        }
        else
        {
            this.indexX = Math.round((this.x - 205)/25);
            this.x = this.indexX * 25 + 205;
        }
    }

    render()
    {
        if(this.selected)
        {
            gFrames.blocks[this.type+1].draw((this.x-2)*SCALE_FACTOR_WIDTH, (this.y-2)*SCALE_FACTOR_HEIGHT,
                this.width + 4, 29);
            ctx.fillStyle = 'rgba(255,255,255,.5)';
            ctx.fillRect((Math.round((this.x - 205)/25)* 25 + 205)*SCALE_FACTOR_WIDTH, Board.y*SCALE_FACTOR_HEIGHT,
                this.width*SCALE_FACTOR_WIDTH, 205*SCALE_FACTOR_HEIGHT);
        }
        gFrames.blocks[this.color*6 + this.type].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
        

    }
}