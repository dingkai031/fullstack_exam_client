export default function ({ id, name, type }) {
  return (
    <input
      className="rounded-sm bg-slate-100 p-2 transition-colors duration-200 focus-visible:bg-slate-300 focus-visible:outline-none"
      id={id}
      name={name}
      type={type}
      required
    />
  )
}
