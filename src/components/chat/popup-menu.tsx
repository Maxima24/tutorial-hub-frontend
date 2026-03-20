// components/chat/popup-menu.tsx
"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Reply, Trash2 } from "lucide-react";

interface PopUpMenuProps {
  anchorEl: HTMLElement | null;
  messageId: string;
  setPopupOpen: Dispatch<SetStateAction<any>>;
  isOwn: boolean | null;
  setReplyTo: Dispatch<SetStateAction<any>>;
  messageObject: any;
}

const MENU_WIDTH = 160;
const MENU_HEIGHT = 90;
const OFFSET = 8;

export const PopUpMenu = ({
  setPopupOpen,
  setReplyTo,
  anchorEl,
  messageId,
  messageObject,
  isOwn,
}: PopUpMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!anchorEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Prefer opening above the bubble; fall back to below
    let top = anchorRect.top - MENU_HEIGHT - OFFSET;
    if (top < 8) top = anchorRect.bottom + OFFSET;
    // Clamp vertically
    top = Math.min(top, vh - MENU_HEIGHT - 8);
    top = Math.max(top, 8);

    // Horizontal: align to the side the bubble is on
    let left = isOwn
      ? anchorRect.right - MENU_WIDTH
      : anchorRect.left;
    // Clamp horizontally
    left = Math.min(left, vw - MENU_WIDTH - 8);
    left = Math.max(left, 8);

    setPosition({ top, left });
    setReady(true);
  }, [anchorEl, isOwn]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPopupOpen((prev: any) => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setPopupOpen]);

  // Close on outside touch (mobile)
  useEffect(() => {
    const handler = (e: TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPopupOpen((prev: any) => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener("touchstart", handler);
    return () => document.removeEventListener("touchstart", handler);
  }, [setPopupOpen]);

  const close = () => setPopupOpen((prev: any) => ({ ...prev, visible: false }));

  return (
    <div
      ref={menuRef}
      className={`fixed z-[9999] bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden transition-opacity duration-100 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      style={{
        top: position.top,
        left: position.left,
        width: MENU_WIDTH,
      }}
    >
      <button
        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        onClick={() => {
          setReplyTo(messageObject);
          close();
        }}
      >
        <Reply size={15} />
        Reply
      </button>

      <div className="h-px bg-gray-100 mx-3" />

      <button
        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
        onClick={() => {
          // wire up delete handler here
          close();
        }}
      >
        <Trash2 size={15} />
        Delete
      </button>
    </div>
  );
};