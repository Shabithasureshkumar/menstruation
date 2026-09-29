import React, { useEffect, useId, useRef, useState } from 'react';
import { RefreshCw, Send, Sparkles, User } from 'lucide-react';
import assistantImg from '../../assets/ai-assistant.webp';
import { formatTime, getCurrentTime } from '../../lib/date';
import { Modal } from '../common/Modal';
import { DemoBadge } from '../common/DemoBadge';
import { assistantApi } from '../../services/api/assistantApi';
import { toUserMessage } from '../../services/api/client';
import { IS_DEMO_MODE } from '../../services/api/config';
import { usePatient } from '../../hooks/usePatient';
import { useToday } from '../../hooks/useToday';

interface Message {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
}

interface AICycleAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  'What did I log today?',
  'Explain my cycle',
  'Why am I having cramps?',
  'What should I eat during my period?',
  'Why am I feeling tired?',
];

const nowLabel = () => formatTime(getCurrentTime());

export const AICycleAssistantModal: React.FC<AICycleAssistantModalProps> = (props) =>
  props.isOpen ? <AssistantDialog {...props} /> : null;

/** Mounted only while open, so the conversation resets each time. The input is pinned in the footer. */
const AssistantDialog: React.FC<AICycleAssistantModalProps> = ({ onClose }) => {
  const today = useToday();
  const { patient } = usePatient();
  const firstName = patient?.name.split(' ')[0] ?? 'there';
  const greeting = (): Message => ({
    id: 0,
    sender: 'assistant',
    text: `Hi ${firstName}! Ask about your saved log for today, your cycle estimate, cramps, flow, energy, mood, nutrition or medications.`,
    time: nowLabel(),
  });

  const [messages, setMessages] = useState<Message[]>(() => [greeting()]);
  const [input, setInput] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const nextId = useRef(1);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputId = useId();

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages, isReplying]);

  // Cancel an in-flight reply when the chat closes.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || isReplying) return;
    setMessages((m) => [...m, { id: nextId.current++, sender: 'user', text: question, time: nowLabel() }]);
    setInput('');
    setIsReplying(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const { reply } = await assistantApi.sendMessage({ message: question, date: today }, controller.signal);
      if (controller.signal.aborted) return;
      setMessages((m) => [...m, { id: nextId.current++, sender: 'assistant', text: reply, time: nowLabel() }]);
    } catch (error) {
      if (controller.signal.aborted) return;
      setMessages((m) => [
        ...m,
        { id: nextId.current++, sender: 'assistant', text: toUserMessage(error, "Sorry, I couldn't answer that right now. Please try again."), time: nowLabel() },
      ]);
    } finally {
      if (!controller.signal.aborted) setIsReplying(false);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setIsReplying(false);
    setMessages([greeting()]);
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="lg"
      icon={<img src={assistantImg} alt="" width={28} height={28} className="w-7 h-7 object-contain" />}
      title={
        <span className="inline-flex items-center gap-2 flex-wrap">
          Cycle Assistant {IS_DEMO_MODE && <DemoBadge label="Demo · rule-based" />}
        </span>
      }
      description="Answers from your saved log and settings. Not an AI model or medical advice."
      bodyClassName="flex-1 min-h-0 flex flex-col"
      footer={
        <>
          <div className="w-full flex items-center gap-2 overflow-x-auto scrollbar-none -mx-1 px-1">
            {SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                type="button"
                disabled={isReplying}
                onClick={() => send(chip)}
                className="px-3 min-h-[44px] rounded-full bg-[#FFF0F6] hover:bg-[#FFE4EE] text-[#C2185B] text-[0.72rem] font-bold border border-pink-200 shrink-0 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-60"
              >
                {chip}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="w-full flex items-center gap-1.5"
          >
            <button
              type="button"
              onClick={reset}
              aria-label="Start a new chat"
              className="w-11 h-11 shrink-0 text-[#68708A] hover:text-[#F43F8F] rounded-full hover:bg-pink-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <label htmlFor={inputId} className="sr-only">
              Ask a question
            </label>
            <input
              id={inputId}
              data-autofocus
              type="text"
              value={input}
              maxLength={300}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your cycle…"
              className="flex-1 min-w-0 min-h-[44px] bg-[#FAF8FA] border border-[#F1DDE8] rounded-full px-4 text-sm text-[#17152B] placeholder:text-[#8A92A6] focus:outline-none focus:ring-2 focus:ring-[#F43F8F]/30"
            />
            <button
              type="submit"
              disabled={!input.trim() || isReplying}
              aria-label="Send message"
              className="w-11 h-11 rounded-full bg-[#F43F8F] hover:bg-[#E11D48] disabled:bg-gray-200 text-white flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      }
    >
      <div className="flex-1 min-h-[96px] overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FFFCFE]" role="log" aria-live="polite" aria-label="Conversation">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-[#FFF0F6] border border-pink-200 text-[#F43F8F] flex items-center justify-center shrink-0 mt-1" aria-hidden="true">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-[1.3rem] p-3.5 text-xs sm:text-[0.84rem] leading-relaxed whitespace-pre-line ${
                  isUser
                    ? 'bg-gradient-to-r from-[#E0337F] to-[#C8174A] text-white rounded-br-xs'
                    : 'bg-[#FFF8FA] text-[#17152B] border border-[#F5E2EC] rounded-bl-xs'
                }`}
              >
                <span className="sr-only">{isUser ? 'You said: ' : 'Assistant: '}</span>
                <p>{msg.text}</p>
                <span className={`block text-[0.62rem] mt-1.5 ${isUser ? 'text-white/85 text-right' : 'text-[#68708A]'}`}>{msg.time}</span>
              </div>
              {isUser && (
                <div className="w-7 h-7 rounded-full bg-[#F43F8F] text-white flex items-center justify-center shrink-0 mt-1" aria-hidden="true">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
        {isReplying && <p className="text-xs text-[#68708A]">Assistant is replying…</p>}
        <div ref={endRef} />
      </div>
    </Modal>
  );
};
