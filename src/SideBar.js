import React, { Fragment, useState, useEffect } from 'react'
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
  Typography,
  Grid,
  Avatar
} from '@material-ui/core'
import Axios from 'axios';
import {
  Home as HomeIcon,
  Event as EventIcon,
  Menu as MenuIcon,
  TrendingUp as TrendingUpIcon,
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
  Chat,
  Info as InfoIcon
} from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import MapIcon from '@material-ui/icons/Map';
import CasinoIcon from '@material-ui/icons/Casino';
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
  }
}))

const dices = [dice1, dice2, dice3, dice4, dice5, dice6]

const SideBar = props => {

  const { window, handleLogout, number,
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

//   useEffect(() => {
//     const fetchPicsFromDB = async () => {
//         const response = await Axios.get('http://localhost:4000/log')
//         console.log(response.data);
//       }
//     fetchPicsFromDB()
// }, [])


  const diceRoll = () => {
    mobileOpen === true && handleDrawerToggle()
    const cubeNumber = Math.floor(Math.random() * 6) + 1
    const response = Axios.post('http://localhost:4000/log', {action: "player rolled " + cubeNumber})
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
        makeAlert("Funny sentence" , 'info')
    }
    if(cubeNumber === 6){
        makeAlert("Youve made it to land, You Win!" , 'success')
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <Link to='/home/profile'
          onClick={diceRoll}
          className={classes.link}>
          <ListItem button key='img'>
            <ListItemIcon>
              <CasinoIcon />
            </ListItemIcon>
            <ListItemText primary='Roll The Dice' />
          </ListItem>
        </Link>
        <Link to='/home/properties'
          onClick={()=> setScreen(screen === "full" ? "part" : "full")}
          className={classes.link}>
          <ListItem button key='Home'>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={screen === "part" ? 'Browse Map' : 'Go Back'} />
          </ListItem>
        </Link>
        <Link to='/home/calendar'
          onClick={() => localStorage.setItem('currentRoute', '/home/calendar')}
          className={classes.link}>
          <ListItem button key='Calendar'>
            <ListItemIcon>
              <img style={{width: "20px", hieght: "20px"}} src={dices[number-1]} />
            </ListItemIcon>
            <ListItemText primary={number} />
          </ListItem>
        </Link>

        <Link to='/home/chat'
          onClick={() => localStorage.setItem('currentRoute', '/home/chat')}
          className={classes.link}>
          <ListItem button key='Chat'>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary='Chat' />
          </ListItem>
        </Link>
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
          <Link to='/home/aboutus'
            onClick={() => localStorage.setItem('currentRoute', '/home/aboutus')}
            className={classes.link}>
                <ListItem button key='About'>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary='About Us'/>
                </ListItem>
          </Link>
            <ListItem button key={'Log Out'} onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'Log Out'} />
            </ListItem>
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
            <div className={classes.mainAppBar}>
              {/* <img src={logo} className={classes.logo} /> */}
              <Typography variant="h6" noWrap className={classes.welcoming}>
                {/* {`Welcome, ${user.firstName}`} */}
              </Typography>
            </div>
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