export const metadata = { title: "Premium Compare" };

const rows = [
  { k: "24/7 Music", free: "-", premium: "✓", plus: "✓" },
  { k: "Queue Boost", free: "-", premium: "✓", plus: "✓" },
  { k: "Exclusive Filters", free: "-", premium: "✓", plus: "✓" },
  { k: "Priority Support", free: "-", premium: "✓", plus: "✓" },
];

export default function PremiumComparePage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">Compare plans</h1>
      <p className="text-white/70 mb-6">Find the plan that fits your server.</p>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr>
              <th className="text-left py-3 px-2">Feature</th>
              <th className="text-left py-3 px-2">Free</th>
              <th className="text-left py-3 px-2">Premium <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-rose-500/20 text-rose-300">Popular</span></th>
              <th className="text-left py-3 px-2">Guild Pro</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className="border-t border-white/5">
                <td className="py-3 px-2">{r.k}</td>
                <td className="py-3 px-2">{r.free}</td>
                <td className="py-3 px-2">{r.premium}</td>
                <td className="py-3 px-2">{r.plus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <a href="/premium" className="btn btn-primary">Choose a plan</a>
      </div>
    </div>
  );
}
