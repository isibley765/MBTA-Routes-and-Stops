import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import { render } from 'react-dom';

import styles from './Main.css';

import Welcome from '../Welcome/Welcome.jsx';
import Titlebar from '../Titlebar/Titlebar.jsx';

const { ipcRenderer } = window.require('electron');

class Main extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: "MTBA Lines & Stops",
            routes: null,
            selected: null,
            routeStops: null,
            filter: "line"
        }

        this.getRoutes = this.getRoutes.bind(this);
        this.renderRoutes = this.renderRoutes.bind(this);
    }

    getRoutes() {
        // console.log("Requesting routes");
        this.setState({'routes': [], 'routeStops': null}, () => {
            ipcRenderer.send('routes-request', null);
    
            ipcRenderer.once('routes-reply', (event, data) => {
                if (data.err) {
                    console.log("Problem fetching routes");
                } else {
                    let routes = data.res;
                    let filteredRoutes = [];
                    for (var i = 0; i < routes.length; i++) {
                        let route = routes[i];
                        let filtRoute = {
                            id: route.id,
                            long_name: route.attributes.long_name,
                            direction_destinations: route.attributes.direction_destinations
                        };
                        filteredRoutes.push(filtRoute);
                    }
                    this.setState({
                        'routes': filteredRoutes,
                        'routeStops': null,
                        'routeSelected': null
                    });
                }
            });
        });
    }

    renderRoutes() {
        return this.state.routes.map((route) => {
            return (
                <div>
                    <p>id: {route.id}</p>
                    <p>name: {route.long_name}</p>
                    <p>destinations: {route.direction_destinations}</p>
                </div>
            );
        });
    }

    componentDidMount() {
        console.log("Main mounting complete");
    }

    render() {
        return (
            <Container className={styles.container} fluid={true}>
                <Titlebar title={this.state.title} />
                { this.state.routes ? 
                    this.renderRoutes()
                    : // else, if routes are null, show Welcome startup screen
                    <Welcome getRoutes={this.getRoutes} />
                }
            </Container>
        );
    }
}

render(<Main />, document.getElementById('app'));