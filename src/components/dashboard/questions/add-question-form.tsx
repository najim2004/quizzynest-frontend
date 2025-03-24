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

const formSchema = z.object({
  questionText: z.string().min(5, {
    message: "Question text must be at least 5 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  options: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Option text is required" }),
        isCorrect: z.boolean().default(false),
      })
    )
    .length(4, { message: "You must provide exactly 4 options" }),
});

type FormValues = z.infer<typeof formSchema>;

export function AddQuestionForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: "",
      category: "",
      options: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    form.reset();
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
              <FormField
                control={form.control}
                name="questionText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Text</FormLabel>
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full !h-12">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel className="block mb-2">Options</FormLabel>
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 w-8">
                      <span className="text-lg font-semibold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                    </div>
                    <FormField
                      control={form.control}
                      name={`options.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <div className="flex items-center space-x-4">
                            <FormControl>
                              <Input
                                className="h-12"
                                placeholder={`Option ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                            <FormField
                              control={form.control}
                              name={`options.${index}.isCorrect`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={(checked) => {
                                        // Uncheck all other options
                                        form
                                          .getValues()
                                          .options.forEach((_, idx) => {
                                            if (idx !== index) {
                                              form.setValue(
                                                `options.${idx}.isCorrect`,
                                                false
                                              );
                                            }
                                          });
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
