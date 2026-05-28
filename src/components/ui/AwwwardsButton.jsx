import { memo } from "react";

const VARIANTS = {
  bronze: {
    border: "#fffdf8",
    color: "#fffdf8",
    fill: "#fffdf8",
    hover: "#11100e",
    base: "#b37839",
  },
  ink: {
    border: "#11100e",
    color: "#fffdf8",
    fill: "#f8f4ed",
    hover: "#11100e",
    base: "#11100e",
  },
  "ghost-light": {
    border: "#b37839",
    color: "#8f5f2e",
    fill: "#f5e7d4",
    hover: "#8f5f2e",
    base: "rgba(248,244,237,0.72)",
  },
  ivory: {
    border: "#b37839",
    color: "#11100e",
    fill: "#b37839",
    hover: "#fffdf8",
    base: "#f8f4ed",
  },
  "bronze-dark": {
    border: "#fffdf8",
    color: "#fffdf8",
    fill: "#fffdf8",
    hover: "#11100e",
    base: "#b37839",
  },
  "ghost-dark": {
    border: "rgba(248,244,237,0.25)",
    color: "rgba(248,244,237,0.9)",
    fill: "#f8f4ed",
    hover: "#11100e",
    base: "#2a2621",
  },
};

const SIZES = {
  sm: { padY: "10px", padX: "22px", fontSize: "10px", radius: "14px" },
  md: { padY: "12px", padX: "30px", fontSize: "11.5px", radius: "14px" },
  lg: { padY: "15px", padX: "42px", fontSize: "13px", radius: "16px" },
};

const CSS = `
.aww-btn .aww-fill {
  position: absolute;
  inset: -1px;
  background: var(--aww-f);
  transform: translateY(102%);
  transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
  border-radius: inherit;
}

.aww-btn .aww-text {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1;
}

.aww-btn .aww-t1,
.aww-btn .aww-t2 {
  display: block;
  white-space: nowrap;
  transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1), color 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.aww-btn .aww-t2 {
  position: absolute;
  inset: 0 auto auto 0;
  transform: translateY(135%);
  color: var(--aww-h);
}

.aww-btn:hover .aww-fill,
.aww-btn:focus-visible .aww-fill {
  transform: translateY(0);
}

.aww-btn:hover .aww-t1,
.aww-btn:focus-visible .aww-t1 {
  transform: translateY(-135%);
}

.aww-btn:hover .aww-t2,
.aww-btn:focus-visible .aww-t2 {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .aww-btn {
    --aww-mobile-pad-y: max(9px, calc(var(--aww-pad-y, 12px) - 2px));
    --aww-mobile-pad-x: max(16px, calc(var(--aww-pad-x, 28px) - 6px));
    padding: var(--aww-mobile-pad-y) var(--aww-mobile-pad-x) !important;
    border-radius: 12px !important;
    min-height: 40px;
  }
}
`;

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
  variant = "bronze",
  size = "md",
  className = "group",
  ariaLabel,
  onClick,
  ...rest
}) {
  injectOnce();
  const v = VARIANTS[variant] ?? VARIANTS.bronze;
  const s = SIZES[size] ?? SIZES.md;
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`aww-btn ${className}`}
      aria-label={ariaLabel ?? (typeof children === "string" ? children : undefined)}
      style={{
        "--aww-b": v.border,
        "--aww-c": v.color,
        "--aww-f": v.fill,
        "--aww-h": v.hover,
        "--aww-pad-y": s.padY,
        "--aww-pad-x": s.padX,
        padding: `${s.padY} ${s.padX}`,
        fontSize: s.fontSize,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: v.color,
        border: "none",
        background: v.base,
        borderRadius: s.radius,
        cursor: "pointer",
        outline: "none",
        overflow: "hidden",
        isolation: "isolate",
        boxShadow: `inset 0 0 0 1px ${v.border}`,
        textDecoration: "none",
        fontFamily: "var(--font-body), sans-serif",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1,
      }}
      {...rest}
    >
      <span className="aww-fill" aria-hidden="true" />
      <span className="aww-text">
        <span className="aww-t1">{children}</span>
        <span className="aww-t2" aria-hidden="true">
          {children}
        </span>
      </span>
    </Tag>
  );
});

export default AwwwardsButton;
