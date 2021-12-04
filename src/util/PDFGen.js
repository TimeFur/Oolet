import React, { Component } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

export default class PDFGen extends Component {
    constructor(props) {
        super(props)

    }

    MyDoc = () => {
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1
            },
            image: {
                width: "50%",
                height: "50%",
                objectFit: "contain",
                padding: 10
            },
            centerImage: {
                alignItems: "center",
                flexGrow: 1
            },
        });

        return (
            < Document >
                <Page size="A4" style={styles.page}>
                    <Image style={styles.image}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png" >
                    </Image>
                    <Image style={styles.image}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png" >
                    </Image>
                </Page>
            </Document >
        );
    }

    render() {
        return (
            <div>
                <PDFDownloadLink document={<this.MyDoc />} fileName={this.props.filename} >
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download!')}
                </PDFDownloadLink>
            </div>
        )
    }
}
