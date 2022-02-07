class Tile{

    constructor(length, indexX, indexY)
    {
        this.length = length;
        this.indexX = indexX;
        this.indexY = indexY;
        this.width = 25*this.length;
        this.x = this.indexX * 25 + 205;
        this.y = (8-this.indexY) * 25 + 21;
        this.color = randInt(4, 16);
        this.shape;
        this.type = this.length*108 - 108;
        this.selected = false;
        this.startPos;
        this.isFalling = false;
        this.isRising = false;
        this.isStarter = true;
    }

    calculateMax()
    {
        this.maxRight = 7;
        this.maxLeft = 0;
        if(!this.isRising)
        this.indexY = 8 - Math.round((this.y - 21)/25);
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

    set(value)
    {
        this.y = value;
        this.isFalling = false;
        this.isRising = true;
    }

    collides(tile)
    {
        if(tile != this)
        {
            if(this.x >= tile.x + tile.width || this.x + this.width <= tile.x)
                return false;
            if(this.y + 26 <= tile.y || tile.y + 26 <= this.y)
                return false;
            return true;
        }
        return false;
    }

    update()
    {

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

        }
        else
        {
            this.indexX = Math.round((this.x - 205)/25);
            this.x = this.indexX * 25 + 205;
            if(this.y >= 196){
                this.isFalling = false;
                if(this.y >= 221)
                    this.y = 221;
            }
            else if(this.indexY == 0)
                this.isFalling = false;
            else
                this.isFalling = true;
            
            for(let i = 0; i < Board.tiles.length; i++)
                for(let j = 0; j < Board.tiles[i].length; j++)
                    if(this.collides(Board.tiles[i][j]) && this.y < Board.tiles[i][j].y){
                        this.y = Board.tiles[i][j].y - 25;
                        this.isFalling = false;
                    }
            if(this.isFalling && Board.noneSelected() && this.indexY != 0){
                this.y+= Math.min(3, 196 - this.y);
                this.indexY = 8 - Math.round((this.y - 21)/25);
            }
            
        }
        if(!this.isFalling && !this.isRising)
            this.calculateMax();
        if(this.indexY >= 1)
            this.isStarter = false;            
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
        if(this.isStarter)
            gFrames.blocks[17*6 + this.type].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT, 
                this.width, Math.min((226-this.y), 25));
        else
            gFrames.blocks[this.color*6 + this.type].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
        

    }
}