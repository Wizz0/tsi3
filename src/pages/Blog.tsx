import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

export default class Blog extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Блог, новости, статьи и прочее</title>
                    <meta name="description" content="Блог" />
                    <meta name="keywords" content="блог, статьи, акции, новости" />
                </Helmet>
                <h1>Blog</h1>
            </div>

        )
    }
}