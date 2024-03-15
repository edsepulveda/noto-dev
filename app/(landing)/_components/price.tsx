import { PRICE_PLANS, PRICING } from "@/constants/constant";
import Title from "./title";
import { CustomCard } from "./custom-card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@nextui-org/react";

export default function PricePage() {
  return (
    <div>
      <Title
        pill="🤑 Plans for everyone"
        heading="The perfect plan"
        subContent="Choose the plan that most fits you"
      />
      <div className="flex flex-col-reverse sm:flex-row gap-4 justify-center sm:items-stretch mt-10">
        {PRICING.map((price) => (
          <CustomCard
            key={price.planName}
            className={cn(
              "w-[300px] p-2.5 rounded-2xl dark:bg-black/50 backdrop-blur-3xl relative border border-gray-200 dark:border-gray-700",
              {
                "border-2 border-warning-500 dark:border-warning-500":
                  price.planName === PRICE_PLANS.proPlan,
              }
            )}
            cardHeader={
              <h2 className="text-2xl font-semibold">
                {price.planName === PRICE_PLANS.proPlan && (
                  <>
                    <div className="hidden dark:block w-full blur-[120px] rounded-full h-32 absolute bg-warning-500/50 -z-[99999] top-0" />
                  </>
                )}
                {price.planName}
              </h2>
            }
            cardContent={
              <div className="p-0">
                <span className="font-normal text-2xl">
                  $ {price.price}
                  {+price.price === 0 ? (
                    <span className="dark:text-muted-foreground ml-1">/mo</span>
                  ) : (
                    ""
                  )}
                </span>
                <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-4">
                  {price.planName === PRICE_PLANS.proPlan
                    ? "Go pro mode"
                    : "Get started"}
                  <BottomGradient />
                </button>
              </div>
            }
            cardFooter={
              <ul className="font-normal flex mb-2 flex-col gap-4">
                <small>{price.highlightFeature}</small>
                {price.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-6 text-warning-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            }
          />
        ))}
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
