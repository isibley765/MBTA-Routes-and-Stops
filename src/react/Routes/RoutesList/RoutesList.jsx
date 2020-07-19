import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './RoutesList.css';

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
        return this.props.routes.map((route) => {
            return (
                <div key={route.id}>
                    <p>id: {route.id}</p>
                    <p>name: {route.long_name}</p>
                    <p>destinations: {route.direction_destinations}</p>
                </div>
            );
        });
    }

    setFilter(e) {
        this.setState({
            'filter': !this.state.filter
        });
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