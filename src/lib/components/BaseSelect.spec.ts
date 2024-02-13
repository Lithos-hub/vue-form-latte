// FILEPATH: /C:/Users/csegu/Desktop/DEV/vue-form-latte/src/lib/components/BaseSelect.spec.ts
import { nextTick } from 'vue';
import { render, fireEvent } from '@testing-library/vue';
import BaseSelect from './BaseSelect.vue';

const renderComponent = (props = {}) =>
	render(BaseSelect, { props, global: { stubs: ['BaseInput'] } });

describe('Given a BaseSelect component', () => {
	describe('When it is rendered', () => {
		test('Then it should renders the label when passed', async () => {
			const { getByText } = renderComponent({
				props: { label: 'Test Label', data: [] },
			});
			expect(getByText('Test Label')).toBeTruthy();
		});

		test('Then it should renders "Select an option" when no value is selected', async () => {
			const { getByText } = renderComponent({
				props: { data: [] },
			});
			expect(getByText('Select an option')).toBeTruthy();
		});

		test('Then it should renders selected option label when value is selected', async () => {
			const { getByText } = renderComponent({
				props: {
					data: [
						{ label: 'Option 1', value: '1' },
						{ label: 'Option 2', value: '2' },
					],
					value: '2',
				},
			});
			expect(getByText('Option 2')).toBeTruthy();
		});

		test('Then it should emits "on-select" event with selected value when an option is clicked', async () => {
			const { getByTestId, getByText, emitted } = renderComponent({
				props: {
					data: [
						{ label: 'Option 1', value: '1' },
						{ label: 'Option 2', value: '2' },
					],
				},
			});
			const input = getByTestId('base-select__input');

			await fireEvent.focus(input);

			await nextTick();

			await fireEvent.click(getByText('Option 1'));

			expect(emitted()).toHaveProperty('on-select');

			expect(emitted()['on-select']).toHaveLength(1);

			expect(emitted()['on-select'][0]).toEqual(['1']);
		});
	});
});