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

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  // 检测这个modal是否被打开
  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;
  // 不用params的原因：这个弹窗只会在server id参数内打开
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })

      await axios.delete(url);
      onClose();
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
              Delete Message
            </DialogTitle>
            <DialogDescription className='text-center text-zinc-500'>
              Are you sure you want to do this <br />
              The message will be permanently deleted.
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