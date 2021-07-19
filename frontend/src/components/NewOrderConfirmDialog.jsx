
import React from 'react';

// components
import { DialogContent, Dialog, DialogTitle } from '@material-ui/core';
import { OrderButton } from './Buttons/OrderButton';

export const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  existingShopName, // 他店舗の名前
  newShopName,      // いま選択した店舗の名前
  onClickSubmit,           // 仮注文の置き換えAPIを呼ぶ
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    maxWidth="xs"
  >
    <DialogTitle>
      新規注文を開始しますか？
    </DialogTitle>
    <DialogContent>
      <p>
        {
          `ご注文に ${existingShopName} の商品が含まれています。
          新規の注文を開始して ${newShopName} の商品を追加してください。`
        }
      </p>
      {/* 先ほど作ったOrderButtonをここで使用 */}
      <OrderButton onClick={onClickSubmit}>
        新規注文
      </OrderButton>
    </DialogContent>
  </Dialog>
);

