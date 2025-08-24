import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb as BreadcrumbComponent } from "@/components/ui/Breadcrumb";

const defaultCrumbs = [
  { id: "1", label: "フォルダA", driveId: "1" },
  { id: "2", label: "フォルダB", driveId: "1" },
  { id: "3", label: "フォルダC", driveId: "1" },
];

const meta: Meta<typeof BreadcrumbComponent> = {
  args: {
    crumbs: defaultCrumbs,
    size: "xl",
    isModal: false,
  },
  argTypes: {
    className: { control: "text" },
    separatorIcon: { control: false },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
  },
  component: BreadcrumbComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Atoms/Breadcrumb",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <BreadcrumbComponent
      {...args}
      crumbs={args.crumbs ?? defaultCrumbs} // 安全に crumbs を渡す
      isModal={args.isModal}
      onCrumbClick={(crumb) => console.log("Crumb clicked:", crumb.label)}
    />
  ),
};

export const LongPath: Story = {
  args: {
    crumbs: [
      { label: "フォルダA" },
      { label: "フォルダB" },
      { label: "フォルダC" },
      { label: "フォルダD" },
      { label: "フォルダE" },
      { label: "フォルダF" },
    ],
    isModal: false,
  },
  render: (args) => (
    <BreadcrumbComponent
      {...args}
      crumbs={args.crumbs ?? defaultCrumbs}
      isModal={args.isModal} // 安全に crumbs を渡す
      onCrumbClick={(crumb) => console.log("Crumb clicked:", crumb.label)}
    />
  ),
};

export const SizeVariants: Story = {
  args: {
    crumbs: defaultCrumbs,
  },
  render: ({ crumbs, separatorIcon, className }) => (
    <div className="flex flex-col gap-2 max-w-md">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <BreadcrumbComponent
          className={className}
          crumbs={crumbs}
          isModal={false}
          key={size}
          onCrumbClick={(crumb) =>
            console.log(`Clicked (${size}):`, crumb.label)
          }
          separatorIcon={separatorIcon}
          size={size}
        />
      ))}
    </div>
  ),
};
