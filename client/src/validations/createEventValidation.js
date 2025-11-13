import * as Yup from "yup";

const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const createEventSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Event title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),

  category: Yup.string().required("Please select a category"),

  startTime: Yup.date()
    .typeError("Start time is required")
    .required("Start time is required"),

  endTime: Yup.date()
    .typeError("End time is required")
    .required("End time is required")
    .test("is-after", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      return !startTime || !value || value > startTime;
    }),

  location: Yup.string().trim().required("Location is required"),

  image: Yup.mixed()
    .nullable()
    .test("fileType", "Only JPG, PNG, or WEBP images are allowed", (value) => {
      if (!value) return true; // optional field
      return SUPPORTED_IMAGE_TYPES.includes(value.type);
    })
    .test("fileSize", "Image must be less than 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024; // 2MB
    }),
});
