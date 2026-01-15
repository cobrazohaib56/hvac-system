'use client';

import { useChat } from 'ai/react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md lg:py-24 mx-auto stretch p-6">
      {messages && messages.length > 0 ? (
        messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap mb-4">
            <span className=" font-bold text-zinc-900 dark:text-gray-400">
              {m.role === 'user' ? 'User: ' : 'AI: '}
            </span>
            {m.content}
          </div>
        ))
      ) : (
        <div>
          <Image
            width={600}
            height={700}
            src={'/chat-monochromatic.svg'}
            alt="Avatar"
            className="avatar image"
          />
          <p className="font-extrabold text-md text-center tracking-tight mt-6 uppercase text-gray-400 dark:text-gray-600">
            Start a discussion
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          className="fixed bottom-0 w-[80%] mx-4 lg:w-full max-w-xl mb-8 shadow-xl h-12 lg:ml-[-60px]"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
