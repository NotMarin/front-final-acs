"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLogin } from "../hooks/use-auth";

const formSchema = z.object({
  email: z.string().email("Correo electrónico no válido."),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Requiere 1 mayúscula")
    .regex(/[0-9]/, "Requiere 1 número"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const login = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    login.mutate({ email: data.email, password: data.password });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
                <p className="text-balance text-muted-foreground">
                  Inicia sesión en tu cuenta para continuar
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
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
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
              <Field>
                <Button type="submit">Continuar</Button>
              </Field>
              <FieldDescription className="text-center">
                ¿No tienes una cuenta? <Link href="signup">Regístrate</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/login-img.webp"
              alt="Login image"
              className="absolute inset-0 h-full w-full object-cover dark:grayscale"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
