import { render, fireEvent } from '@testing-library/vue';
import BaseSelect from './BaseSelect.vue';

const renderComponent = ({ props = {} }) =>
	render(BaseSelect, { props, global: { stubs: ['BaseInput'] } });

describe('Given a BaseSelect component', () => {
	describe('When it is rendered', () => {
		test('Then it should renders the label when passed', () => {
			const { getByText } = renderComponent({
				props: { label: 'Test Label', selectData: [] },
			});
			expect(getByText('Test Label')).toBeTruthy();
		});

		describe('And the placeholder prop is passed', () => {
			test('Then the input should display "Select an option" as value when no value is selected', () => {
				const { getByTestId } = renderComponent({
					props: { selectData: [], placeholder: 'Select an option' },
				});

				const input = getByTestId('base-select__input');
				expect((input as HTMLInputElement).value).toBe('Select an option');
			});
		});
		describe('And the placeholder prop is not passed', () => {
			test('Then the input should display an empty string', () => {
				const { getByTestId } = renderComponent({
					props: { selectData: [] },
				});

				const input = getByTestId('base-select__input');
				expect((input as HTMLInputElement).value).toBe('');
			});
		});

		test('Then it should renders selected option label when value is selected', async () => {
			const { getByText, getByTestId } = renderComponent({
				props: {
					selectData: [
						{ label: 'Option 1', value: '1' },
						{ label: 'Option 2', value: '2' },
					],
					value: '2',
				},
			});
			const input = getByTestId('base-select__input');

			await fireEvent.focus(input);

			expect(getByText('Option 2')).toBeTruthy();
		});

		test('Then it should emits "on-select" event with selected value when an option is clicked', async () => {
			const { getByTestId, getByText } = renderComponent({
				props: {
					selectData: [
						{ label: 'Option 1', value: '1' },
						{ label: 'Option 2', value: '2' },
					],
				},
			});
			const input = getByTestId('base-select__input');

			await fireEvent.focus(input);

			await fireEvent.click(getByText('Option 1'));
		});
	});
});
