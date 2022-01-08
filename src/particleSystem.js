class ParticleSystem{
	
	constructor(max, x, y)
	{
		this.paricleMax = max;
		this.lifetimeMin = 1;
		this.lifetimeMax = 1;
		this.accelerationMinX = 0;
		this.accelerationMaxX = 0;
		this.accelerationMinY = 0;
		this.accelerationMaxY = 0;
		this.areaSpreadX = 10;
		this.areaSpreadY = 10;
		this.num = max;
		this.particles = [];
		this.originX = x;
		this.originY = y;
		this.color = [];
	}
	
	setLifetime(min, max)
	{
		this.lifetimeMin = min;
		this.lifetimeMax = max;
	}
	
	setAcceleration(minX, maxX, minY, maxY)
	{
		this.accelerationMinX = minX;
		this.accelerationMaxX = maxX;
		this.accelerationMinY = minY;
		this.accelerationMaxY = maxY;
	}
	
	setAreaSpread(spreadX, spreadY)
	{
		this.areaSpreadX = spreadX;
		this.areaSpreadY = spreadY;
	}
	
	setColor(colorArray)
	{
		this.color = colorArray;
	}
	
	createParticles(num)
	{
		this.particles = [];
		for (let i = 0; i < this.num; i++)
		{
			this.particles.push(new Particle(
				this.originX + (Math.random() * this.areaSpreadX - this.areaSpreadX/2),
				this.originY + (Math.random() * this.areaSpreadY - this.areaSpreadY/2),
				Math.random() * (this.accelerationMaxX-this.accelerationMinX) + this.accelerationMinX,
				Math.random() * (this.accelerationMaxY-this.accelerationMinY) + this.accelerationMinY,
				Math.random() * (this.lifetimeMax-this.lifetimeMin) + this.lifetimeMin,
				this.color,
			))
		}
	}
	
	updateParticles()
	{	
		for(let i = 0; i < this.particles.length; i++)
			this.particles[i].update();
	
	}
}