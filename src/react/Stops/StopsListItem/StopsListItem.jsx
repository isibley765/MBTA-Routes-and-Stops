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

    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(this.state.COMPONENT_NAME + " mounted!");
        }
    }

    render() {
        return (
            <div></div>
        );
    }
}