import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "outline", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Cliquez-moi",
    variant: "default",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    children: "Action principale",
    variant: "primary",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Bouton outline",
    variant: "outline",
    size: "md",
  },
};
