'use client';
import React, { useEffect, useState } from 'react';
// import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Database } from '@/types_db';

export default function Avatar({ uid, size }: { uid: string | null; size: number }) {
  // Supabase removed
  // const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>('');
  const [uploading, setUploading] = useState(false);

  // useEffect(() => {
  //   async function getUser() {
  //     // Supabase removed
  //   }
  //   getUser();
  // }, []);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    // Supabase removed - upload functionality disabled
    alert('Avatar upload disabled - Supabase removed');
  };

  // async function setUrl(path: string) {
  //   // Supabase removed
  // }

  // async function updateAvatar(avatar_url: string | null) {
  //   // Supabase removed
  // }

  return (
    <div>
      <Image
        width={size}
        height={size}
        src={avatarUrl ? avatarUrl : '/placeholder-avatar.jpg'}
        alt="Avatar"
        className="avatar image"
        style={{
          height: size,
          width: size,
          objectFit: 'cover',
          borderRadius: '100%'
        }}
      />

      <div className="mt-3" style={{ width: size }}>
        <Input
          onChange={uploadAvatar}
          accept="image/*"
          id="picture"
          type="file"
        />
      </div>
    </div>
  );
}
