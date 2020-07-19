import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import styles from './Welcome.css';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col sm={{size: 12}} className={styles.welcomeScreen}>
                <h1>Welcome!</h1>
                <p>Press the button to query MBTA Routes</p>
                <hr/>
                <button onClick={this.props.getRoutes}>Fetch Routes</button>
                <hr/>
            </Col>
        );
    }
}