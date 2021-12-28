class Tween{

    constructor(value, endValue, endTime, object, name)
    {
        this.value = value;
        this.endValue = endValue;
        this.endTime = endTime;
        this.object = object;
        this.name = name;
        this.ratio = 0;
        this.startTime = Timer.time;
        this.startValue = this.value;
    }

    update()
    {
        this.ratio = (Timer.time-this.startTime)/this.endTime;
        if(this.endValue > this.value)
            this.value = this.endValue*this.ratio;
        else
            this.value = this.startValue - (this.startValue - this.endValue)*this.ratio;
        this.object.set(this.value);
    }


}