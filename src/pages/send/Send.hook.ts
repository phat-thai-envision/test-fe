import { Asset, useAuthenStore } from "zustand-store/authen";
import { useSendStore } from "./Send.zustand";

export const useCurrentAsset = () => {
  const { assetId } = useSendStore();
  const { assets } = useAuthenStore();
  return assets.find((asset) => asset.id === assetId) as unknown as Asset;
};
