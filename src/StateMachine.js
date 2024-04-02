class StateMachine{
	
	constructor(states)
	{
		this.states = states;
		this.current;
	}
	
	change(stateName, enterParams)
	{
		if(stateName == "start")
			this.current = this.states.start;
		else if(stateName == 'play')
			this.current = this.states.play;
		else if(stateName == 'game_over')
			this.current = this.states.game_over;
		
		this.current.enter(enterParams)
	}
	
	update()
	{
		this.current.update();	  
	}
	
	render()
	{
		this.current.render();
	}
}