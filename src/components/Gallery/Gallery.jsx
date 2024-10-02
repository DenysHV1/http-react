import { Component } from 'react';
import { Form } from './Form/Form';
import { MarkupGallery } from './Markup/MarkupGallery';
import { api } from './api';
import css from './Gallery.module.css';

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
		const { query, page } = this.state;

		if (prevState.query !== query) {
			if (query === '') {
				return;
			}
			this.setState({ btn: false, loader: true, data: null });
			try {
				const response = await api(query, page);
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
		const { query, page } = this.state;
		this.setState(({ page }) => ({ page: (page += 1) }));
		try {
			api(query, page).then(response => this.setState({ data: response.hits }));
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		const { loader, data, btn } = this.state;
		return (
			<>
				<Form takeQuery={this.handlerTakeSubmit}></Form>
				{loader && (
					<div className={css.loaderContainer}>
						<p>Loading...</p>
					</div>
				)}
				<ul className={css.galleryList}>
					{data && <MarkupGallery arrResult={data}></MarkupGallery>}
				</ul>
				{btn && (
					<div className={css.btnContainer}>
						{' '}
						<button
							className={css.btn}
							type="button"
							onClick={this.handlerLoadMore}
						>
							Load more
						</button>
					</div>
				)}
			</>
		);
	}
}
