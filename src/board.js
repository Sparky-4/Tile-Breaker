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
        console.log(this.board, this.tiles);

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
                        tempArray.push(new Tile(tileLength, tilePosition, this.board.length))
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
        this.board.push(tempRow);
        this.tiles.push(tempArray);
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

    update()
    {
        for(let i = 0; i < this.tiles.length; i++)
        {
            for(let j = 0; j < this.tiles[i].length; j++)
            {
                this.tiles[i][j].update();
            }
        }
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