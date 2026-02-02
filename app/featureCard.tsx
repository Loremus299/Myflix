export default function FeatureCard(props: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`p-4 border-2 border-black bg-white rounded-xl ${props.className}`}
    >
      {props.children}
    </div>
  );
}
