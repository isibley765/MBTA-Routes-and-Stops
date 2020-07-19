import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import { render } from 'react-dom';

import styles from './Main.css';

import Welcome from '../Welcome/Welcome.jsx';
import Titlebar from '../Titlebar/Titlebar.jsx';
import RoutesList from '../Routes/RoutesList/RoutesList.jsx';

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

    componentDidMount() {
        console.log("Main mounting complete");

        // TODO: Remove when dev complete, just skipping Welcome screen
        this.getRoutes();
    }

    render() {
        return (
            <Container className={styles.container} fluid={true}>
                <Titlebar title={this.state.title} />
                { this.state.routes ?
                    <Row className={styles.body}>
                        <RoutesList
                            shape={{size: 3, offset: 1}}
                            routes={this.state.routes}
                            routeSelected={this.state.routeSelected}
                            filterBy={this.state.filter}
                            getRoutes={this.getRoutes}
                            getRouteStops={this.getRouteStops}
                        />
                    </Row>
                : // else, if routes are null, show Welcome startup screen
                    <Welcome getRoutes={this.getRoutes} />
                }
            </Container>
        );
    }
}

render(<Main />, document.getElementById('app'));