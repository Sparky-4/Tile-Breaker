/*Generating quads given an atlas and a width and height for the tile by adding
 *a quad in an array for each quad in the atlas
 */
function GenerateQuads(atlas, tileWidth, tileHeight, vWidth, vHeight)
{
	let sheetWidth = atlas.width;
	let sheetHeight = atlas.height;
	
	let sheetCounter = 0;
	let spriteSheet = [];
	
	for(let y = 0; y < sheetHeight; y+=tileHeight)
	{
		for(let x = 0; x < sheetWidth; x+= tileWidth)
		{
			spriteSheet[sheetCounter] = new Quad(x, y,
			tileWidth, tileHeight, atlas, vWidth, vHeight);
			sheetCounter++;
		}
	}
	return spriteSheet;
}

/*
*Generate multi-tile blocks using the GenerateQuads function and adjust their width and height 
*/
function GenerateBlocks(atlas)
{
	var multiBlocks = [];

    for(let i = 0; i < 4; i++)
    {
        var blocks = GenerateQuads(atlas, 32, 32, 25*(i+1), 25);
		for(let j = 0; j < blocks.length; j++)
			multiBlocks.push(blocks[j]);
    }

    return multiBlocks;

}

