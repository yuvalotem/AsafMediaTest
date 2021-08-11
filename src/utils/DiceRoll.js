export default async function diceRoll (){
    mobileOpen && handleDrawerToggle()
    const cubeNumber = Math.floor(Math.random() * 6) + 1
    // const response = Axios.post('http://localhost:4000/log', {action: "player rolled " + cubeNumber})
    setGame(false)
    setNumber(cubeNumber)
    if(cubeNumber === 1){
        makeAlert("stayed at the same place, Game over!" , 'error')
    }
    if(cubeNumber === 2){
        if(Math.floor(Math.random() * 2) == 0){
            makeAlert("drank spoiled rom, Game over!" , 'error')
        }else{
            makeAlert("drank Good rom, You Win!" , 'success')
        }
    }
    if(cubeNumber === 3){
        makeAlert("meet the dragon, Game over!" , 'error')
    }
    if(cubeNumber === 4){
        makeAlert("found the treasure, You Win!" , 'success')
    }
    if(cubeNumber === 5){
        const response = await Axios.get('http://localhost:4000/sentence')
        makeAlert(response.data[0].sentence , 'info')
    }
    if(cubeNumber === 6){
        makeAlert("made it to land, You Win!" , 'success')
    }
  }