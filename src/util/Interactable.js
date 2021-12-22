import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";

import interact from "interact.js";

export default class Interactable extends Component {
    // default props value
    static defaultProps = {
        draggable: false,
        dropzone: false,
        resizable: false,
        draggableOptions: {},   // draggable is true
        dropzoneOptions: {},    // dropzone is true
        resizableOptions: {}    // resizable is true
    };

    // local function, to set for drag options
    setInteractions() {
        if (this.props.draggable)
            this.interact.draggable(this.props.draggableOptions);
        if (this.props.dropzone)
            this.interact.dropzone(this.props.dropzoneOptions);
        if (this.props.resizable)
            this.interact.resizable(this.props.resizableOptions);
    }

    // life-cycle function 
    componentDidMount() {
        this.interact = interact(findDOMNode(this.node));
        // this.interact = interact(this.node);
        this.setInteractions();
    }

    componentWillReceiveProps() {
        this.interact = interact(findDOMNode(this.node));
        // this.interact = interact(this.node);
        this.setInteractions();
    }

    render() {
        return cloneElement(this.props.children, {
            ref: node => (this.node = node),
            draggable: false
        });
    }
}

// define props type
Interactable.propTypes = {
    children: PropTypes.node.isRequired,
    draggable: PropTypes.bool,
    draggableOptions: PropTypes.object,
    dropzone: PropTypes.bool,
    dropzoneOptions: PropTypes.object,
    resizable: PropTypes.bool,
    resizableOptions: PropTypes.object
};
