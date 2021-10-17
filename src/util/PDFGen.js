import React, { Component } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default class PDFGen extends Component {
    constructor(props) {
        super(props)

    }

    MyDoc = () => {
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
                backgroundColor: '#E4E4E4'
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1
            }
        });
        return (
            < Document >
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Section #1</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
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