class StartState{

constructor()
{

}

enter(params)
{

}

update()
{
    if(keys && keys[27])
        window.close();
    if(keys && keys[82])
        location.reload();
}
render()
{

}

}