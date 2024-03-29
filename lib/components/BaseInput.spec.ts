import { render } from '@testing-library/vue';
import BaseInput from './BaseInput.vue';

const renderComponent = ({ props = {} }) => render(BaseInput, { props });

describe('Given a BaseInput component', () => {
	test('Then it displays label when passed as a prop', () => {
		const { getByText } = renderComponent({ props: { label: 'Test label' } });
		expect(getByText('Test label')).toBeTruthy();
	});
});
