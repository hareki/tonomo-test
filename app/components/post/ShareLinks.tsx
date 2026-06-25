import { IconBrandFacebook, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';

const TARGETS = [
  { label: 'Share on X', Icon: IconBrandX },
  { label: 'Share on Facebook', Icon: IconBrandFacebook },
  { label: 'Share on LinkedIn', Icon: IconBrandLinkedin },
];

/**
 * Decorative share row for the hero. Buttons are non-functional placeholders for
 * this exercise; each carries an accessible label since the icon is hidden.
 * Colors inherit `currentColor` so the row reads on the gradient.
 */
export function ShareLinks() {
  return (
    <div className='flex items-center gap-3 text-sm'>
      <span className='font-medium text-current/80'>Share</span>
      <ul className='flex items-center gap-2'>
        {TARGETS.map(({ label, Icon }) => (
          <li key={label}>
            <button
              type='button'
              aria-label={label}
              className='
                flex size-8 items-center justify-center rounded-full border border-current/20
                text-current/80 transition-colors
                hover:bg-current/10 hover:text-current
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current
              '
            >
              <Icon size={16} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
