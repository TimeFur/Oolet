import React, { Component } from 'react';
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';
import styles from "./EmailComponent.module.css"

export default class EmailComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            message: ""
        }
        init(process.env.REACT_APP_EMAIL_USER_ID);
        console.log("Process env: ", process.env.REACT_APP_EMAIL_USER_ID)
    }

    sendEmail = (e) => {
        e.preventDefault();

        console.log("Send ", this.state)

        emailjs.send("gmail", process.env.REACT_APP_EMAIL_TEMPLATE, {
            from_name: this.state.name,
            email: this.state.email,
            message: this.state.message,
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    };

    // Handler
    changeUpdate = (e) => {
        const target = e.target;
        const key = target.getAttribute('name')
        const val = target.value
        this.setState(state => {
            return {
                [key]: val
            }
        })
    }
    // mount
    onMountFormRef = (ref) => {
        this.formRef = ref
    }
    render() {

        const style = {
            height: this.props.height,
            width: this.props.width
        }

        return (
            <div className={styles.container} style={style}>
                <form className={styles.formStyle} ref={this.onMountFormRef} onSubmit={this.sendEmail} >
                    <div className={styles.infoWrapperStyle}>
                        <div className={styles.itemWrapperStyle}>
                            <label>Name</label>
                            <input type="text" name="name" onChange={this.changeUpdate} required />
                        </div>
                        <div className={styles.itemWrapperStyle}>
                            <label>Email</label>
                            <input type="email" name="email" onChange={this.changeUpdate} required />
                        </div>
                    </div>
                    <div className={styles.msgWrapperStyle}>
                        <label>Message</label>
                        <textarea name="message" onChange={this.changeUpdate} required />
                    </div>
                    <input className={styles.submitStyle} type="submit" value="Send" />
                </form>
            </div>
        )
    }
}

