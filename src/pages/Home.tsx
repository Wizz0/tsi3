import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Button } from '../components/Button'
import { Text } from '../components/Text'
import { Input } from '../components/Input'
import { Container } from '../components/Container'
import { Products } from '../components/Products'
import { AuthForm } from '../components/AuthForm'

export default class Home extends Component {
  render() {
    return (
      <div>
          <Container>
          <Helmet>
            <title>Главная страница</title>
            <meta name="description" content="Главная страница" />
            <meta name="keywords" content="магазин, товары, чипсеки, за 3000 рублей" />
          </Helmet>

            <h1>Главное</h1>
            <Text color="primary" size="large">
              Люблю чипсы, а кнопка теперь работает
            </Text>
            
          <Products />
        </Container>
      </div>
    )
  }
}