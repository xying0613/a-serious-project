import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import InputName from '../InputName.vue';
import axios from 'axios';

// Mock the axios module
vi.mock('axios');

describe('InputName.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(InputName);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('disables the submit button when the input is empty', () => {
    const wrapper = mount(InputName);
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('enables the submit button when the input is filled', async () => {
    const wrapper = mount(InputName);

    const input = wrapper.find('input[type="text"]');
    await input.setValue('Alice');

    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('shows an alert with the correct name when submitted', async () => {
    const mockResponse = { data: { name: 'Alice' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const wrapper = mount(InputName);

    const alertMock = vi.fn();
    window.alert = alertMock;

    const input = wrapper.find('input[type="text"]');
    await input.setValue('Alice');

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(alertMock).toHaveBeenCalledWith('Hello, Alice! User created successfully.');
  });
});
