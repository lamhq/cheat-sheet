// @ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(32, "Description must be at most 32 characters.")
})

type FormData = z.infer<typeof formSchema>

export default function DemoForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validation triggers on every change
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(data: FormData) {
    // alert(`You submitted the form`);
    console.log("Form submitted with data:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Done after 2s");
      }, 2000);
    });
  }

  return (
    <>
      <form id="basic-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="basic-form-title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="basic-form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Post title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="basic-form-description">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="basic-form-description"
                    placeholder="Enter description here."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/32 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Instruction for entering the description.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="basic-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Working..." : "Submit"}
        </Button>
      </Field>
    </>
  )
}