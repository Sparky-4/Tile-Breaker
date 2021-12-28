class Quad{
	
	constructor(imgX, imgY, quadWidth, quadHeight, img, vWidth, vHeight)
	{
		this.x = imgX;
		this.y = imgY;
		this.width = quadWidth;
		this.height = quadHeight;
		this.img = img;
		this.vWidth = vWidth;
		this.vHeight = vHeight;
	}
	
	draw(x, y, width, height)
	{
		if(width && height)
		ctx.drawImage(this.img, 
						this.x, this.y, this.width, this.height, 
						x, y, width*SCALE_FACTOR_WIDTH, height*SCALE_FACTOR_HEIGHT);
		else 
		ctx.drawImage(this.img, 
						this.x, this.y, this.width, this.height, 
						x, y, this.vWidth*SCALE_FACTOR_WIDTH || this.width*SCALE_FACTOR_WIDTH
						, this.vHeight*SCALE_FACTOR_HEIGHT || this.height*SCALE_FACTOR_HEIGHT);
	}
}