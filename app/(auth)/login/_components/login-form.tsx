"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Divider,
  Input,
  CardFooter,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useBoolean } from "usehooks-ts";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { LoginSchema, loginSchema } from "../../_login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

const DEFAULT_VALUES: Partial<LoginSchema> = {};

export function LoginForm() {
  const { value, setValue } = useBoolean(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const form = useForm<LoginSchema>({
    defaultValues: DEFAULT_VALUES,
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const signInWithGithub = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
  };

  const customToggle = () => {
    console.log(value);
    setValue((val) => !val);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <section className="lg:max-w-lg lg:mx-auto">
        <Card className="p-4">
          <CardHeader>
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Connect to your Noto account
            </h1>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col space-y-5">
              <Button
                startContent={<Icon icon="devicon:google" className="size-5" />}
                variant="faded"
              >
                Sign in with Google
              </Button>
              <Button
                onClick={signInWithGithub}
                variant="faded"
                isLoading={loading}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current dark:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Sign in with Github
              </Button>
            </div>

            <Divider className="mt-5" />
            <div className="grid gap-y-4 mt-5">
              <div>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full"
                      type="email"
                      label="Email"
                      variant="faded"
                      autoComplete="off"
                      placeholder="example@gmail.com"
                      errorMessage={form.formState.errors.email?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full"
                      type={value ? "text" : "password"}
                      label="Password"
                      variant="faded"
                      autoComplete="off"
                      placeholder="Enter your password"
                      errorMessage={form.formState.errors.password?.message}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={customToggle}
                        >
                          {value ? (
                            <Icon icon="mdi:eye" />
                          ) : (
                            <Icon icon="mdi:eye-off" />
                          )}
                        </button>
                      }
                    />
                  )}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="inline-flex">
            <Button type="submit" className="w-full" color="primary">
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </section>
    </form>
  );
}
