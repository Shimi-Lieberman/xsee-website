export default function Logo({ className, height = 36 }: { className?: string; height?: number }) {
  return (
    <img
      src="/logo.png"
      alt="XSEE"
      className={className}
      height={height}
      width="auto"
      style={{ display: "block" }}
    />
  );
}
