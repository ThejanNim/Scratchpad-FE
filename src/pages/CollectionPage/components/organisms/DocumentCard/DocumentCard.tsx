import { Badge } from "@/components/atoms/Badge/Badge";
import type { DocumentStatus } from "@/pages/CollectionPage/types/documentStatus";
import { getStatusLabel } from "@/pages/CollectionPage/utils";
import clsx from "clsx";
import { BadgeCheckIcon, Clock, Heart } from "lucide-react";
import { NavLink } from "react-router";

export interface DocumentCardProps {
  id: string;
  title: string;
  size: "small" | "large";
  coverUrl: string;
  status?: DocumentStatus;
  align?: "left" | "right";
}

export default function DocumentCard({
  id,
  title,
  size = "small",
  coverUrl,
  status = 0,
  align = "left",
}: DocumentCardProps) {
  return (
    <div
      className={clsx(
        "pb-4 border-[#d9d9d080]",
        size === "large"
          ? "col-span-3 border-b pt-4 w-full"
          : "border rounded-md"
      )}
    >
      <NavLink
        to={"/document/" + id}
        className={clsx("flex", size === "small" ? "flex-col gap-1" : "gap-16")}
      >
        <div
          className={clsx(
            "flex flex-col justify-between min-h-full w-full",
            size === "small" && "px-4 gap-3"
          )}
        >
          <div className="flex flex-col gap-4">
            <div
              className={clsx(
                "flex flex-col",
                size === "small" ? "gap-1" : "gap-2"
              )}
            >
              <div
                className={clsx(
                  "font-normal tracking-tighter text-pretty flex-grow",
                  size === "large" ? "text-[32px] leading-10" : "text-base"
                )}
              >
                {title}
              </div>
              <div className="flex items-center gap-1 text-[#13343bb8] text-xs font-medium">
                <Clock width={16} height={16} /> Published 7 minutes ago
              </div>
            </div>
            {/* {size === "large" && (
              <p className="text-base text-[#13343b]">
                The lawsuit targets 25 individuals behind a massive botnet that
                infected over 10 million Android devices for ad fraud and
                cybercrimes.
              </p>
            )} */}
          </div>
          <div className="flex justify-between">
            <Badge
              variant="secondary"
              className={clsx(
                status === 2 && "bg-green-500 text-white",
                status === 1 && "bg-blue-500 text-white"
              )}
            >
              <BadgeCheckIcon />
              {getStatusLabel(status)}
            </Badge>
            <Heart width={16} height={16} opacity={0.5} />
          </div>
        </div>
        <div
          className={clsx(
            "h-full aspect-[3/2] flex w-full overflow-hidden relative",
            size === "small"
              ? "order-first shrink-0 max-h-48"
              : "max-h-72 h-full",
            size === "large" && align === "left" ? "order-last" : "order-first"
          )}
        >
          <img
            className={clsx(
              "object-cover w-full h-full",
              size === "large" ? "rounded-md" : "rounded-t-md"
            )}
            src={coverUrl}
            alt=""
          />
        </div>
      </NavLink>
    </div>
  );
}
