import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

export default class About extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>О нас</title>
                    <meta name="description" content="Контакты" />
                    <meta name="keywords" content="контакты, телефон, адрес, электронная почта" />
                </Helmet>
                <h1>About</h1>
            </div>

        )
    }
}