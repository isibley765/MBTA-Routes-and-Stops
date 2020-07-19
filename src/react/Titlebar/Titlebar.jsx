import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './Titlebar.css';

export default class Titlebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            COMPONENT_NAME: "Titlebar",
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
                <Col sm={{size: 12}}>
                    <h1>{this.props.title}</h1>
                </Col>
            </Row>
        );
    }
}