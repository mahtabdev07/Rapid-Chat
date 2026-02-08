import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { useAuthStore } from "./useAuthStore";

const notificationSound = new Audio("/notification.wav");
notificationSound.volume = 0.7;

const moveUserToTop = (users, userId, lastMessageTime) => {
  const index = users.findIndex((u) => u._id === userId);
  if (index === -1) return users;

  const updatedUser = {
    ...users[index],
    lastMessageTime,
  };

  const updatedUsers = [...users];
  updatedUsers.splice(index, 1);
  updatedUsers.unshift(updatedUser);

  return updatedUsers;
};

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSending: false, // 🔒 send lock

  // ---------------- USERS ----------------
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ---------------- MESSAGES ----------------
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ---------------- UI ----------------
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  // ---------------- SEND MESSAGE (🔥 FAST) ----------------
  sendMessage: async (messageData) => {
    const { selectedUser, messages, users, isSending } = get();
    const authUser = useAuthStore.getState().authUser;

    if (!selectedUser || !authUser || isSending) return;

    set({ isSending: true });

    // 🔥 1. optimistic message (instant UI)
    const tempMessage = {
      _id: `temp-${uuid()}`,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image || null,
      createdAt: new Date().toISOString(),
      status: "sending",
    };

    set({ messages: [...messages, tempMessage] });

    try {
      // 🔥 2. send to server
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );

      // 🔥 3. replace temp message
      set({
        messages: get().messages.map((m) =>
          m._id === tempMessage._id ? { ...res.data, status: "sent" } : m,
        ),
      });

      // 🔥 4. move receiver to top (sender UX)
      set({
        users: moveUserToTop(users, selectedUser._id, res.data.createdAt),
      });
    } catch (error) {
      // ❌ mark failed
      set({
        messages: get().messages.map((m) =>
          m._id === tempMessage._id ? { ...m, status: "failed" } : m,
        ),
      });

      toast.error("Failed to send message");
    } finally {
      set({ isSending: false });
    }
  },

  // ---------------- SOCKET: INCOMING MESSAGE ----------------
  handleIncomingMessage: (newMessage) => {
    const { selectedUser, messages, users } = get();
    const authUser = useAuthStore.getState().authUser;

    // 🛑 ignore own socket echo
    if (newMessage.senderId === authUser?._id) return;

    // If chat is open → append only
    if (selectedUser?._id === newMessage.senderId) {
      set({ messages: [...messages, newMessage] });
      return;
    }

    const sender = users.find((u) => u._id === newMessage.senderId);
    if (!sender) return;

    // 🔔 play sound
    notificationSound.currentTime = 0;
    notificationSound.play().catch(() => {});

    toast.custom(
      (t) => (
        <div
          onClick={() => {
            set({ selectedUser: sender });
            toast.dismiss(t.id);
          }}
          className="cursor-pointer bg-base-200 shadow-lg rounded-lg p-4 flex gap-3"
        >
          <img
            src={sender.profilePic || "/avatar.png"}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{sender.fullName}</p>
            <p className="text-sm text-zinc-400">Sent you a new message</p>
          </div>
        </div>
      ),
      { duration: 5000, position: "bottom-right" },
    );
  },

  // ---------------- SIDEBAR ORDER ----------------
  handleSidebarReorder: ({ userId, lastMessageTime }) => {
    const { users } = get();
    set({ users: moveUserToTop(users, userId, lastMessageTime) });
  },
}));
