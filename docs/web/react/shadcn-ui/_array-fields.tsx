// @ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})

type FormData = z.infer<typeof formSchema>

export default function DemoForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [{ address: "" }, { address: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  })

  function onSubmit(data: FormData) {
    alert('You submitted the form');
    console.log("Form submitted with data:", data)
  }

  return (
    <>
      <form id="array-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet className="gap-4">
          <FieldLegend variant="label">Email Addresses</FieldLegend>
          <FieldDescription>
            Add up to 5 email addresses where we can contact you.
          </FieldDescription>
          <FieldGroup className="gap-4">
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`emails.${index}.address`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          {...controllerField}
                          id={`array-form-email-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="name@example.com"
                          type="email"
                          autoComplete="email"
                        />
                        {fields.length > 1 && (
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => remove(index)}
                              aria-label={`Remove email ${index + 1}`}
                            >
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        )}
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ address: "" })}
              disabled={fields.length >= 5}
            >
              Add Email Address
            </Button>
          </FieldGroup>
          {form.formState.errors.emails?.root && (
            <FieldError errors={[form.formState.errors.emails.root]} />
          )}
        </FieldSet>
      </form>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="array-form">
          Save
        </Button>
      </Field>
    </>
  )
}
