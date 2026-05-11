import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`card cursor-pointer transition-all duration-300 ${isOpen ? 'border-[rgba(45,212,191,0.3)] shadow-[0_0_30px_rgba(45,212,191,0.05)]' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`font-semibold text-base transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#e2e8f0]'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#2dd4bf] text-[#030d1a] rotate-180' : 'bg-white/5 text-[#2dd4bf]'}`}>
          <label className="sr-only">Toggle answer</label>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t border-[rgba(30,80,160,0.2)] text-[#94a3b8] text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
