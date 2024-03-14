import { Fragment } from "react";

interface Props {
  heading: string;
  subContent?: string;
  pill: string;
}

export default function Title({ heading, pill, subContent }: Props) {
  return (
    <Fragment>
      <section className="flex flex-col gap-4 justify-center items-start md:items-center">
        <article className="transition duration-500 group select-none rounded-full p-px text-sm bg-gradient-to-bl from-[#348F50] to-[#56B4D3] brightness-90 contrast-125 dark:brightness-125 dark:contrast-100 hover:shadow-[0_0_2rem_-0.5rem_#3178c6] dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8]">
          <div className="rounded-full px-3 py-px bg-background">{pill}</div>
        </article>
        {subContent ? (
          <>
            <h2 className="text-left text-3xl md:text-5xl lg:text-6xl font-semibold scroll-m-20 leading-tight">
              {heading}
            </h2>
            <p className="text-left text-muted-foreground sm:max-w-[450px] md:text-center">
              {subContent}
            </p>
          </>
        ) : (
          <h1 className="text-left text-4xl sm:text-5xl sm:max-w-[850px] md:text-center font-semibold">
            {heading}
          </h1>
        )}
      </section>
    </Fragment>
  );
}
