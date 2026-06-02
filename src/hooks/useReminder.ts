import { useEffect, useRef } from 'react';
import useTaskStore from '../store/taskStore';
import type { Ringtone } from '../types';

const ringtones: Record<Ringtone, string> = {
  warm: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  fresh: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3',
  gentle: 'https://assets.mixkit.co/active_storage/sfx/2535/2535-preview.mp3',
};

export const useReminder = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const markAsReminded = useTaskStore((state) => state.markAsReminded);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();

      tasks.forEach((task) => {
        if (task.reminderTime && !task.reminded && task.status !== 'completed') {
          const reminderTime = new Date(task.reminderTime);

          if (reminderTime <= now) {
            showNotification(task.title);
            playRingtone(task.ringtone);
            markAsReminded(task.id);
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000);

    checkReminders();

    return () => clearInterval(intervalId);
  }, [tasks, markAsReminded]);

  const showNotification = async (title: string) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('待办提醒', {
          body: title,
          icon: '/vite.svg',
          badge: '/vite.svg',
          tag: 'todo-reminder',
        });
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('待办提醒', {
            body: title,
            icon: '/vite.svg',
            badge: '/vite.svg',
            tag: 'todo-reminder',
          });
        }
      }
    }
  };

  const playRingtone = (ringtone: Ringtone) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    audioRef.current.src = ringtones[ringtone];
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch((error) => {
      console.error('播放铃声失败:', error);
    });
  };

  const stopRingtone = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  const getNotificationPermission = () => {
    if ('Notification' in window) {
      return Notification.permission;
    }
    return 'denied';
  };

  return {
    requestNotificationPermission,
    getNotificationPermission,
    playRingtone,
    stopRingtone,
  };
};
