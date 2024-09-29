import { Component } from 'react';
import { Form } from './Form/Form';
import { MarkupGallery } from './Markup/MarkupGallery';
import { api } from './api';
import css from './Gallery.module.css'

export class Gallery extends Component {
  state = {
    query: '',
    data: null,
    page: 1,
    loader: false,
    btn: false,
  };

  handlerTakeSubmit = value => {
    this.setState({ query: value });
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      if (this.state.query === '') {
        return;
      }
      this.setState({ loader: true });
      try {
        const response = await api(this.state.query, this.state.page);
        this.setState({ data: response.hits, page: 1 });

        if (response.totalHits > 15) {
          this.setState({ btn: true });
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  handlerLoadMore = () => {
    this.setState((prevState) => (prevState.page += 1));
    try {
      api(this.state.query, this.state.page).then(response =>
        this.setState({ data: response.hits })
      );
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <>
        <Form takeQuery={this.handlerTakeSubmit}></Form>
        {this.state.loader && <p>Loading...</p>}
        <ul className={css.galleryList}>
          {this.state.data && (
            <MarkupGallery arrResult={this.state.data}></MarkupGallery>
          )}
        </ul>
        {this.state.btn && (
          <button className={css.btn} type="button" onClick={this.handlerLoadMore}>
            Load more
          </button>
        )}
      </>
    );
  }
}

// curl https://api.unsplash.com/search/photos?query=wanderlust █
