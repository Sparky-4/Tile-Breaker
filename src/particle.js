class Particle {
	
	constructor(x, y, accelerationX, accelerationY, lifetime, color)
	{
		this.x = x;
		this.y = y;
		this.accelerationX = accelerationX;
		this.accelerationY = accelerationY;
		this.lifetime = lifetime;
		this.color = color;
		this.isIn = true;
		this.counter = this.lifetime * fps;
		this.dx = 0;
		this.dy = 0;
	}
	
	update()
	{
		if(this.isIn)
		{
			this.draw();
			this.dx += this.accelerationX;
			this.dy += this.accelerationY;
			this.x += this.dx;
			this.y += this.dy;
			this.counter--;
			
			if(this.counter <= 0)
				this.isIn = false;
		}
	}
	
	draw()
	{
		ctx.fillStyle = "rgba(" + this.color[0] +"," + this.color[1] + "," + this.color[2] + "," + Math.min(this.counter/20, .2) + ")";
		ctx.beginPath();
		ctx.arc(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT, WINDOW_WIDTH/200, 0, 2 * Math.PI);
		ctx.fill();
	}
}