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

const formSchema = z.object({
  content: z
    .string()
    .min(5, "Content must be at least 5 characters.")
    .max(32, "Content must be at most 32 characters.")
})

type FormData = z.infer<typeof formSchema>

export default function DemoForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validation triggers on every change
    defaultValues: {
      content: "",
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
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              // [!code highlight]
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="basic-form-content">
                  Content
                </FieldLabel>
                <Input
                  {...field}
                  id="basic-form-content"
                  // [!code highlight]
                  aria-invalid={fieldState.invalid}
                  placeholder="Some placeholder content"
                  autoComplete="off"
                />
                <FieldDescription>
                  Field description. What to enter to the input.
                </FieldDescription>
                // [!code highlight]
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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