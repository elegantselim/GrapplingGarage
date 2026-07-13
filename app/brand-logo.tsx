import Image from "next/image";

type BrandLogoProps = {
  className: string;
  inverted?: boolean;
  priority?: boolean;
};

export function BrandLogo({
  className,
  inverted = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/grappling-garage-logo.png"
      alt="Grappling Garage"
      width={715}
      height={789}
      sizes="96px"
      priority={priority}
      className={`${className} ${inverted ? "brightness-0 invert" : ""}`}
    />
  );
}
