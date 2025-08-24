import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Button as ButtonComponent,
  SIZE,
  VARIANT,
} from "@/components/ui/Button";

const meta: Meta<typeof ButtonComponent> = {
  args: { onClick: fn() },
  argTypes: {
    className: { control: "text" },
  },
  component: ButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "UI/Button",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleAtomButton: Story = {
  args: {
    asChild: false,
    children: "test",
    disabled: false,
    isLoading: false,
    variant: VARIANT.PRIMARY,
  },
  argTypes: {
    children: {
      control: {
        type: "select",
      },
      options: [
        "test",
        <a href="test" key="test">
          test-link-type
        </a>,
      ],
    },
    size: {
      control: {
        type: "select",
      },
      options: Object.values(SIZE),
    },
    variant: {
      control: {
        type: "select",
      },
      options: Object.values(VARIANT),
    },
  },
  render: ({ children, ...args }) => {
    return (
      <div>
        <ButtonComponent variant={VARIANT.PRIMARY} {...args}>
          {children}
        </ButtonComponent>
      </div>
    );
  },
};

export const Variant = () => (
  <div className="flex flex-col items-start gap-4">
    <ButtonComponent variant={VARIANT.PRIMARY}>PRIMARY</ButtonComponent>
    <ButtonComponent variant={VARIANT.OUTLINED}>OUTLINED</ButtonComponent>
    <ButtonComponent variant={VARIANT.OUTLINED_RED}>
      OUTLINED_RED
    </ButtonComponent>
    <ButtonComponent variant={VARIANT.DESTRUCTIVE}>DESTRUCTIVE</ButtonComponent>
    <ButtonComponent variant={VARIANT.GHOST}>GHOST</ButtonComponent>
    <ButtonComponent variant={VARIANT.GHOST_RED}>GHOST_RED</ButtonComponent>
  </div>
);

export const Size = () => (
  <div className="flex flex-col items-start gap-4">
    <ButtonComponent
      prefixElement={<Plus />}
      size={SIZE.ICON}
    ></ButtonComponent>
    <ButtonComponent size={SIZE.MEDIUM}>ボタン</ButtonComponent>
    <ButtonComponent size={SIZE.LARGE}>ボタン</ButtonComponent>
  </div>
);

export const Loading = () => (
  <div className="flex flex-col items-start gap-4">
    <ButtonComponent
      isLoading
      prefixElement={<Plus />}
      size={SIZE.ICON}
      variant={VARIANT.PRIMARY}
    ></ButtonComponent>
    <ButtonComponent isLoading variant={VARIANT.OUTLINED}>
      ボタン
    </ButtonComponent>
    <ButtonComponent isLoading prefixElement={<Plus />} variant={VARIANT.GHOST}>
      ボタン
    </ButtonComponent>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-col items-start gap-4">
    <ButtonComponent
      disabled
      prefixElement={<Plus />}
      size={SIZE.ICON}
      variant={VARIANT.PRIMARY}
    ></ButtonComponent>
    <ButtonComponent disabled size={SIZE.MEDIUM} variant={VARIANT.OUTLINED}>
      ボタン
    </ButtonComponent>
    <ButtonComponent
      disabled
      prefixElement={<Plus />}
      size={SIZE.MEDIUM}
      variant={VARIANT.GHOST}
    >
      ボタン
    </ButtonComponent>
  </div>
);

export const IconPosition = () => (
  <div className="flex flex-col items-start gap-4">
    <ButtonComponent prefixElement={<ChevronLeft />} variant={VARIANT.PRIMARY}>
      Prefix
    </ButtonComponent>
    <ButtonComponent suffixElement={<ChevronRight />} variant={VARIANT.PRIMARY}>
      Suffix
    </ButtonComponent>
  </div>
);
