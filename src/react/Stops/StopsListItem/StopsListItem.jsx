import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './StopsListItem.css';

const { shell } = window.require('electron');

export default class StopsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            COMPONENT_NAME: "StopsListItem",
        }

        this.openAddressInMaps = this.openAddressInMaps.bind(this);
    }

    openAddressInMaps() {
        shell.openExternal(`http://maps.google.com/?q=${this.props.address}`);
    }

    renderAddress() {
        if (this.props.address != null) {
            let address = this.props.address.split(',')[0];
            return (
                <span className={styles.openExternal}
                    onClick={this.openAddressInMaps}>
                        <u>{address}</u>
                </span>
            )
        } else {
            return "Not provided";
        }
    }

    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(this.state.COMPONENT_NAME + " mounted!");
        }
    }

    render() {
        return (
            <Row className={styles.container}>
                <Col sm={{size: 12}}>{this.props.name}</Col>
                <Col sm={{size: 10, offset: 1}}>
                    Address: {this.renderAddress()}
                </Col>
                <br/>
                <hr/>
            </Row>
        );
    }
}