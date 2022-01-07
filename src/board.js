class Board{

    constructor()
    {
        this.tiles = [];
        this.board = [];
        this.addRow();
        this.x = 200;
        this.y = 16;
        this.width = 210;
        this.height = 210;
        this.cooldown = 20;
        this.rowNeeded = false;
    }

    addRow()
    {
        let percent = randInt(1,100);
        let numSpaces;
        if(percent < 10)
            numSpaces = 4;
        else if(percent < 30)
            numSpaces = 5;
        else if(percent < 65)
            numSpaces = 6;
        else 
            numSpaces = 7;
        let numTiles = randInt(Math.ceil(numSpaces/4), numSpaces-1)
        let tempTiles = numTiles;
        let tempArray = []
        let tempRow = [0,0,0,0,0,0,0,0];
        //this.updateTiles();
        this.updateIndex();        

        for(let i = 0; i < numTiles; i++)
        {
            let tileLength = randInt(Math.floor(numSpaces/tempTiles), Math.ceil(numSpaces/tempTiles));
            tempTiles--;
            if(tileLength <= 0)
                tileLength = 1;
            if(this.checkRow(tileLength, tempRow))
            {
                let possibleIndex = [];
                for(let x = 0; x < (9-tileLength); x++)
                    possibleIndex[x] = x;
                let isIn = false;
                while(!isIn)
                {
                    let tilePosition = possibleIndex[randInt(0, possibleIndex.length - 1)];
                    if(this.canFit(tilePosition, tileLength, tempRow))
                    {
                        tempArray.push(new Tile(tileLength, tilePosition, 0))
                        isIn = true;
                        numSpaces -= tileLength;
                        for(let j = 0; j < tileLength; j++)
                            tempRow[tilePosition+j] = 1;
                    }
                    else{
                        possibleIndex.splice(possibleIndex.indexOf(tilePosition), 1);
                    }
                }
            }
        }
        this.board.unshift(tempRow);
        this.tiles.unshift(tempArray);
        //this.updateTiles();
        //console.log(this.tiles)
    }

    updateIndex()
    {   
        for(let i = 0; i < this.tiles.length; i++)
        {
            for(let j = 0; j < this.tiles[i].length; j++)
            {   
                let tile = this.tiles[i][j];
                this.tiles[i][j].indexY = tile.indexY + 1;
                let index = tile.indexY;
                window.requestAnimationFrame(function() { 
                    Timer.tween(tile.y, (8-index) * 25 + 21, .5, tile);
                });
            }     
        }

        let me = this;
        setTimeout(() => {
            me.stopRising(me);
        }, 550);
        
    }

    stopRising(me)
    {
        for(let i = 0; i < me.tiles.length; i++)
            for(let j = 0; j < me.tiles[i].length; j++)
                me.tiles[i][j].isRising = false;
    }

    set(value)
    {

    }

    updateTiles()
    {
        let newTiles = [];
        for(let i = 0; i < this.tiles.length; i++)
        {
            newTiles.push([]);
        }
        for(let i = 0; i < this.tiles.length; i++)
        {
            for(let j = 0; j < this.tiles[i].length; j++)
            {
                let tile = this.tiles[i][j];
                newTiles[tile.indexY].push(tile);  
            }
        }
        this.tiles = newTiles;
        // if(!this.allCorrect)
        //     this.updateTiles();
    }

    checkRow(length, arr)
    {
        for(let i = 0; i < arr.length-length+1; i++)
        {
            let flag = true;
            for(let j = 0; j < length; j++)
            {
                if(arr[i+j] == 1)
                    flag = false;
            }
            if(flag)
                return true;
        }
        return false;
    }

    canFit(pos, length, arr)
    {
        for(let j = 0; j < length; j++)
        {
            if(arr[pos+j] == 1)
                return false;
        }
        return true;
    }

    deselectAll()
    {
        for(let i = 0; i < this.tiles.length; i++)
        {
            for(let j = 0; j < this.tiles[i].length; j++)
            {
                this.tiles[i][j].selected = false;
            }
        }
    }

    noneFalling()
    {
        for(let i = 0; i < this.tiles.length; i++)
            for(let j = 0; j < this.tiles[i].length; j++)
                if(this.tiles[i][j].isFalling)
                    return false;
        return true
    }

    noneRising()
    {
        for(let i = 0; i < this.tiles.length; i++)
            for(let j = 0; j < this.tiles[i].length; j++)
                if(this.tiles[i][j].isRising)
                    return false;
        return true
    }

    noneSelected()
    {
        for(let i = 0; i < this.tiles.length; i++)
            for(let j = 0; j < this.tiles[i].length; j++)
                if(this.tiles[i][j].selected)
                    return false;
        return true
    }

    allCorrect()
    {
        for(let i = 0; i < this.tiles.length; i++)
            for(let j = 0; j < this.tiles[i].length; j++)
                if(this.tiles[i][j].indexY != i)
                    return false;
        return true
    }

    removeMatches()
    {
        for(let i = 0; i < this.tiles.length; i++)
        {
            let sum = 0;
            for(let j = 0; j < this.tiles[i].length; j++)
            {
                sum += this.tiles[i][j].length;
                if(sum == 8 && this.allCorrect()){
                    //console.log(this.tiles, i, this.allCorrect())
                    this.tiles[i] = [];
                    this.cooldown = 1;
                }
            }
            
        }
    }

    update()
    {

        if(this.tiles.length <= 1){
            this.addRow();
        }
        
        for(let i = 0; i < this.tiles.length; i++)
        {
            for(let j = 0; j < this.tiles[i].length; j++)
            {
                this.tiles[i][j].update();
            }
        }

        if(this.noneFalling() && this.noneRising() && this.cooldown == 0){
            //console.log(this.allCorrect())
            if(this.allCorrect()){
                this.removeMatches();
                if(this.rowNeeded && this.cooldown == 0){
                    this.addRow();
                    this.rowNeeded = false;
                }
                else if(this.tiles.length <=2)
                {
                    this.addRow();
                }
            }
            else
            {
                this.updateTiles();
                
            }
        }

        if(this.cooldown > 0)
            this.cooldown--
    }

    render()
    {
        ctx.fillStyle = 'rgba(0,0,0,.5)';
        ctx.fillRect(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT,
             this.width*SCALE_FACTOR_WIDTH, this.height*SCALE_FACTOR_HEIGHT);

        for(let i = 0; i < this.tiles.length; i++)
        {
            for(let j = 0; j < this.tiles[i].length; j++)
            {
                this.tiles[i][j].render();
            }
        }
    }
}