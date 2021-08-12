import React, { useState } from 'react'
import './SideBar.css';
import {
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Grid,
  Button
} from '@material-ui/core'
import Axios from 'axios';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined';
import dice1 from './assets/dice1.jpg'
import dice2 from './assets/dice2.jpg'
import dice3 from './assets/dice3.jpg'
import dice4 from './assets/dice4.jpg'
import dice5 from './assets/dice5.jpg'
import dice6 from './assets/dice6.jpg'
import successSound from './sounds/success-sound.mp3'
import failSound from './sounds/fail-sound.mp3'


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#023047'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBarContainer: {
    marginBottom: '60px'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  dice: {
    paddingLeft: "30%",
    width: "100px",
    hieght:"100px"
  },
  rollButton: {
    backgroundColor: "#e67f00",
    marginLeft: "25px",
    marginTop: "35%",
    "&:hover": {
      background: "#c97004"
    }
  },
  panToll: {
    width:"55px",
    hieght:"55px",
    marginLeft: "50px"
  },
  mapText: {
    fontSize: "10px",
    [theme.breakpoints.down('sm')]: {
      marginLeft: '70px',
    },
  }
}))

const dices = [dice1, dice2, dice3, dice4, dice5, dice6]

const SideBar = props => {

  const { number, setNumber,
    game, setGame, screen, setScreen,
    setMessage, setMessageType, openMessage } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false);
  const successAudio = new Audio(successSound);
  const failAudio = new Audio(failSound);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const makeAlert = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
    openMessage()
  }

  const serverRequest = (data) =>{
        Axios.post('http://localhost:4000/log', {action: data})
  }

  const diceRoll = async () => {
    mobileOpen && handleDrawerToggle()
    const cubeNumber = Math.floor(Math.random() * 6) + 1
    setGame(false)
    setNumber(cubeNumber)
    if(cubeNumber === 1){
        failAudio.play()
        makeAlert("stayed at the same place, Game over!" , 'error')
        serverRequest("player rolled 1 and Game over")
    }
    if(cubeNumber === 2){
        if(Math.floor(Math.random() * 2) === 0){
            failAudio.play()
            makeAlert("drank spoiled rom, Game over!" , 'error')
            serverRequest("player rolled 2, drank spoiled rom and Game over")
        }else{
            successAudio.play()
            makeAlert("drank Good rom, You Win!" , 'success')
            serverRequest("player rolled 2, drank good rom and won the game")
        }
    }
    if(cubeNumber === 3){
        failAudio.play()
        makeAlert("met the dragon, Game over!" , 'error')
        serverRequest("player rolled 3, and met the dragon, Game over")
    }
    if(cubeNumber === 4){
        successAudio.play()
        makeAlert("found the treasure, You Win!" , 'success')
        serverRequest("player rolled 4, found the treasure and won the game")
    }
    if(cubeNumber === 5){
        successAudio.play()
        const response = await Axios.get('http://localhost:4000/sentence')
        makeAlert(response.data[0].sentence , 'info')
        serverRequest("player rolled 5, found the bottel and got a sentence")
    }
    if(cubeNumber === 6){
        successAudio.play()
        makeAlert("made it to land, You Win!" , 'success')
        serverRequest("player rolled 6, made it to land and won the game")
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
      <Link to="/"
          onClick={()=> {
            setScreen(screen === "full" ? "part" : "full")
            mobileOpen && handleDrawerToggle()
          }}
          className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PanToolOutlinedIcon className={classes.panToll} />
            </ListItemIcon>
          </ListItem>
            <span className={classes.mapText}>
                {screen === "part" ? 'Browse Map' : 'Small Map'}
              </span>
        </Link>

          <ListItem>
              <Button
              className={classes.rollButton}
              disabled={!game}
              onClick={diceRoll}
              variant="contained"
              >Roll Dice</Button>
          </ListItem>

          <ListItem>
              <img alt="" className={classes.dice} src={dices[number-1]} />
          </ListItem>

      </List>
      <Divider />
      <List>
        <Link to='/home/settings'
            onClick={() => localStorage.setItem('currentRoute', '/home/settings')}
            className={classes.link}>
                <ListItem button key='Settings'>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Settings'/>
                </ListItem>
          </Link>
        </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid className={classes.appBarContainer} >
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.tool}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
      </Grid>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

export default SideBar