import dynamic from 'next/dynamic';

// Dynamically import VoiceCallWidget to ensure client-side rendering
const VoiceCallWidget = dynamic(() => import('@/components/VoiceCallWidget'), {
  ssr: false
});

export default async function ChatPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <VoiceCallWidget />
    </div>
  );
}
