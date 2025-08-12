"use client";

import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";

interface StoreDeviceDialogProps {
  open: boolean;
  onClose: () => void;
}

const StoreDeviceDialog = ({ open, onClose  }: StoreDeviceDialogProps) => {
  return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-96 overflow-y-auto">
          <DialogTitle className="text-lg font-bold mb-2 mt-6">
            افزودن دستگاه
          </DialogTitle>
          <div className="mt-2">

          </div>
        </DialogContent>
      </Dialog>
  )
}

export default StoreDeviceDialog;