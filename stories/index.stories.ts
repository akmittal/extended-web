import { html, TemplateResult } from 'lit-html';
import '../components/EwCarousel.js';

export default {
  title: 'EwCarousel',
  component: 'ew-carousel',
  argTypes: {

    textColor: { control: 'color' },
    children: {control:'slot'}
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {

  textColor?: string;
  children?: TemplateResult;
}

const Template: Story<ArgTypes> = ({

  textColor,
  children,
}: ArgTypes) => html`
  <ew-carousel
    style="--ew-carousel-text-color: ${textColor || 'black'}"

  >
    ${children}
  </ew-carousel>
`;

export const Regular = Template.bind({});


export const SlottedContent = Template.bind({});
SlottedContent.args = {
  children: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
