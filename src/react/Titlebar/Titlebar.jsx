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
        console.log(this.state.COMPONENT_NAME + " mounted!");
        window[this.state.COMPONENT_NAME] = this;
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