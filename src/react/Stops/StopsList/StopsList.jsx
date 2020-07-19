import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './StopsList.css';

import StopsListItem from '../StopsListItem/StopsListItem.jsx'

export default class StopsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            COMPONENT_NAME: "StopsList",
        }
    }

    renderStops() {
        if (this.props.stops == null) {
            return (
                <Col sm={{size: 10, offset: 1}}>Click on a Route to list its stops</Col>
            );
        } else if (0 == this.props.stops.length) {
            return (
                <Col sm={{size: 10, offset: 1}}>Stops not found for this route... try again later</Col>
            );
        }

        return this.props.stops.map((stop) => {
            return (
                <StopsListItem
                    key={stop.id}
                    name={stop.name}
                    address={stop.address}
                />
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
            <Col sm={this.props.shape} className={styles.container}>
                <Row className={styles.stopsTitle}>
                    <h3>Stops:</h3>
                </Row>
                {this.renderStops()}
            </Col>
        );
    }
}