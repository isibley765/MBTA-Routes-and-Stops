import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './RoutesListItem.css';

export default class RoutesListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            COMPONENT_NAME: "RoutesListItem",
        }
    }

    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(this.state.COMPONENT_NAME + " mounted!");
        }
    }

    render() {
        let container = this.props.selected ? styles.containerSelected : styles.container;
        return (
            <Col sm={{size: 12}} className={container}>
                <Row>
                    <Col sm={{size: 2}} className={styles.alignRight}><span>ID:</span></Col>
                        <Col sm={{size: 10}}><b>{this.props.id}</b></Col>
                    <Col sm={{size: 2}} className={styles.alignRight}><span>Name:</span></Col>
                        <Col sm={{size: 10}}><b><u>{this.props.name}</u></b></Col>
                    <Col sm={{size: 10, offset: 2}}
                        className={styles.routeDestinations}>
                            @ {this.props.destinations}
                    </Col>
                </Row>
            </Col>
        );
    }
}