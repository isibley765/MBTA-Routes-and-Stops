import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './StopsListItem.css';

export default class StopsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            COMPONENT_NAME: "StopsListItem",
        }
    }

    renderAddress() {
        if (this.props.address != null) {
            return this.props.address.split(',')[0];
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
            <Row className={styles.listBody}>
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