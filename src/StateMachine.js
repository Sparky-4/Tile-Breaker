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
		else if(stateName == 'scores')
			this.current = this.states.scores;
		else if(stateName == 'game_over')
			this.current = this.states.game_over;
		else if(stateName == 'enter')
			this.current = this.states.enter;
		
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