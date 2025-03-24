"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Define types for the form schema
type CategoryFormValues = z.infer<typeof categorySchema>;

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Form validation schema
const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must not exceed 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  color: z.string().regex(/^#([A-Fa-f0-9]{6})$/, "Invalid color format"),
  icon: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .optional(),
});

// Light colors for category selection
const lightColors = [
  "#FADADD",
  "#FFD3B6",
  "#FFEBB2",
  "#D4E09B",
  "#B5EAD7",
  "#C9E4DE",
  "#A2D2FF",
  "#B6CCFE",
  "#D1CFE2",
  "#E2CFEA",
  "#FFF5BA",
  "#F8EDE3",
  "#FCE1E4",
  "#E5F9DB",
  "#D0E2FF",
  "#FFB5E8",
  "#D5AAFF",
  "#AFF8DB",
  "#D4F4FF",
  "#F6D6AD",
] as const;

const CreateCategoryForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(lightColors[0]);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      color: lightColors[0],
      icon: undefined,
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewIcon) {
        URL.revokeObjectURL(previewIcon);
      }
      setPreviewIcon(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const onSubmit = async (values: CategoryFormValues): Promise<void> => {
    console.log(values);
    setLoading(true);
    try {
      // TODO: Implement API call here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Category created successfully!");
      form.reset();
      setSelectedColor(lightColors[0]);
      if (previewIcon) {
        URL.revokeObjectURL(previewIcon);
        setPreviewIcon(null);
      }
    } catch (error) {
      toast.error("Failed to create category");
      console.error("Category creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clean up preview URL on component unmount
  useEffect(() => {
    return () => {
      if (previewIcon) {
        URL.revokeObjectURL(previewIcon);
      }
    };
  }, [previewIcon]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-2xl border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Category Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12"
                        placeholder="Enter category name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-40"
                        placeholder="Enter category description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Icon Upload */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Icon</FormLabel>
                    <FormControl>
                      <div className="relative">
                        {!previewIcon ? (
                          <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition">
                            <label className="cursor-pointer flex flex-col items-center">
                              <UploadCloud className="w-10 h-10 text-gray-500" />
                              <span className="text-gray-500 text-sm">
                                Click to upload or drag & drop
                              </span>
                              <input
                                type="file"
                                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(e, field.onChange)
                                }
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="relative inline-block">
                              <Image
                                src={previewIcon}
                                alt="Preview"
                                width={80}
                                height={80}
                                className="object-cover size-20 rounded-full border border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  URL.revokeObjectURL(previewIcon);
                                  setPreviewIcon(null);
                                  field.onChange(undefined);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color Picker */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Category Color</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-10 gap-2 justify-center items-center">
                        {lightColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`w-10 h-10 rounded-full border-2 mx-auto ${
                              selectedColor === color
                                ? "border-black scale-110"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              setSelectedColor(color);
                              field.onChange(color);
                            }}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 font-semibold bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCategoryForm;
