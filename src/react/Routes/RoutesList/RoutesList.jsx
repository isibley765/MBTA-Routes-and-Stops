import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './RoutesList.css';

export default class RoutesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            COMPONENT_NAME: "RoutesList",
        }

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

    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(this.state.COMPONENT_NAME + " mounted!");
        }
    }

    render() {
        return (
            <div>{this.renderRoutes()}</div>
        );
    }
}