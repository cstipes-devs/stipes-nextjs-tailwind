export function AngledDivider({ className = "" }: { className?: string }) {
  return (
    <div className={"w-full " + className} aria-hidden>
      <svg
        className="h-16 w-full"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        {/* Base angle (blue tint) */}
        <polygon points="0,20 100,3 100,20 0,20" fill="#00A8E0" opacity="0.28" />
        {/* Offset accent angle (site accent green) */}
        <polygon points="0,20 100,8 100,20 0,20" fill="#00E0A4" opacity="0.35" />
      </svg>
    </div>
  );
}
