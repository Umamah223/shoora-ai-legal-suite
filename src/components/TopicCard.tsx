
import { motion } from 'framer-motion';

interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  index: number;
}

const TopicCard = ({ icon, title, index }: TopicCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:border-shoora-gold hover:bg-shoora-gold/5 transition-colors duration-300 cursor-pointer"
    >
      <div className="text-shoora-gold">{icon}</div>
      <span className="font-medium">{title}</span>
    </motion.div>
  );
};

export default TopicCard;
