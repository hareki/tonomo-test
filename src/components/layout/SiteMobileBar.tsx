import { MobileToc } from '@/src/features/blog/components/MobileToc';
import { getPostAnalysis } from '@/src/features/blog/content';

type SiteMobileBarProps = {
  slug: string;
};
export async function SiteMobileBar({ slug }: SiteMobileBarProps) {
  const { toc } = await getPostAnalysis(slug);

  return (
    <div
      className={`
        sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur-md
        lg:hidden
      `}
    >
      <div
        className={`
          flex px-4 py-2.5
          sm:px-6
        `}
      >
        <div className='ml-auto'>
          <MobileToc entries={toc} />
        </div>
      </div>
    </div>
  );
}
