import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";

type CustomCardProps = CardProps & {
  cardHeader?: React.ReactNode;
  cardContent?: React.ReactNode;
  cardFooter?: React.ReactNode;
};

export const CustomCard: React.FC<CustomCardProps> = ({
  cardHeader,
  cardContent,
  cardFooter,
  ...props
}) => {
  return (
    <Card className={cn("w-[380px]", props.className)} {...props}>
      <CardHeader>{cardHeader}</CardHeader>
      <CardBody>{cardContent}</CardBody>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
};
