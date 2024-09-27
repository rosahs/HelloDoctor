"use client";

import { BackButton } from "./BackButton";
import { Social } from "./Social";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="w-full max-w-sm bg-bgGray rounded-xl shadow-2xl overflow-hidden border-2 border-primaryColor">
      <div className="px-4 sm:px-8 py-4 sm:py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-textDark">
          {headerLabel}
        </h1>
        <div className="space-y-4">{children}</div>

        {showSocial && (
          <>
            <div className="flex items-center mt-6">
              <div className="flex-grow h-px bg-placeholder"></div>
              <span className="px-3 text-sm text-gray-400">
                or continue with
              </span>
              <div className="flex-grow h-px bg-placeholder"></div>
            </div>
            <div className="mt-4">
              <Social />
            </div>
          </>
        )}
      </div>

      <div className="px-4 sm:px-8 py-4 bg-babyPowder border-t border-primaryColor">
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </div>
    </div>
  );
};
