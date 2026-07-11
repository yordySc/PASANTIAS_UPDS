interface SuccessCardProps {
  title: string
  description: string
  accent?: 'blue' | 'emerald' | 'amber'
}

function SuccessCard({ title, description, accent = 'blue' }: SuccessCardProps) {
  const accentClasses = {
    blue: 'border-sky-200 bg-sky-50 text-[#223b87]',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
  }

  return (
    <div className={`rounded-3xl border p-5 shadow-sm ${accentClasses[accent]}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6">{description}</p>
    </div>
  )
}

export default SuccessCard
