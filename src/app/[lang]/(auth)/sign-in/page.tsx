import dynamic from 'next/dynamic';

const SignInContainer = dynamic(() => import('@/containers/sign-in'), {
  ssr: false,
});

export default function SignInPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return <SignInContainer params={{ lang }} />;
}
