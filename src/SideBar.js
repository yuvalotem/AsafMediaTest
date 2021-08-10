import React, { useState, useEffect } from 'react'
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


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    height: '45px',
    [theme.breakpoints.up('md')]: {
      height: '60px',
    },
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
  mainAppBar: {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    alignItems: 'center',
    width: '100%'
  },
  welcoming: {
    fontFamily: "'Montserrat', sans-serif",
    justifySelf: 'end',
    alignSelf: 'end'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  dice: {
    paddingLeft: "30%",
    width: "100px",
    hieght:"100px"
  },
  rollButton: {
    backgroundColor: "orange"
  }
}))

const dices = [dice1, dice2, dice3, dice4, dice5, dice6]

const SideBar = props => {

  const { window, number,
    setNumber, screen, setScreen,
    setMessage, setMessageType, openMessage } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const makeAlert = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
    openMessage()
  }

  const diceRoll = async () => {
    mobileOpen && handleDrawerToggle()
    const cubeNumber = Math.floor(Math.random() * 6) + 1
    // const response = Axios.post('http://localhost:4000/log', {action: "player rolled " + cubeNumber})
    setNumber(cubeNumber)
    if(cubeNumber === 1){
        makeAlert("You stayed at the same place, Game over!" , 'error')
    }
    if(cubeNumber === 2){
        if(Math.floor(Math.random() * 2) == 0){
            makeAlert("You drank spoiled rom, Game over!" , 'error')
        }else{
            makeAlert("You drank Good rom, You Win!" , 'success')
        }
    }
    if(cubeNumber === 3){
        makeAlert("Dragon, Game over!" , 'error')
    }
    if(cubeNumber === 4){
        makeAlert("Treasure, You Win!" , 'success')
    }
    if(cubeNumber === 5){
        const response = await Axios.get('http://localhost:4000/sentence')
        makeAlert(response.data[0].sentence , 'info')
    }
    if(cubeNumber === 6){
        makeAlert("Youve made it to land, You Win!" , 'success')
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
          <ListItem button key='Home'>
            <ListItemIcon>
              <PanToolOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={screen === "part" ? 'Browse Map' : 'Go Back'} />
          </ListItem>
        </Link>


          <ListItem button key='img'>
              <Button onClick={diceRoll} variant="contained" color="secondary">Roll Dice</Button>
          </ListItem>

          <ListItem key='Calendar'>
              <img className={classes.dice} src={dices[number-1]} />
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid className={classes.appBarContainer} container>
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
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
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