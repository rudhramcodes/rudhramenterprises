import { ArrowRightIcon } from "@phosphor-icons/react";
import { memo } from "react";

const VARIANTS = {
  bronze:        { border: "#b37839", color: "#11100e", fill: "#b37839", hover: "#fffdf8" },
  ink:           { border: "#11100e", color: "#11100e", fill: "#11100e", hover: "#f8f4ed" },
  "ghost-light": { border: "#b37839", color: "#8f5f2e", fill: "#f5e7d4", hover: "#8f5f2e" },
  ivory:         { border: "#f8f4ed", color: "#f8f4ed", fill: "#f8f4ed", hover: "#11100e" },
  "bronze-dark": { border: "#b37839", color: "#d4996a", fill: "#b37839", hover: "#11100e" },
  "ghost-dark":  { border: "rgba(248,244,237,0.25)", color: "rgba(248,244,237,0.5)", fill: "#2a2621", hover: "rgba(248,244,237,0.85)" },
};

const SIZES = {
  sm: { padding: "9px 24px",  fontSize: "9.5px"  },
  md: { padding: "12px 34px", fontSize: "11px"   },
  lg: { padding: "16px 48px", fontSize: "12.5px" },
};

let _injected = false;
function injectOnce() {
  if (_injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.textContent = CSS;
  document.head.appendChild(s);
  _injected = true;
}

export const AwwwardsButton = memo(function AwwwardsButton({
  href,
  children,
  variant  = "bronze",
  size     = "md",
  className = "group",
  ariaLabel,
  onClick,
  ...rest
}) {
  injectOnce();
  const v   = VARIANTS[variant] ?? VARIANTS.bronze;
  const s   = SIZES[size]       ?? SIZES.md;
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`aww-btn ${className}`}
      aria-label={ariaLabel ?? (typeof children === "string" ? children : undefined)}
      style={{
        "--aww-b":   v.border,
        "--aww-c":   v.color,
        "--aww-f":   v.fill,
        "--aww-h":   v.hover,
        padding:     s.padding,
        fontSize:    s.fontSize,
        position:    "relative",
        display:     "inline-flex",
        alignItems:  "center",
        gap:         "10px",
        color:       v.color,
        border:      "none",
        background:  "transparent",
        borderRadius:"999px",
        cursor:      "pointer",
        outline:     "none",
        overflow:    "hidden",
        isolation:   "isolate",
        boxShadow:   `inset 0 0 0 1px ${v.border}`,
        textDecoration: "none",
      }}
      {...rest}
    >
      <span className="aww-fill" aria-hidden="true" />

      <span className="aww-text">
        <span className="aww-t1">{children}</span>
        <span className="aww-t2" aria-hidden="true">{children}</span>
      </span>

      <span className="aww-icon-wrap" aria-hidden="true">
        <span className="aww-icon-main">
          <ArrowRightIcon weight="bold" />
        </span>
        <span className="aww-icon-clone">
          <ArrowRightIcon weight="bold" />
        </span>
      </span>
    </Tag>
  );
});

export default AwwwardsButton;