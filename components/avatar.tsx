'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Avatar({ uid, size }: { uid: string; size: number }) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        let { data, error } = await supabase
          .from('users')
          .select('avatar_url')
          .eq('id', uid)
          .single();

        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      if (data) {
        setUrl(data.path);
      }
    } catch (error) {
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  async function setUrl(path: string) {
    const { data } = await supabase.storage
      .from('avatars')
      .createSignedUrl(path, 60);

    if (data) {
      updateAvatar(data.signedUrl);
    }
  }

  async function updateAvatar(avatar_url: string | null) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ avatar_url: avatar_url })
        .eq('id', uid);
      if (error) throw error;
      setAvatarUrl(avatar_url);
    } catch (error) {
      alert('Error updating the data!');
    }
  }

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
