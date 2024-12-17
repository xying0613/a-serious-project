import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import VisitorList from '../VisitorList.vue';

// Mock Axios
vi.mock('axios');

describe('VisitorList.vue', () => {
  it('renders properly with fetched visitors', async () => {
    // Mock API response
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    });

    const wrapper = mount(VisitorList);

    // Wait for the visitors to be fetched and DOM to update
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure fetchVisitors resolves
    await wrapper.vm.$nextTick(); // Ensure DOM updates after the state change

    // Check if visitors are rendered
    const options = wrapper.findAll('option');
    const optionTexts = options.map((option) => option.text());
    expect(optionTexts).toContain('Alice');
    expect(optionTexts).toContain('Bob');
  });

  it('disables the submit button when no visitor is selected', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    });

    const wrapper = mount(VisitorList);

    await new Promise((resolve) => setTimeout(resolve, 0));
    await wrapper.vm.$nextTick();

    const button = wrapper.find('button.submit-button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('enables the submit button when a visitor is selected', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    });

    const wrapper = mount(VisitorList);

    await new Promise((resolve) => setTimeout(resolve, 0));
    await wrapper.vm.$nextTick();

    const select = wrapper.find('select');
    await select.setValue('Alice');

    const button = wrapper.find('button.submit-button');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('shows the popup when the submit button is clicked', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    });

    const wrapper = mount(VisitorList);

    await new Promise((resolve) => setTimeout(resolve, 0));
    await wrapper.vm.$nextTick();

    const select = wrapper.find('select');
    await select.setValue('Alice');

    const button = wrapper.find('button.submit-button');
    await button.trigger('click');

    // Check if popup is visible
    expect(wrapper.find('.popup-message').text()).toBe('Welcome back, Alice!');
  });
});
