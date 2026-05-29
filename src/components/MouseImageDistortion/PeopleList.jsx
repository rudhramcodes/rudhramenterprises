import { visionaries } from './data'

export default function PeopleList({ setActiveMenu, onPersonClick }) {
  return (
    <div className="relative z-10">
      <ul>
        {visionaries.map((person, i) => (
          <li
            key={person.id}
            onMouseEnter={() => setActiveMenu(i)}
            onMouseLeave={() => setActiveMenu(null)}
            className="group cursor-default"
          >
            <button
              type="button"
              onClick={() => onPersonClick(person)}
              aria-label={`Learn more about ${person.name}`}
              className="flex w-full cursor-pointer items-center gap-4 px-3 py-5 text-left outline-none transition-colors duration-300 hover:bg-ink/[0.03] sm:px-4 sm:py-6 lg:px-6 lg:py-7"
            >
              <span className="w-8 shrink-0 font-display text-sm text-ink/25 sm:w-10 sm:text-base">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-bronze sm:text-[11px]">
                  {person.tag}
                </span>
                <h3 className="mt-0.5 font-display text-[clamp(1.4rem,3.2vw,2.8rem)] leading-[1.08] tracking-tight text-ink transition-colors duration-300 group-hover:text-bronze">
                  {person.name}
                </h3>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-xs font-medium leading-relaxed text-stone/70 sm:text-sm">
                  {person.role}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
