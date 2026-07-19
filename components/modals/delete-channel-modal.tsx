"use client";

import qs from 'query-string';
import axios from 'axios';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from 'next/navigation';


export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  // 检测这个modal是否被打开
  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;
  // 不用params的原因：这个弹窗只会在server id参数内打开
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })

      await axios.delete(url);
      onClose();
      router.push(`/servers/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
          <DialogHeader className='pt-8 px-6'>
            <DialogTitle className='text-center text-2xl font-bold'>
              Delete Channel
            </DialogTitle>
            <DialogDescription className='text-center text-zinc-500'>
              Are you sure you want to do this <br />
              <span className='text-indigo-500 font-semibold'>#{channel?.name}</span> will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='bg-gray-100 px-6 py-4'>
            <div className='flex items-center justify-between w-full'>
              <Button
                disabled={isLoading}
                onClick={onClose}
                variant='ghost'
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={onClick}
                variant='primary'  
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}