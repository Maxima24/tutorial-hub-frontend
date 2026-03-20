// components/chat/chat-window.tsx
import { useState, useEffect, useRef, useMemo } from "react";
import { ReplyMessagePayload, useMessaging } from "@/hooks/useMessaging";
import { useUserStore } from "@/store/auth-store";
import { IMessage, IParticipants, useChatStore } from "@/store/chat-store";
import { PopUpMenu } from "./popup-menu";
import { Avatar } from "./conversation-item";
import { ArrowLeft, Send, X, Heart, MoreVertical } from "lucide-react";

interface ChatWindowProps {
  onBack?: () => void;
}

export function ChatWindow({ onBack }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");
  const { sendMessage, replyMessage, isConnected } = useMessaging();
  const [replyTo, setReplyTo] = useState<any>();
  const [messageForAction, setMessageForAction] = useState<any>();
  // likedMessages: Set of message IDs the current user has liked
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    anchorEl: HTMLElement | null;
    messageId: string;
    isOwn: boolean | null;
  } | null>(null);

  const selectedChat = useChatStore((s) => s.currentChatId);
  const chat = useChatStore((state) =>
    selectedChat ? state.chats.get(selectedChat) : null
  );
  const messagesData = chat?.messages || [];
  const getParticipantsData = useChatStore((s) => s.getParticipants);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = useUserStore((state) => state.user?.id);

  function getParticipants() {
    const participants = getParticipantsData(selectedChat);
    if (!participants) return [] as IParticipants[];
    return participants;
  }

  const userProfile = getParticipants().find(
    (participant) => participant.userId !== userId
  );

  function handleRightClick({
    e,
    message,
    isOwn,
  }: {
    e: React.MouseEvent<HTMLDivElement>;
    message: any;
    isOwn: boolean;
  }) {
    e.preventDefault();
    setMessageForAction(message);
    setContextMenu({ visible: true, anchorEl: e.currentTarget, messageId: message.id, isOwn });
  }

  // Long-press support for mobile context menu
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleTouchStart(message: any, isOwn: boolean, el: HTMLDivElement) {
    longPressTimer.current = setTimeout(() => {
      setMessageForAction(message);
      setContextMenu({ visible: true, anchorEl: el, messageId: message.id, isOwn });
    }, 500);
  }
  function handleTouchEnd() {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  }

  function toggleLike(messageId: string) {
    setLikedMessages((prev) => {
      const next = new Set(prev);
      if (next.has(messageId)) next.delete(messageId);
      else next.add(messageId);
      return next;
    });
  }

  const getFlattenedMessages = (messages: IMessage[]) => {
    const flattened: any[] = [];
    messages.forEach((message) => {
      flattened.push({ ...message, type: "message" });
      message.replies?.forEach((reply) => {
        flattened.push({ ...reply, type: "reply", parentMessage: message });
      });
    });
    flattened.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return flattened;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData, messagesData?.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage || !userId) return;
    setMessageInput("");
    try {
      if (!userProfile) return;
      if (replyTo) {
        await replyMessage({
          reciepientId: userProfile.user.id!,
          content: trimmedMessage,
          isGroup: false,
          messageId: replyTo.type === "reply" ? replyTo.parentMessage.id : replyTo.id,
        });
        setReplyTo(null);
      } else {
        await sendMessage({
          reciepientId: userProfile.user.id!,
          content: trimmedMessage,
          isGroup: false,
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessageInput(trimmedMessage);
    }
  };

  const flattenedMessage = useMemo(() => {
    if (!messagesData) return [];
    return getFlattenedMessages(messagesData);
  }, [messagesData]);

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col h-full rounded-lg ring-1 ring-gray-200 shadow-md overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white/70 backdrop-blur-sm flex-shrink-0">
        {/* Back button — mobile only */}
        {onBack && (
          <button
            onClick={onBack}
            className="sm:hidden p-1.5 -ml-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {/* Avatar */}
        <Avatar
          name={userProfile?.user.name}
          avatarUrl={userProfile?.user.avatarUrl}
          size={10}
        />

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight truncate">
            {userProfile?.user.name ?? "Select a chat"}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-400"
              }`}
            />
            <span className={`text-xs ${isConnected ? "text-green-500" : "text-red-400"}`}>
              {isConnected ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-2">
        {flattenedMessage.map((item) => {
          const isOwn = item.senderId === userId;
          const isLiked = likedMessages.has(item.id);

          return (
            <div
              key={item.id}
              className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
            >
              {/* Other user avatar — show only for non-own messages */}
              {!isOwn && (
                <Avatar
                  name={userProfile?.user.name}
                  avatarUrl={userProfile?.user.avatarUrl}
                  size={7}
                />
              )}

              <div className={`group flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[75%] sm:max-w-[65%]`}>
                {/* Bubble */}
                <div
                  className={`relative rounded-2xl px-3 py-2 text-sm shadow-sm cursor-pointer select-none
                    ${isOwn
                      ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm ring-1 ring-gray-100"
                    }`}
                  onContextMenu={(e) => handleRightClick({ e, message: item, isOwn })}
                  onTouchStart={(e) =>
                    handleTouchStart(item, isOwn, e.currentTarget as HTMLDivElement)
                  }
                  onTouchEnd={handleTouchEnd}
                  onTouchMove={handleTouchEnd}
                >
                  {/* Reply preview */}
                  {item.type === "reply" && (
                    <div
                      className={`text-xs px-2 py-1 rounded-lg mb-1.5 border-l-2 ${
                        isOwn
                          ? "bg-blue-400/40 border-white/60 text-blue-100"
                          : "bg-gray-100 border-blue-400 text-gray-500"
                      }`}
                    >
                      <span className="font-medium block mb-0.5">
                        {item.parentMessage.senderId === userId ? "You" : userProfile?.user.name}
                      </span>
                      <span className="truncate block max-w-[200px]">
                        {item.parentMessage.content}
                      </span>
                    </div>
                  )}

                  <p className="leading-relaxed break-words">{item.content}</p>

                  <span
                    className={`text-[10px] mt-1 block ${
                      isOwn ? "text-blue-200" : "text-gray-400"
                    }`}
                  >
                    {formatTime(item.createdAt)}
                  </span>
                </div>

                {/* Like button + count — shown on hover (desktop) or always (mobile) */}
                <div
                  className={`flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity sm:opacity-0
                    ${isOwn ? "flex-row-reverse" : "flex-row"}
                  `}
                  // always visible on touch devices via CSS below
                  style={{ opacity: undefined }}
                >
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all
                      ${isLiked
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-100 text-gray-400 hover:text-red-400"
                      }`}
                  >
                    <Heart
                      size={12}
                      className={isLiked ? "fill-red-500 text-red-500" : ""}
                    />
                    {isLiked && <span>1</span>}
                  </button>
                </div>
              </div>

              {/* Own user avatar */}
              {isOwn && (
                <Avatar
                  name="You"
                  avatarUrl={undefined}
                  size={7}
                />
              )}
            </div>
          );
        })}

        {flattenedMessage.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No messages yet. Say hello! 👋
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Context menu ── */}
      {contextMenu?.visible && (
        <PopUpMenu
          anchorEl={contextMenu.anchorEl}
          messageId={contextMenu.messageId}
          setPopupOpen={setContextMenu}
          isOwn={contextMenu.isOwn}
          setReplyTo={setReplyTo}
          messageObject={messageForAction}
        />
      )}

      {/* ── Input ── */}
      <form onSubmit={handleSendMessage} className="px-3 sm:px-4 pb-3 pt-2 flex-shrink-0 bg-white/60 backdrop-blur-sm border-t border-gray-100">
        {/* Reply preview */}
        {replyTo && (
          <div className="mb-2 bg-blue-50 border-l-4 border-blue-500 px-3 py-2 rounded-lg flex justify-between items-start gap-2">
            <div className="min-w-0">
              <p className="text-xs font-medium text-blue-600 mb-0.5">
                Replying to {replyTo.senderId === userId ? "yourself" : userProfile?.user.name}
              </p>
              <p className="text-xs text-gray-600 truncate">{replyTo.content}</p>
            </div>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 disabled:opacity-50"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!isConnected || !messageInput.trim()}
            className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex-shrink-0 shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}