import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Layers, Calendar, MapPin, Type, FileText, Paperclip, Image as ImageIcon } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { InputField } from "../form/InputField";
import { FormError } from "../ui/FormError";
import { createEventSchema } from "../../validations/createEventValidation";
import { useToast } from "../../context/ToastContext";
import { useEventCreate } from "../../api/querys/useCreateEvent";
import { useFormValidation } from "../../hooks/useFormValidator";


export default function CreateEventForm({ onClose }) {
    const { errors, validate, clearError } = useFormValidation(createEventSchema);
    const { showToast } = useToast();
    const mutation = useEventCreate()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "meeting",
        startTime: null,
        endTime: null,
        location: "",
        attachments: [],
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);



    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            clearError(name);
        },
        [clearError]
    );

    const handleDateChange = (field, date) => {
        setFormData((prev) => ({ ...prev, [field]: date }));
        clearError(field);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (formData.attachments.length + files.length > 3) {
            showToast("warning", "Attachment Limit", "You can upload up to 3 files.");
            return;
        }
        setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        const isValid = await validate(formData);
        if (!isValid) return;
        mutation.mutate(formData);
        onClose()
    };

    const removeAttachment = (index) => {
        setFormData((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }));
    };

    const removeImage = () => {
        setFormData((prev) => ({ ...prev, image: null }));
        setImagePreview(null);
    };

    const CATEGORIES = ["All", "Technology", "Education", "Conference", "Networking", "Workshop", "Meeting"]


    return (
        <Card className="p-6 w-full max-w-2xl bg-background border border-border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" /> Create New Event
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Project Kickoff"
                    error={errors.title}
                    icon={<Type className="h-4 w-4 text-muted-foreground" />}
                />

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add details about this event..."
                        className={`w-full px-3 py-2 border rounded-md bg-background text-foreground resize-none h-24 ${errors.description ? "border-destructive" : "border-input"
                            }`}
                    />
                    {errors.description && <FormError>{errors.description}</FormError>}
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                        {
                            CATEGORIES.map((cat) => <option value={cat}>{cat}</option>)
                        }


                    </select>
                </div>

                {/* Date Pickers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> Start Time
                        </label>
                        <DatePicker
                            selected={formData.startTime}
                            onChange={(date) => handleDateChange("startTime", date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            placeholderText="Select start time"
                            className="w-full border border-input rounded-md px-3 py-2 bg-background text-foreground"
                        />
                        {errors.startTime && <FormError>{errors.startTime}</FormError>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> End Time
                        </label>
                        <DatePicker
                            selected={formData.endTime}
                            onChange={(date) => handleDateChange("endTime", date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            placeholderText="Select end time"
                            className="w-full border border-input rounded-md px-3 py-2 bg-background text-foreground"
                        />
                        {errors.endTime && <FormError>{errors.endTime}</FormError>}
                    </div>
                </div>

                <InputField
                    label="Location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Office HQ / Zoom"
                    error={errors.location}
                    icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
                />

                {/* Attachments Section */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Paperclip className="h-4 w-4" /> Attach Files (Max 3)
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.attachments.map((file, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-sm"
                            >
                                <FileText className="h-4 w-4" /> {file.name}
                                <button
                                    type="button"
                                    onClick={() => removeAttachment(i)}
                                    className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" /> Event Image (Max 1)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-muted-foreground file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {errors.image && <FormError>{errors.image}</FormError>}
                    {imagePreview && (
                        <div className="relative inline-block mt-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-md border"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full px-2 text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <Button type="submit" disabled={mutation.isPending} className="w-full">
                    {mutation.isPending ? "Creating..." : "Create Event"}
                </Button>
            </form>
        </Card>
    );
}
