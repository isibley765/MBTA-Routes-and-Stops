import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './RoutesList.css';
import RoutesListItem from '../RoutesListItem/RoutesListItem.jsx';

export default class RoutesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            COMPONENT_NAME: "RoutesList",
            filter: false
        }

        this.setFilter = this.setFilter.bind(this);
        this.renderRoutes = this.renderRoutes.bind(this);
    }

    renderRoutes() {
        if (this.props.routes != null && 0 < this.props.routes.length) {
            let routes = this.props.routes;
            let containsSubstring = (string1, string2) => {
                return string1.toLowerCase().includes(string2.toLowerCase())
            }

            return routes.map((route) => {
                if (!this.state.filter || containsSubstring(route.long_name, this.props.filterBy)) {
                    return (
                        <RoutesListItem 
                            key={route.id}
                            id={route.id}
                            selected={this.props.routeSelected == route.id}
                            name={route.long_name}
                            getRouteStops={this.props.getRouteStops}
                            destinations={route.direction_destinations}
                        />
                    );
                }
            });

        } else {
            /* 
                don't want to insert text too quick to see
                also don't want to force a wait time to see said text
                Just go blank for now
            */
            return;
        }
    }

    setFilter(e) {
        this.setState({
            'filter': !this.state.filter
        });

        this.props.getRoutes();
    }

    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(this.state.COMPONENT_NAME + " mounted!");
        }
    }

    render() {
        return (
            <Col className={styles.container} sm={this.props.shape}>
                <Row className={styles.filterRow}>
                    <Col sm={{size: 6}} className={styles.routesTitle}>
                        <h3>Routes:</h3>
                    </Col>
                    <Col sm={{size: 1}}>
                        <input type="checkbox"
                            onChange={this.setFilter}
                            checked={this.state.filter}
                        />
                    </Col>
                    <Col sm={{size: 5}}>
                        <span>Filter only Line Routes?</span>
                    </Col>
                    <Col sm={{size: 12}}>
                        <button onClick={this.props.getRoutes}>Refresh Routes</button>
                    </Col>
                    <br/>
                    <br/>
                </Row>
                
                <Row className={styles.routeListings}>
                    {this.renderRoutes()}
                </Row>
            </Col>
        );
    }
}