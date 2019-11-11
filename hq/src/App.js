import React from 'react';
import { Card, Button } from 'antd';
import { Comics } from './Services';
import './App.css';
import { Spin } from 'antd';


const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      page: 1,
      data: [],
    }
  }


  fetchData(page) {
    this.setState({
      loading: true,
    })

    Comics.get(`${page}`).then(response => {
      this.setState({
        data: response.data,
        loading: false,
        page: page + 1,
      })
    })
  }

  componentWillMount() {
    this.fetchData(this.state.page);
  }

  onLoadMore = () => {
    this.fetchData(this.state.page);
  }

  render() {
    let images = []

    this.state.data.forEach((comic) => {
      images = images.concat(comic.results)
    });

    shuffleArray(images)

    const cards = images.map((image, index) => {
      return (
        <Card key={`${index}`}
          hoverable
          style={{ width: '90%' }}
          cover={<img src={image} />}
        >
        </Card>
      )
    })

    const spin = <Spin size="large" />

    return (
      <div style={{
        display: 'flex',
        flex: 1,
        height: "100vh",
        // width: "100vw",
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center'
      }}>

        {this.state.loading ? spin : cards}

        {!this.state.loading && <Button onClick={this.onLoadMore}>Carregar mais</Button>}

      </div>
    )
  }
}

export default App;
