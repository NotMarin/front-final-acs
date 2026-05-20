"use client";

import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/use-auth";

export const formSchema = z
  .object({
    email: z.string().email("Correo electrónico no válido."),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Requiere 1 mayúscula")
      .regex(/[0-9]/, "Requiere 1 número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const register = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    register.mutate({
      email: data.email,
      password: data.password,
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Ingresa los campos para crear una cuenta
                </p>
              </div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                      <Input
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="confirm-password">
                        Confirmar contraseña
                      </FieldLabel>
                      <Input
                        {...field}
                        id="confirm-password"
                        aria-invalid={fieldState.invalid}
                        type="password"
                        placeholder="Repite tu contraseña"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <FieldDescription className="text-xs">
                Debe tener al menos 8 caracteres, 1 mayúscula y 1 número.
              </FieldDescription>
              <Field>
                <Button disabled={register.isPending} type="submit">
                  Crear cuenta
                </Button>
              </Field>
              <FieldDescription className="text-center">
                ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/login-img.webp"
              fill
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
