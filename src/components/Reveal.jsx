// Wraps children in a scroll-reveal element. The useReveal() hook (mounted once
// in App) flips these to visible as they enter the viewport.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
