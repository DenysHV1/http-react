import { Component } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import css from './Form.module.css';

export class Form extends Component {
	state = {
		inputValue: '',
	};

	handlerInputValue = e => {
		this.setState({ inputValue: e.currentTarget.value.toLowerCase().trim() });
	};

	handlerSubmit = e => {
		e.preventDefault();
		const { inputValue } = this.state;

		if (inputValue.trim() === '') {
			iziToast.error({ message: 'Please enter a search word.' });
			return;
		}

		this.props.takeQuery(inputValue);
		this.setState({ inputValue: '' });
	};
	render() {
		return (
			<form className={css.form} onSubmit={this.handlerSubmit}>
				<input
					className={css.searchInput}
					type="text"
					name="getQuery"
					value={this.state.inputValue}
					onChange={this.handlerInputValue}
				/>
				<button type="submit" className={css.searchBtn}>
					Search
				</button>
			</form>
		);
	}
}
