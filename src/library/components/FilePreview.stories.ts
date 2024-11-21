import type { Meta, StoryObj } from '@storybook/vue3';
 
import FilePreview from './FilePreview.vue';

const meta: Meta<typeof FilePreview> = {
  component: FilePreview,
};
 
export default meta;
type Story = StoryObj<typeof FilePreview>;
 

export const ImageOrVideo: Story = {
  args: {
    previewUrl: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
    isImage: true,
    isVideo: false,
    fileName: "Sun-Day--1200x834.jpg",
    fileSize: "195.2Гб"
  },
};

export const File: Story = {
  args: {
    previewUrl: "",
    isImage: false,
    isVideo: false,
    fileName: "file.pdf",
    fileSize: "195.2Гб"
  },
};

export const FileLongName: Story = {
  args: {
    previewUrl: "",
    isImage: false,
    isVideo: false,
    fileName: "Требования безопасности к рабочему месту токаря-слесаря 25ого разряда ОАО Инновационные решения 2000-2035.pdf",
    fileSize: "195.2Гб"
  },
};
