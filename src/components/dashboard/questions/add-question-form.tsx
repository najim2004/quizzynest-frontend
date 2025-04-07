"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import useQuizStore from "@/stores/quizStore";
import { toast } from "sonner";
import { useCategoryStore } from "@/stores/categoryStore";

// Schema আপডেট
const formSchema = z.object({
  question: z.string().min(5, {
    message: "Question must be at least 5 characters.",
  }),
  description: z.string().optional(),
  timeLimit: z
    .number()
    .min(1, { message: "Time limit must be at least 1 second" })
    .optional(),
  maxPrize: z
    .number()
    .min(0, { message: "Max prize cannot be negative" })
    .optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    required_error: "Please select a difficulty level.",
  }),
  categoryId: z.number({
    required_error: "Please select a category.",
  }),
  answers: z
    .array(
      z.object({
        label: z.enum(["A", "B", "C", "D"]),
        text: z.string().min(1, { message: "Option text is required" }),
        isCorrect: z.boolean().default(false),
      })
    )
    .length(4, { message: "You must provide exactly 4 options" })
    .refine((answers) => answers.some((answer) => answer.isCorrect), {
      message: "At least one option must be marked as correct.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function AddQuestionForm() {
  const { createQuiz } = useQuizStore();
  const { categories } = useCategoryStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      description: "",
      timeLimit: undefined,
      maxPrize: undefined,
      difficulty: undefined,
      categoryId: undefined,
      answers: [
        { label: "A", text: "", isCorrect: true }, // ডিফল্টভাবে A চেক করা
        { label: "B", text: "", isCorrect: false },
        { label: "C", text: "", isCorrect: false },
        { label: "D", text: "", isCorrect: false },
      ],
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await createQuiz({
        question: values.question,
        timeLimit: values.timeLimit || 0,
        maxPrize: values.maxPrize || 0,
        description: values.description,
        difficulty: values.difficulty,
        categoryId: values.categoryId,
        answers: values.answers,
      });
      if (!response || !response.success) {
        throw new Error("Failed to create question");
      }

      toast.success("Question created successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to create question");
      console.error(error);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-2xl border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create A New Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Question */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-20"
                        placeholder="Enter your question"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-20"
                        placeholder="Enter a brief description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full grid grid-cols-2 gap-4">
                {/* Time Limit */}
                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Limit (seconds, Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-12"
                          placeholder="Enter time limit"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Max Prize */}
                <FormField
                  control={form.control}
                  name="maxPrize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Prize (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-12"
                          placeholder="Enter max prize"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                {/* Difficulty */}
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full !h-12">
                            <SelectValue placeholder="Select Difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EASY">Easy</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HARD">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full !h-12">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Answers */}
              <div>
                <FormLabel className="block mb-2">Options</FormLabel>
                {["A", "B", "C", "D"].map((label, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 w-8">
                      <span className="text-lg font-semibold">{label}.</span>
                    </div>
                    <FormField
                      control={form.control}
                      name={`answers.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <div className="flex items-center space-x-4">
                            <FormControl>
                              <Input
                                className="h-12"
                                placeholder={`Option ${label}`}
                                {...field}
                              />
                            </FormControl>
                            <FormField
                              control={form.control}
                              name={`answers.${index}.isCorrect`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={(checked) => {
                                        const currentValues =
                                          form.getValues().answers;
                                        const hasChecked = currentValues.some(
                                          (ans) => ans.isCorrect
                                        );
                                        // যদি এটি আনচেক করা হয় এবং কোনো চেক না থাকে, তাহলে ব্লক করো
                                        if (!checked && !hasChecked) {
                                          return; // আনচেক করা যাবে না
                                        }
                                        // অন্য সব আনচেক করো এবং এটি চেক করো
                                        if (checked) {
                                          currentValues.forEach((_, idx) => {
                                            if (idx !== index) {
                                              form.setValue(
                                                `answers.${idx}.isCorrect`,
                                                false
                                              );
                                            }
                                          });
                                        }
                                        field.onChange(checked);
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                {/* যদি কোনো অপশন চেক না থাকে তাহলে এরর দেখানো */}
                {form.formState.errors.answers && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.answers.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] text-white w-full h-12"
              >
                Save Question
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
